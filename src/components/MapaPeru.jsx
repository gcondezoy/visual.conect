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

// Ventana geográfica del país, con algo de margen.
const LON = { min: -81.9, max: -68.2 }
const LAT = { min: -18.8, max: 0.4 }

const ANCHO = 400
const ALTO = Math.round((ANCHO * (LAT.max - LAT.min)) / (LON.max - LON.min))

// Proyección equirectangular: a esta escala la distorsión es imperceptible.
const px = (lon) => ((lon - LON.min) / (LON.max - LON.min)) * ANCHO
const py = (lat) => ((LAT.max - lat) / (LAT.max - LAT.min)) * ALTO

// Contorno del Perú simplificado: [lat, lon], en sentido horario desde el
// extremo noroeste (Tumbes) por la frontera con Ecuador.
const CONTORNO = [
  [-3.4, -80.3], [-4.0, -80.5], [-4.4, -79.8], [-4.5, -79.0], [-3.9, -78.6],
  [-3.4, -78.2], [-2.8, -77.5], [-3.8, -76.5], [-4.2, -76.0], [-4.5, -75.2],
  [-3.8, -74.4], [-2.2, -74.0], [-1.5, -72.0], [-2.3, -70.1], [-2.6, -69.6],
  [-4.2, -69.9], [-5.1, -72.4], [-6.0, -73.0], [-7.3, -73.7], [-8.5, -72.9],
  [-9.4, -72.2], [-10.0, -71.2], [-11.0, -70.5], [-12.5, -68.9], [-13.7, -68.9],
  [-14.6, -69.2], [-15.3, -69.4], [-16.2, -69.0], [-17.2, -69.7], [-18.35, -70.35],
  [-17.2, -71.4], [-16.4, -72.0], [-16.0, -72.5], [-15.4, -75.2], [-14.6, -75.8],
  [-14.0, -76.2], [-13.0, -76.5], [-12.05, -77.05], [-11.0, -77.6], [-10.0, -78.2],
  [-9.0, -78.6], [-8.2, -79.0], [-7.5, -79.5], [-6.5, -80.3], [-6.0, -80.9],
  [-5.3, -81.2], [-5.0, -81.3], [-4.5, -81.2], [-4.2, -81.1], [-3.7, -80.7],
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
