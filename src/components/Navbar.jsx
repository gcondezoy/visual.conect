import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import LogoMark from './LogoMark.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'sedes', label: 'Sedes' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'trabaja', label: 'Trabaja con nosotros' },
  { id: 'contacto', label: 'Contáctanos' },
]

export default function Navbar() {
  const [compacta, setCompacta] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [activa, setActiva] = useState('inicio')
  const centinela = useRef(null)

  // Un centinela invisible arriba del todo evita escuchar el scroll: cuando
  // deja de verse, la isla pasa a su estado compacto.
  useEffect(() => {
    const el = centinela.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setCompacta(!e.isIntersecting), {
      rootMargin: '0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Sección activa: gana la que ocupa la banda central del viewport.
  useEffect(() => {
    const secciones = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!secciones.length) return

    const io = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiva(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6, 1] },
    )
    secciones.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Con el panel abierto se congela el fondo para que no haya doble scroll.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  // Escape cierra el panel.
  useEffect(() => {
    if (!abierto) return
    const alPulsar = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alPulsar)
    return () => window.removeEventListener('keydown', alPulsar)
  }, [abierto])

  const cerrar = () => setAbierto(false)
  const kmtExterno = NEGOCIO.kmtUrl.startsWith('http')

  return (
    <>
      <div ref={centinela} className="nav-centinela" aria-hidden="true" />

      <header className={`nav ${compacta ? 'is-compacta' : ''}`}>
        <div className="nav-isla">
          <a href="#inicio" className="nav-marca" onClick={cerrar}>
            <LogoMark variante="lockup" alto={44} alt="Corporación Visual Connections" />
          </a>

          <nav className="nav-links" aria-label="Navegación principal">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="nav-link"
                data-activa={activa === l.id}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-acciones">
            <ThemeToggle />

            <a
              href={NEGOCIO.kmtUrl}
              className="btn btn-primary nav-kmt"
              target={kmtExterno ? '_blank' : undefined}
              rel={kmtExterno ? 'noreferrer' : undefined}
            >
              KMT · Ventas
              <span className="btn-orb">
                <ArrowUpRight weight="bold" size={14} />
              </span>
            </a>

            <button
              className="nav-hamburguesa"
              onClick={() => setAbierto((v) => !v)}
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={abierto}
              data-abierto={abierto}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Panel móvil a pantalla completa */}
      <div className={`nav-panel ${abierto ? 'is-abierto' : ''}`} inert={!abierto || undefined}>
        <nav className="nav-panel-links" aria-label="Navegación móvil">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={cerrar}
              style={{ '--i': i }}
              data-activa={activa === l.id}
            >
              <span className="nav-panel-num mono">{String(i + 1).padStart(2, '0')}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={NEGOCIO.kmtUrl}
          className="btn btn-primary nav-panel-kmt"
          onClick={cerrar}
          style={{ '--i': LINKS.length }}
          target={kmtExterno ? '_blank' : undefined}
          rel={kmtExterno ? 'noreferrer' : undefined}
        >
          Ir a KMT · Ventas
          <span className="btn-orb">
            <ArrowUpRight weight="bold" size={15} />
          </span>
        </a>
      </div>
    </>
  )
}
