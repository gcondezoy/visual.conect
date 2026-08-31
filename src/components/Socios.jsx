import Reveal from './Reveal.jsx'
import { SOCIOS, OPERADORAS_PREVIAS } from '../data.js'
import './Socios.css'

export default function Socios() {
  return (
    <section className="section socios">
      <div className="container">
        <Reveal className="socios__head">
          <span className="section-eyebrow">Socios estratégicos</span>
          <h2 className="section-title">
            Respaldados por las marcas <span className="text-cyan">líderes</span> del sector
          </h2>
          <p className="section-lead">
            Formamos parte del staff de partners autorizados que ejecutan instalación,
            visitas técnicas y venta de servicios de fibra óptica.
          </p>
        </Reveal>

        <div className="socios__grid">
          {SOCIOS.map((s, i) => (
            <Reveal key={s.nombre} className="socio" direction="up" delay={i * 0.12}>
              <div className="socio__top">
                <span className="socio__logo" style={{ color: s.color }}>
                  {s.nombre.toLowerCase()}
                </span>
                <span className="socio__tag">{s.tagline}</span>
              </div>
              <p className="socio__desc">{s.descripcion}</p>
              <div className="socio__bar" style={{ background: s.color }} />
            </Reveal>
          ))}
        </div>

        {/* Trayectoria: operadoras con las que ya se trabajó. */}
        <Reveal className="socios__previas" delay={0.2}>
          <span className="socios__previas-label">También hemos trabajado con</span>
          <ul className="socios__previas-lista">
            {OPERADORAS_PREVIAS.map((o) => (
              <li key={o.nombre} style={{ '--marca': o.color }}>
                {o.nombre}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
