import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X, BookOpen, WhatsappLogo, CheckCircle } from '@phosphor-icons/react'
import { NEGOCIO, RECLAMACIONES } from '../config.js'
import { openWhatsApp } from '../whatsapp.js'
import './forms.css'
import './LibroReclamaciones.css'

const VACIO = {
  // Identificación del consumidor
  nombre: '',
  documento: 'DNI',
  numeroDocumento: '',
  domicilio: '',
  telefono: '',
  email: '',
  menorDeEdad: false,
  apoderado: '',
  // Identificación del bien contratado
  tipoBien: 'Servicio',
  montoReclamado: '',
  descripcionBien: '',
  // Detalle de la reclamación
  tipo: 'Reclamo',
  detalle: '',
  pedido: '',
}

// El D.S. 011-2011-PCM distingue las dos figuras, y la hoja debe dejar claro
// cuál se está presentando: no son lo mismo ni se tramitan igual.
const TIPOS = [
  {
    valor: 'Reclamo',
    titulo: 'Reclamo',
    // El artículo acompaña al tipo para que las etiquetas concuerden en
    // género: "del reclamo" / "de la queja".
    articulo: 'del reclamo',
    ayuda: 'Disconformidad con el producto o servicio recibido.',
  },
  {
    valor: 'Queja',
    titulo: 'Queja',
    articulo: 'de la queja',
    ayuda: 'Malestar por la atención recibida, no por el servicio en sí.',
  },
]

// Código de seguimiento para el consumidor. El número correlativo oficial lo
// asigna la empresa al registrar la hoja; este sirve para que ambas partes
// puedan referirse al mismo caso desde el primer momento.
function generarCodigo(fecha = new Date()) {
  const dos = (n) => String(n).padStart(2, '0')
  const dia = `${fecha.getFullYear()}${dos(fecha.getMonth() + 1)}${dos(fecha.getDate())}`
  const azar = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `VC-${dia}-${azar}`
}

export default function LibroReclamaciones({ abierto, onCerrar }) {
  const [form, setForm] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(null)
  const dialogoRef = useRef(null)

  const set = (campo) => (e) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [campo]: valor }))
    setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  // Se limpia al cerrar, para que la siguiente hoja no herede datos ajenos.
  // Va aquí y no en un efecto: el reinicio lo provoca el cierre, y hacerlo
  // en un efecto encadenaría un render de más.
  const cerrar = useCallback(() => {
    setForm(VACIO)
    setErrores({})
    setEnviado(null)
    onCerrar()
  }, [onCerrar])

  // Escape para cerrar y bloqueo del fondo, igual que en el visor de fotos.
  useEffect(() => {
    if (!abierto) return
    const alPulsar = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', alPulsar)

    const desplazamiento = window.scrollY
    const previo = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    document.body.style.position = 'fixed'
    document.body.style.top = `-${desplazamiento}px`
    document.body.style.width = '100%'

    dialogoRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', alPulsar)
      document.body.style.position = previo.position
      document.body.style.top = previo.top
      document.body.style.width = previo.width
      window.scrollTo(0, desplazamiento)
    }
  }, [abierto, cerrar])

  const validar = () => {
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'Ingresa tu nombre completo'
    if (!form.numeroDocumento.trim()) err.numeroDocumento = 'Ingresa tu número de documento'
    if (!form.domicilio.trim()) err.domicilio = 'Ingresa tu domicilio'
    if (!form.email.trim()) err.email = 'El correo es necesario para responderte'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Correo no válido'
    if (form.menorDeEdad && !form.apoderado.trim())
      err.apoderado = 'Indica el nombre del padre, madre o apoderado'
    if (!form.detalle.trim()) err.detalle = 'Describe el hecho'
    if (!form.pedido.trim()) err.pedido = 'Indica qué solicitas'
    setErrores(err)
    return Object.keys(err).length === 0
  }

  const enviar = (e) => {
    e.preventDefault()
    if (!validar()) return

    const codigo = generarCodigo()
    const fecha = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const lineas = [
      `*LIBRO DE RECLAMACIONES* — ${form.tipo.toUpperCase()}`,
      `*Código:* ${codigo}`,
      `*Fecha:* ${fecha}`,
      '',
      '*1. IDENTIFICACIÓN DEL CONSUMIDOR*',
      `Nombre: ${form.nombre}`,
      `${form.documento}: ${form.numeroDocumento}`,
      `Domicilio: ${form.domicilio}`,
    ]
    if (form.telefono.trim()) lineas.push(`Teléfono: ${form.telefono}`)
    lineas.push(`Correo: ${form.email}`)
    if (form.menorDeEdad) lineas.push(`Padre/apoderado: ${form.apoderado}`)

    lineas.push('', '*2. BIEN CONTRATADO*', `Tipo: ${form.tipoBien}`)
    if (form.montoReclamado.trim()) lineas.push(`Monto reclamado: ${form.montoReclamado}`)
    if (form.descripcionBien.trim()) lineas.push(`Descripción: ${form.descripcionBien}`)

    const articulo = TIPOS.find((t) => t.valor === form.tipo)?.articulo ?? 'del reclamo'
    lineas.push(
      '',
      `*3. DETALLE ${articulo.toUpperCase()}*`,
      form.detalle.trim(),
      '',
      '*4. PEDIDO DEL CONSUMIDOR*',
      form.pedido.trim(),
    )

    openWhatsApp(lineas.join('\n'))
    setEnviado({ codigo, fecha })
  }

  return createPortal(
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="libro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={cerrar}
          role="dialog"
          aria-modal="true"
          aria-labelledby="libro-titulo"
        >
          <motion.div
            className="libro-hoja"
            ref={dialogoRef}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="libro-cerrar" onClick={cerrar} aria-label="Cerrar">
              <X weight="light" size={20} />
            </button>

            <header className="libro-encabezado">
              <span className="libro-marca">
                <BookOpen weight="fill" size={17} />
                Libro de Reclamaciones
              </span>
              <h2 id="libro-titulo">Hoja de Reclamación</h2>
              <p className="libro-empresa">
                {RECLAMACIONES.razonSocial} — RUC {RECLAMACIONES.ruc}
              </p>
              <p className="libro-legal">
                Conforme a la Ley N.º 29571, Código de Protección y Defensa del
                Consumidor. La formulación del reclamo no impide acudir a otras vías de
                solución de controversias ni es requisito previo para denunciar ante
                INDECOPI.
              </p>
            </header>

            {enviado ? (
              <div className="libro-exito" role="status">
                <CheckCircle weight="fill" size={44} />
                <h3>Hoja enviada</h3>
                <p>
                  Guarda tu código de seguimiento: <strong>{enviado.codigo}</strong>
                </p>
                <p className="libro-exito-nota">
                  Recibirás respuesta en un plazo máximo de {RECLAMACIONES.plazoDias} días
                  hábiles al correo que indicaste.
                </p>
                <button type="button" className="btn btn-ghost btn-plain" onClick={cerrar}>
                  Cerrar
                </button>
              </div>
            ) : (
              <form className="vc-form libro-form" onSubmit={enviar} noValidate>
                {/* --- Tipo --- */}
                <fieldset className="libro-tipo">
                  <legend>Tipo de solicitud</legend>
                  <div className="libro-tipo-opciones">
                    {TIPOS.map((t) => (
                      <label key={t.valor} data-activo={form.tipo === t.valor}>
                        <input
                          type="radio"
                          name="tipo"
                          value={t.valor}
                          checked={form.tipo === t.valor}
                          onChange={set('tipo')}
                        />
                        <strong>{t.titulo}</strong>
                        <span>{t.ayuda}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* --- 1. Consumidor --- */}
                <h3 className="libro-seccion">1. Identificación del consumidor</h3>

                <div className={`field field--full ${errores.nombre ? 'field--error' : ''}`}>
                  <label htmlFor="lr-nombre">
                    Nombre completo <span className="req">*</span>
                  </label>
                  <input
                    id="lr-nombre"
                    type="text"
                    autoComplete="name"
                    autoCapitalize="words"
                    value={form.nombre}
                    onChange={set('nombre')}
                  />
                  {errores.nombre && <span className="field__error">{errores.nombre}</span>}
                </div>

                <div className="vc-form__row">
                  <div className="field">
                    <label htmlFor="lr-tipo-doc">Documento</label>
                    <select id="lr-tipo-doc" value={form.documento} onChange={set('documento')}>
                      <option>DNI</option>
                      <option>Carné de extranjería</option>
                      <option>Pasaporte</option>
                      <option>RUC</option>
                    </select>
                  </div>
                  <div className={`field ${errores.numeroDocumento ? 'field--error' : ''}`}>
                    <label htmlFor="lr-doc">
                      Número <span className="req">*</span>
                    </label>
                    <input
                      id="lr-doc"
                      type="text"
                      inputMode="numeric"
                      value={form.numeroDocumento}
                      onChange={set('numeroDocumento')}
                    />
                    {errores.numeroDocumento && (
                      <span className="field__error">{errores.numeroDocumento}</span>
                    )}
                  </div>
                </div>

                <div className={`field field--full ${errores.domicilio ? 'field--error' : ''}`}>
                  <label htmlFor="lr-domicilio">
                    Domicilio <span className="req">*</span>
                  </label>
                  <input
                    id="lr-domicilio"
                    type="text"
                    autoComplete="street-address"
                    value={form.domicilio}
                    onChange={set('domicilio')}
                  />
                  {errores.domicilio && <span className="field__error">{errores.domicilio}</span>}
                </div>

                <div className="vc-form__row">
                  <div className="field">
                    <label htmlFor="lr-telefono">Teléfono</label>
                    <input
                      id="lr-telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.telefono}
                      onChange={set('telefono')}
                    />
                  </div>
                  <div className={`field ${errores.email ? 'field--error' : ''}`}>
                    <label htmlFor="lr-email">
                      Correo <span className="req">*</span>
                    </label>
                    <input
                      id="lr-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={form.email}
                      onChange={set('email')}
                    />
                    {errores.email && <span className="field__error">{errores.email}</span>}
                  </div>
                </div>

                <label className="libro-check">
                  <input
                    type="checkbox"
                    checked={form.menorDeEdad}
                    onChange={set('menorDeEdad')}
                  />
                  El consumidor es menor de edad
                </label>

                {form.menorDeEdad && (
                  <div className={`field field--full ${errores.apoderado ? 'field--error' : ''}`}>
                    <label htmlFor="lr-apoderado">
                      Nombre del padre, madre o apoderado <span className="req">*</span>
                    </label>
                    <input
                      id="lr-apoderado"
                      type="text"
                      autoCapitalize="words"
                      value={form.apoderado}
                      onChange={set('apoderado')}
                    />
                    {errores.apoderado && (
                      <span className="field__error">{errores.apoderado}</span>
                    )}
                  </div>
                )}

                {/* --- 2. Bien contratado --- */}
                <h3 className="libro-seccion">2. Identificación del bien contratado</h3>

                <div className="vc-form__row">
                  <div className="field">
                    <label htmlFor="lr-bien">Tipo</label>
                    <select id="lr-bien" value={form.tipoBien} onChange={set('tipoBien')}>
                      <option>Servicio</option>
                      <option>Producto</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="lr-monto">Monto reclamado (opcional)</label>
                    <input
                      id="lr-monto"
                      type="text"
                      inputMode="decimal"
                      placeholder="S/ 0.00"
                      value={form.montoReclamado}
                      onChange={set('montoReclamado')}
                    />
                  </div>
                </div>

                <div className="field field--full">
                  <label htmlFor="lr-desc-bien">Descripción (opcional)</label>
                  <input
                    id="lr-desc-bien"
                    type="text"
                    placeholder="Instalación de fibra óptica, visita técnica…"
                    value={form.descripcionBien}
                    onChange={set('descripcionBien')}
                  />
                </div>

                {/* --- 3. Detalle --- */}
                <h3 className="libro-seccion">3. Detalle y pedido</h3>

                <div className={`field field--full ${errores.detalle ? 'field--error' : ''}`}>
                  <label htmlFor="lr-detalle">
                    Detalle {TIPOS.find((t) => t.valor === form.tipo)?.articulo}{' '}
                    <span className="req">*</span>
                  </label>
                  <textarea
                    id="lr-detalle"
                    placeholder="Describe qué ocurrió, con fechas si las recuerdas…"
                    value={form.detalle}
                    onChange={set('detalle')}
                  />
                  {errores.detalle && <span className="field__error">{errores.detalle}</span>}
                </div>

                <div className={`field field--full ${errores.pedido ? 'field--error' : ''}`}>
                  <label htmlFor="lr-pedido">
                    Pedido <span className="req">*</span>
                  </label>
                  <textarea
                    id="lr-pedido"
                    placeholder="Qué solicitas que se haga…"
                    value={form.pedido}
                    onChange={set('pedido')}
                  />
                  {errores.pedido && <span className="field__error">{errores.pedido}</span>}
                </div>

                <button type="submit" className="btn btn-whatsapp vc-form__submit">
                  <WhatsappLogo weight="fill" size={20} />
                  Enviar hoja de reclamación
                </button>

                <p className="vc-form__note">
                  {NEGOCIO.nombreCorto} responderá en un plazo máximo de{' '}
                  {RECLAMACIONES.plazoDias} días hábiles.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
