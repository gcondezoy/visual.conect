import './MapaPeru.css'

/**
 * Mapa del Perú con las sedes marcadas.
 *
 * Es SVG propio, no un mapa embebido: pesa unos pocos kB, no hace peticiones
 * a terceros, se pinta con los colores del tema y funciona sin conexión.
 *
 * El contorno son coordenadas reales del límite del país, así que los puntos
 * de las sedes caen donde corresponde sin ajustarlos a mano.
 */

// Ventana geográfica ajustada al país (lon -81.3…-68.7, lat -0.04…-18.35)
// con un margen mínimo para que el trazo no toque el borde.
const LON = { min: -82.0, max: -68.3 }
const LAT = { min: -18.9, max: 0.4 }

const ANCHO = 400
const ALTO = Math.round((ANCHO * (LAT.max - LAT.min)) / (LON.max - LON.min))

// Proyección equirectangular: a esta escala la distorsión es imperceptible.
const px = (lon) => ((lon - LON.min) / (LON.max - LON.min)) * ANCHO
const py = (lat) => ((LAT.max - lat) / (LAT.max - LAT.min)) * ALTO

// Contorno del Perú: [lat, lon] siguiendo la frontera real en sentido horario
// desde Tumbes. Cubre los cuatro rasgos que hacen reconocible al país: el
// saliente amazónico al noreste, el punto más oriental en la triple frontera
// con Colombia y Brasil, la entrada de Brasil hacia el oeste a la altura de
// Ucayali y la punta sur en Tacna.
const CONTORNO = [
  // Frontera con Ecuador (noroeste → noreste)
  [-3.39, -80.31], [-3.5, -80.23], [-3.85, -80.23], [-4.23, -80.47],
  [-4.42, -80.14], [-4.5, -79.6], [-4.95, -79.42], [-4.66, -79.05],
  [-4.48, -78.86], [-4.55, -78.2], [-3.6, -78.35], [-3.4, -78.22],
  [-2.9, -77.9], [-2.6, -77.6], [-2.3, -76.8], [-2.6, -76.1],
  [-2.35, -75.6], [-1.8, -75.2], [-1.5, -74.8],
  // Frontera con Colombia (río Putumayo)
  [-2.0, -74.3], [-1.6, -73.5], [-2.2, -72.9], [-1.3, -71.8],
  [-1.8, -70.8], [-2.3, -70.1], [-3.8, -70.35],
  // Punto más oriental: triple frontera Perú–Colombia–Brasil
  [-4.23, -69.95],
  // Frontera con Brasil (noreste → sureste)
  [-5.1, -72.3], [-6.1, -72.9], [-7.1, -73.75], [-7.35, -73.95],
  [-8.4, -72.95], [-9.05, -73.2], [-9.45, -72.2], [-10.0, -71.3],
  [-10.95, -70.6], [-11.1, -70.5],
  // Frontera con Bolivia (incluye el lago Titicaca)
  [-12.5, -68.85], [-13.1, -68.85], [-13.7, -68.9], [-14.2, -69.1],
  [-15.2, -69.35], [-16.2, -69.05], [-16.55, -69.1], [-17.2, -69.65],
  [-18.05, -69.3],
  // Frontera con Chile y vuelta por la costa hacia el norte
  [-18.35, -70.37], [-17.7, -71.35], [-16.9, -72.1], [-16.5, -73.1],
  [-15.85, -74.2], [-15.35, -75.2], [-14.85, -75.1], [-14.2, -76.2],
  [-13.4, -76.3], [-12.55, -76.8], [-12.05, -77.05], [-11.4, -77.6],
  [-10.7, -77.9], [-9.8, -78.25], [-9.1, -78.55], [-8.4, -78.95],
  [-7.8, -79.35], [-7.2, -79.65], [-6.75, -79.95], [-6.3, -80.55],
  [-5.9, -81.1], [-5.2, -81.1], [-4.7, -81.25], [-4.3, -81.1],
  [-3.9, -80.85], [-3.55, -80.55],
]

const RUTA = CONTORNO.map(([la, lo], i) =>
  `${i === 0 ? 'M' : 'L'} ${px(lo).toFixed(1)} ${py(la).toFixed(1)}`,
).join(' ') + ' Z'

export default function MapaPeru({ sedes, activa, onSeleccionar }) {
  return (
    <div className="mapa">
      <svg
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        className="mapa-svg"
        role="img"
        aria-label="Mapa del Perú con las sedes de Visual Connections"
      >
        <path d={RUTA} className="mapa-pais" />

        {sedes.map((s) => {
          const x = px(s.lon)
          const y = py(s.lat)
          const esActiva = s.id === activa
          return (
            <g
              key={s.id}
              className="mapa-punto"
              data-activa={esActiva}
              onClick={() => onSeleccionar(s.id)}
              role="button"
              tabIndex={0}
              aria-label={`Ver sede de ${s.ciudad}`}
              aria-pressed={esActiva}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSeleccionar(s.id)
                }
              }}
            >
              {/* Área de toque holgada: el punto visible es pequeño, pero el
                  dedo necesita bastante más margen. */}
              <circle cx={x} cy={y} r="22" className="mapa-toque" />
              {esActiva && <circle cx={x} cy={y} r="13" className="mapa-halo" />}
              <circle cx={x} cy={y} r="6" className="mapa-pin" />
              <text x={x + 13} y={y + 4.5} className="mapa-etiqueta">
                {s.ciudad}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
