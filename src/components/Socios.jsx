import Reveal from './Reveal.jsx'
import { SOCIOS, OPERADORAS_PREVIAS } from '../data.js'
import './Socios.css'

// Dos grupos, una etiqueta cada uno. Mostrar las cuatro marcas sin ninguna
// distinción daría a entender que las cuatro son alianzas vigentes; con una
// sola etiqueta por grupo queda claro sin llenar la sección de texto.
const GRUPOS = [
  { titulo: 'Partners autorizados', marcas: SOCIOS },
  { titulo: 'También hemos trabajado con', marcas: OPERADORAS_PREVIAS },
]

/**
 * Respaldo de marca: un muro de logotipos.
 *
 * Se dejan solo las marcas. Las descripciones de WIN y ENTEL repetían lo que
 * ya dice el texto de entrada, y un respaldo se lee de un vistazo: cuanto
 * menos haya alrededor del logotipo, más rápido cumple su función.
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

        <div className="marcas">
          {GRUPOS.map((g, gi) => (
            <Reveal key={g.titulo} className="marcas__grupo" delay={gi * 0.12}>
              <span className="marcas__titulo">{g.titulo}</span>
              <ul className="marcas__lista">
                {g.marcas.map((m) => (
                  <li key={m.nombre} className="marca" style={{ '--marca': m.color }}>
                    <span className="marca__logo">{m.logotipo}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
