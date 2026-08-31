import { MAPA, proyectar } from '../mapa-peru.js'
import './MapaPeru.css'

/**
 * Mapa del Perú con las sedes marcadas.
 *
 * El contorno sale de datos cartográficos reales (Natural Earth 1:50M), ya
 * proyectados en tiempo de compilación por scripts/build-mapa.mjs: el
 * navegador recibe un path resuelto de unos 6 kB, sin librerías de mapas ni
 * peticiones a terceros, y se pinta con los colores del tema.
 *
 * Las sedes se ubican con la misma proyección que el contorno, así que caen
 * en su posición geográfica exacta.
 */
export default function MapaPeru({ sedes, activa, onSeleccionar }) {
  const puntos = sedes.map((s) => ({ ...s, ...proyectar(s.lat, s.lon) }))
  const principal = puntos.find((p) => p.etiqueta === 'Sede Principal') ?? puntos[0]

  return (
    <div className="mapa">
      <svg
        viewBox={`0 0 ${MAPA.ancho} ${MAPA.alto}`}
        className="mapa-svg"
        role="img"
        aria-label="Mapa del Perú con las cuatro sedes de Visual Connections"
      >
        <path d={MAPA.path} className="mapa-pais" />

        {/* Enlaces desde la sede principal: la red que une las sedes. */}
        <g className="mapa-enlaces" aria-hidden="true">
          {puntos
            .filter((p) => p.id !== principal.id)
            .map((p) => (
              <line
                key={p.id}
                x1={principal.x}
                y1={principal.y}
                x2={p.x}
                y2={p.y}
                data-activa={p.id === activa || principal.id === activa}
              />
            ))}
        </g>

        {puntos.map((s) => {
          const esActiva = s.id === activa
          const esPrincipal = s.id === principal.id
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
              <circle cx={s.x} cy={s.y} r="26" className="mapa-toque" />
              {esActiva && <circle cx={s.x} cy={s.y} r="15" className="mapa-halo" />}
              <circle
                cx={s.x}
                cy={s.y}
                r={esPrincipal ? 8 : 6}
                className="mapa-pin"
                data-principal={esPrincipal}
              />
              <text x={s.x + 15} y={s.y + 5} className="mapa-etiqueta">
                {s.ciudad}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
