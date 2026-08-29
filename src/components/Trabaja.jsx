import { useState } from 'react'
import { WhatsappLogo, CheckCircle, Briefcase, Sparkle } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { PROPUESTA_LABORAL } from '../data.js'
import { AREAS_POSTULACION, NEGOCIO } from '../config.js'
import { openWhatsApp } from '../whatsapp.js'
import './forms.css'
import './Trabaja.css'

const VACIO = {
  nombre: '',
  apellidos: '',
  email: '',
  telefono: '',
  ciudad: '',
  area: '',
  mensaje: '',
}

export default function Trabaja() {
  const [form, setForm] = useState(VACIO)
  const [errores, setErrores] = useState({})

  const set = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }))
    setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  const validar = () => {
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'Ingresa tu nombre'
    if (!form.apellidos.trim()) err.apellidos = 'Ingresa tus apellidos'
    if (!form.ciudad.trim()) err.ciudad = 'Indica desde dónde escribes'
    if (!form.area) err.area = 'Selecciona un área'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Correo no válido'
    setErrores(err)
    return Object.keys(err).length === 0
  }

  const enviar = (e) => {
    e.preventDefault()
    if (!validar()) return

    const lineas = [
      '¡Hola! Quiero postular a *Visual Connections* 👷',
      '',
      `*Nombre:* ${form.nombre} ${form.apellidos}`,
    ]
    if (form.email) lineas.push(`*Correo:* ${form.email}`)
    if (form.telefono) lineas.push(`*Teléfono:* ${form.telefono}`)
    lineas.push(`*Escribo desde:* ${form.ciudad}`)
    lineas.push(`*Área de interés:* ${form.area}`)
    if (form.mensaje.trim()) lineas.push('', `*Mensaje:*\n${form.mensaje.trim()}`)

    openWhatsApp(lineas.join('\n'))
  }

  return (
    <section id="trabaja" className="section trabaja">
      <div className="container trabaja__grid">
        {/* Columna izquierda: propuesta */}
        <Reveal className="trabaja__info" direction="right">
          <span className="section-eyebrow">Únete al equipo</span>
          <h2 className="section-title">
            Trabaja con <span className="text-accent">nosotros</span>
          </h2>
          <p className="section-lead">
            Buscamos técnicos comprometidos para sumarse a nuestras cuadrillas.
            Completa el formulario y tu postulación llegará directo por WhatsApp.
          </p>

          <div className="trabaja__meta">
            <div className="trabaja__meta-item">
              <Briefcase weight="duotone" size={20} />
              <div>
                <span>Cargos</span>
                <strong>{PROPUESTA_LABORAL.cargos}</strong>
              </div>
            </div>
            <div className="trabaja__meta-item">
              <CheckCircle weight="duotone" size={20} />
              <div>
                <span>Contrato</span>
                <strong>{PROPUESTA_LABORAL.contrato}</strong>
              </div>
            </div>
          </div>

          <div className="trabaja__listas">
            <div className="trabaja__reqs">
              <h3>Qué ofrecemos</h3>
              <ul>
                {PROPUESTA_LABORAL.beneficios.map((b) => (
                  <li key={b}>
                    <Sparkle weight="fill" size={15} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="trabaja__reqs">
              <h3>Requisitos</h3>
              <ul>
                {PROPUESTA_LABORAL.requisitos.map((r) => (
                  <li key={r}>
                    <CheckCircle weight="fill" size={15} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="trabaja__jornada">
            <strong>Jornada:</strong> {PROPUESTA_LABORAL.jornada} Sede de trabajo:{' '}
            {PROPUESTA_LABORAL.ubicacion}.
          </p>
        </Reveal>

        {/* Columna derecha: formulario */}
        <Reveal className="trabaja__form-wrap" direction="left" delay={0.1}>
          <form className="vc-form" onSubmit={enviar} noValidate>
            <div className="vc-form__row">
              <div className={`field ${errores.nombre ? 'field--error' : ''}`}>
                <label htmlFor="t-nombre">
                  Nombres <span className="req">*</span>
                </label>
                <input
                  id="t-nombre"
                  type="text"
                  placeholder="Juan Carlos"
                  value={form.nombre}
                  onChange={set('nombre')}
                />
                {errores.nombre && <span className="field__error">{errores.nombre}</span>}
              </div>

              <div className={`field ${errores.apellidos ? 'field--error' : ''}`}>
                <label htmlFor="t-apellidos">
                  Apellidos <span className="req">*</span>
                </label>
                <input
                  id="t-apellidos"
                  type="text"
                  placeholder="Pérez Gómez"
                  value={form.apellidos}
                  onChange={set('apellidos')}
                />
                {errores.apellidos && (
                  <span className="field__error">{errores.apellidos}</span>
                )}
              </div>
            </div>

            <div className="vc-form__row">
              <div className={`field ${errores.email ? 'field--error' : ''}`}>
                <label htmlFor="t-email">Correo</label>
                <input
                  id="t-email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={set('email')}
                />
                {errores.email && <span className="field__error">{errores.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="t-telefono">Teléfono</label>
                <input
                  id="t-telefono"
                  type="tel"
                  placeholder="9XX XXX XXX"
                  value={form.telefono}
                  onChange={set('telefono')}
                />
              </div>
            </div>

            <div className="vc-form__row">
              <div className={`field ${errores.ciudad ? 'field--error' : ''}`}>
                <label htmlFor="t-ciudad">
                  ¿Desde dónde escribes? <span className="req">*</span>
                </label>
                <input
                  id="t-ciudad"
                  type="text"
                  placeholder="Lima, Trujillo..."
                  value={form.ciudad}
                  onChange={set('ciudad')}
                />
                {errores.ciudad && <span className="field__error">{errores.ciudad}</span>}
              </div>

              <div className={`field ${errores.area ? 'field--error' : ''}`}>
                <label htmlFor="t-area">
                  Área a la que postulas <span className="req">*</span>
                </label>
                <select id="t-area" value={form.area} onChange={set('area')}>
                  <option value="">Selecciona…</option>
                  {AREAS_POSTULACION.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {errores.area && <span className="field__error">{errores.area}</span>}
              </div>
            </div>

            <div className="field field--full">
              <label htmlFor="t-mensaje">Cuéntanos sobre ti (opcional)</label>
              <textarea
                id="t-mensaje"
                placeholder="Experiencia, disponibilidad, por qué te gustaría trabajar con nosotros…"
                value={form.mensaje}
                onChange={set('mensaje')}
              />
            </div>

            <button type="submit" className="btn btn-whatsapp vc-form__submit">
              <WhatsappLogo weight="fill" size={20} />
              Enviar postulación por WhatsApp
            </button>

            <p className="vc-form__note">
              <WhatsappLogo weight="fill" size={14} />
              Al enviar se abrirá WhatsApp con tus datos listos para {NEGOCIO.nombreCorto}.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
