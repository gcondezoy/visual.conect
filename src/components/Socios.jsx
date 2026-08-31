import Reveal from './Reveal.jsx'
import { MARCAS, SOCIOS } from '../data.js'
import './Socios.css'

/**
 * Respaldo de marca.
 *
 * Las cuatro operadoras van en una sola fila y al mismo peso visual: antes
 * WIN y ENTEL ocupaban tarjetas grandes con párrafo y Claro y DIRECTV
 * quedaban como dos pastillas sueltas bajo un "también hemos trabajado con",
 * lo que las hacía parecer de segunda categoría. Cada marca lleva su propio
 * estado, así la distinción entre alianza vigente y trabajo anterior se
 * mantiene sin relegar a nadie.
 *
 * El detalle de las alianzas vigentes queda debajo, en texto, para que no
 * compita con la lectura rápida de los logos.
 */
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

        {/* Fila de marcas */}
        <div className="marcas">
          {MARCAS.map((m, i) => (
            <Reveal
              key={m.nombre}
              className="marca"
              direction="up"
              delay={i * 0.08}
              style={{ '--marca': m.color }}
            >
              <span className="marca__logo">{m.logotipo}</span>
              <span className="marca__estado" data-vigente={m.vigente}>
                {m.vigente ? 'Partner autorizado' : 'Trabajo realizado'}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Detalle de las alianzas vigentes */}
        <Reveal className="socios__detalle" delay={0.24}>
          {SOCIOS.map((s) => (
            <div key={s.nombre} className="socios__detalle-item">
              <h3>
                <span style={{ color: s.color }}>{s.nombre}</span> — {s.tagline}
              </h3>
              <p>{s.descripcion}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
