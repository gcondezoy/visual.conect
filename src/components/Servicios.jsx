import Reveal from './Reveal.jsx'
import { SERVICIOS } from '../data.js'
import { icono } from '../iconos.js'
import './Servicios.css'

export default function Servicios() {
  return (
    <section id="servicios" className="section servicios">
      <div className="container">
        <Reveal className="servicios__head">
          <span className="section-eyebrow">Lo que hacemos</span>
          <h2 className="section-title">
            Servicios de <span className="text-accent">telecomunicaciones</span> integrales
          </h2>
          <p className="section-lead">
            Cubrimos el ciclo completo de atención técnica para clientes hogar y empresas,
            bajo los más altos estándares de calidad de nuestros socios.
          </p>
        </Reveal>

        <div className="servicios__grid">
          {SERVICIOS.map((s, i) => {
            const Icon = icono(s.icono, 'Wrench')
            return (
              <Reveal
                as="article"
                key={s.id}
                className="servicio"
                direction="up"
                delay={i * 0.08}
              >
                <div className="servicio__icon">
                  <Icon weight="duotone" size={30} />
                </div>
                <h3 className="servicio__title">{s.titulo}</h3>
                <p className="servicio__desc">{s.descripcion}</p>
                <div className="servicio__glow" aria-hidden="true" />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
