import { useTema } from '../theme.jsx'
import './ThemeToggle.css'

const RAYOS = [0, 45, 90, 135, 180, 225, 270, 315]

export default function ThemeToggle() {
  const { tema, alternar } = useTema()
  const esOscuro = tema === 'dark'

  return (
    <button
      type="button"
      className="tema-toggle"
      onClick={alternar}
      aria-label={esOscuro ? 'Activar tema claro' : 'Activar tema oscuro'}
      title={esOscuro ? 'Tema claro' : 'Tema oscuro'}
    >
      <span className="tema-toggle-cara" data-activo={esOscuro}>
        {/* Luna: se muestra en tema oscuro */}
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" stroke="currentColor">
          <path
            d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="tema-toggle-cara" data-activo={!esOscuro}>
        {/* Sol: se muestra en tema claro */}
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.3" stroke="currentColor">
          <circle cx="12" cy="12" r="4.2" />
          {RAYOS.map((g) => (
            <line
              key={g}
              x1="12"
              y1="2.6"
              x2="12"
              y2="5"
              strokeLinecap="round"
              transform={`rotate(${g} 12 12)`}
            />
          ))}
        </svg>
      </span>
    </button>
  )
}
