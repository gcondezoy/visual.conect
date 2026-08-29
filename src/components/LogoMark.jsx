import { useTema } from '../theme.jsx'
import './LogoMark.css'

/**
 * Geometría medida sobre los archivos reales del logo. Las ondas animadas se
 * dibujan justo encima de las que ya trae el isotipo, más una cuarta que se
 * desprende hacia afuera: la señal se ve salir del emisor de forma continua.
 */
const VARIANTES = {
  // Isotipo suelto (logo-mark.webp, 512×512)
  mark: {
    src: '/img/logo-mark.webp',
    viewBox: '0 0 512 512',
    emisor: { x: 309, y: 175 },
    radios: [45, 80, 115, 150],
    grosor: 9,
  },
  // Lockup completo (logo-full.webp, 531×264)
  lockup: {
    src: '/img/logo-full.webp',
    srcOscuro: '/img/logo-full-dark.webp',
    viewBox: '0 0 531 264',
    emisor: { x: 124, y: 87 },
    radios: [17, 30, 43, 56],
    grosor: 3.4,
  },
}

const ANGULO_INICIO = -78
const ANGULO_FIN = -10

function arco({ x, y }, radio) {
  const rad = (g) => (g * Math.PI) / 180
  const x1 = x + radio * Math.cos(rad(ANGULO_INICIO))
  const y1 = y + radio * Math.sin(rad(ANGULO_INICIO))
  const x2 = x + radio * Math.cos(rad(ANGULO_FIN))
  const y2 = y + radio * Math.sin(rad(ANGULO_FIN))
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radio} ${radio} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

/**
 * Logo oficial con las ondas de telecomunicación siempre activas.
 *
 * @param {'mark'|'lockup'} variante  isotipo suelto o lockup completo
 * @param {number} alto               alto en px (el ancho sale del aspecto)
 */
export default function LogoMark({ variante = 'mark', alto = 44, className = '', alt = '' }) {
  const { tema } = useTema()
  const cfg = VARIANTES[variante]
  const src = tema === 'dark' && cfg.srcOscuro ? cfg.srcOscuro : cfg.src

  const [, , vbAncho, vbAlto] = cfg.viewBox.split(' ').map(Number)
  const ancho = (alto * vbAncho) / vbAlto

  return (
    <span
      className={`logomark ${className}`}
      style={{ '--logo-alto': `${alto}px`, '--logo-ancho': `${ancho}px` }}
    >
      <img
        src={src}
        alt={alt}
        className="logomark-img"
        width={Math.round(ancho)}
        height={alto}
        draggable="false"
      />

      <svg
        className="logomark-ondas"
        viewBox={cfg.viewBox}
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
        style={{ '--emisor-x': `${(cfg.emisor.x / vbAncho) * 100}%`, '--emisor-y': `${(cfg.emisor.y / vbAlto) * 100}%` }}
      >
        {cfg.radios.map((r, i) => (
          <path
            key={r}
            className={i === cfg.radios.length - 1 ? 'onda onda--emitida' : 'onda'}
            d={arco(cfg.emisor, r)}
            stroke="currentColor"
            strokeWidth={cfg.grosor - i * (cfg.grosor * 0.09)}
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.34}s` }}
          />
        ))}
      </svg>
    </span>
  )
}
