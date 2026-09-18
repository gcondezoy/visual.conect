import './AntenaVC.css'

// Posición del emisor (la bocina naranja) dentro del isotipo, en porcentaje
// del lado. Los anillos nacen exactamente ahí.
const EMISOR = { x: (309 / 512) * 100, y: (175 / 512) * 100 }

// Las tres ondas del logo, redibujadas encima para encenderlas en secuencia.
// Mismo sistema de coordenadas que el isotipo (512 × 512).
const ONDAS = [45, 80, 115]
const ANGULO_INICIO = -78
const ANGULO_FIN = -10

function arco(radio) {
  const rad = (g) => (g * Math.PI) / 180
  const cx = 309
  const cy = 175
  const x1 = cx + radio * Math.cos(rad(ANGULO_INICIO))
  const y1 = cy + radio * Math.sin(rad(ANGULO_INICIO))
  const x2 = cx + radio * Math.cos(rad(ANGULO_FIN))
  const y2 = cy + radio * Math.sin(rad(ANGULO_FIN))
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radio} ${radio} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

/**
 * La antena de Visual Connections, a gran escala, emitiendo señal sin parar.
 *
 * La imagen es el isotipo vectorizado (`public/img/antena-vc.svg`, generado
 * con `scripts/build-antena.mjs`): el original era un raster de 512 px y a
 * este tamaño se veía borroso. En vector queda nítida en cualquier pantalla.
 *
 * Toda la animación es CSS: anillos que salen del emisor en una cadena
 * continua y las ondas del logo encendiéndose hacia afuera. No depende de
 * JavaScript ni de que el usuario haga nada.
 */
export default function AntenaVC() {
  return (
    <div className="antena" aria-hidden="true">
      <div className="antena__halo" />

      <div className="antena__escena">
        <span
          className="antena__pulsos"
          style={{ left: `${EMISOR.x}%`, top: `${EMISOR.y}%` }}
        >
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="antena__pulso" style={{ '--i': i }} />
          ))}
        </span>

        <img
          className="antena__img"
          src="/img/antena-vc.svg"
          alt=""
          width="512"
          height="512"
          draggable="false"
        />

        <svg className="antena__ondas" viewBox="0 0 512 512" fill="none">
          {ONDAS.map((r, i) => (
            <path
              key={r}
              d={arco(r)}
              stroke="currentColor"
              strokeWidth={9 - i * 0.8}
              strokeLinecap="round"
              style={{ '--i': i }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
