import { useState } from 'react'
import {
  WhatsappLogo,
  Phone,
  EnvelopeSimple,
  Clock,
  MapPin,
} from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { NEGOCIO, SEDES } from '../config.js'
import { buildWhatsAppLink, openWhatsApp } from '../whatsapp.js'
import './forms.css'
import './Contacto.css'

const VACIO = { nombre: '', email: '', asunto: '', mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState(VACIO)
  const [errores, setErrores] = useState({})

  const set = (campo) => (e) => {
    setForm((f) => ({ ...f, [campo]: e.target.value }))
    setErrores((err) => ({ ...err, [campo]: undefined }))
  }

  const enviar = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'Ingresa tu nombre'
    if (!form.mensaje.trim()) err.mensaje = 'Escribe tu mensaje'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = 'Correo no válido'
    setErrores(err)
    if (Object.keys(err).length) return

    const lineas = [
      '¡Hola *Visual Connections*! 👋',
      '',
      `*Nombre:* ${form.nombre}`,
    ]
    if (form.email) lineas.push(`*Correo:* ${form.email}`)
    if (form.asunto.trim()) lineas.push(`*Asunto:* ${form.asunto.trim()}`)
    lineas.push('', `*Mensaje:*\n${form.mensaje.trim()}`)

    openWhatsApp(lineas.join('\n'))
  }

  return (
    <section id="contacto" className="section contacto">
      <div className="container">
        <Reveal className="contacto__head">
          <span className="section-eyebrow">Hablemos</span>
          <h2 className="section-title">
            Contáct<span className="text-accent">anos</span>
          </h2>
          <p className="section-lead">
            ¿Tienes una consulta o necesitas nuestros servicios? Escríbenos y te
            responderemos a la brevedad.
          </p>
        </Reveal>

        <div className="contacto__grid">
          {/* Datos de contacto */}
          <Reveal className="contacto__info" direction="right">
            <div className="contacto__cards">
              <a href={`tel:${NEGOCIO.telefono.replace(/\s|\(|\)|-/g, '')}`} className="cinfo">
                <Phone weight="duotone" size={22} />
                <div>
                  <span>Teléfono</span>
                  <strong>{NEGOCIO.telefono}</strong>
                </div>
              </a>
              <a href={`mailto:${NEGOCIO.email}`} className="cinfo">
                <EnvelopeSimple weight="duotone" size={22} />
                <div>
                  <span>Correo</span>
                  <strong>{NEGOCIO.email}</strong>
                </div>
              </a>
              <a
                href={buildWhatsAppLink('¡Hola Visual Connections! Quiero más información.')}
                target="_blank"
                rel="noreferrer"
                className="cinfo cinfo--wa"
              >
                <WhatsappLogo weight="fill" size={22} />
                <div>
                  <span>WhatsApp</span>
                  <strong>{NEGOCIO.whatsappVisible}</strong>
                </div>
              </a>
            </div>

            <div className="contacto__horarios">
              <h3>
                <Clock weight="duotone" size={18} /> Horarios de atención
              </h3>
              <ul>
                {NEGOCIO.horarios.map((h) => (
                  <li key={h.dias}>
                    <span>{h.dias}</span>
                    <strong>{h.horas}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contacto__sedes">
              <h3>
                <MapPin weight="duotone" size={18} /> Nuestras sedes
              </h3>
              <ul>
                {SEDES.map((s) => (
                  <li key={s.id}>
                    <strong>{s.ciudad}</strong>
                    <span>{s.direccion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Formulario */}
          <Reveal className="contacto__form-wrap" direction="left" delay={0.1}>
            <form className="vc-form" onSubmit={enviar} noValidate>
              <div className={`field ${errores.nombre ? 'field--error' : ''}`}>
                <label htmlFor="c-nombre">
                  Nombre <span className="req">*</span>
                </label>
                <input
                  id="c-nombre"
                  autoComplete="name"
                  autoCapitalize="words"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={set('nombre')}
                />
                {errores.nombre && <span className="field__error">{errores.nombre}</span>}
              </div>

              <div className={`field ${errores.email ? 'field--error' : ''}`}>
                <label htmlFor="c-email">Correo</label>
                <input
                  id="c-email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="off"
                  spellCheck={false}
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.email}
                  onChange={set('email')}
                />
                {errores.email && <span className="field__error">{errores.email}</span>}
              </div>

              <div className="field">
                <label htmlFor="c-asunto">Asunto</label>
                <input
                  id="c-asunto"
                  type="text"
                  placeholder="¿Sobre qué nos escribes?"
                  value={form.asunto}
                  onChange={set('asunto')}
                />
              </div>

              <div className={`field ${errores.mensaje ? 'field--error' : ''}`}>
                <label htmlFor="c-mensaje">
                  Mensaje <span className="req">*</span>
                </label>
                <textarea
                  id="c-mensaje"
                  placeholder="Cuéntanos en qué podemos ayudarte…"
                  value={form.mensaje}
                  onChange={set('mensaje')}
                />
                {errores.mensaje && <span className="field__error">{errores.mensaje}</span>}
              </div>

              <button type="submit" className="btn btn-whatsapp vc-form__submit">
                <WhatsappLogo weight="fill" size={20} />
                Enviar por WhatsApp
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
