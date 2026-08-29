import { useEffect, useState } from 'react'
import { List, X, ArrowUpRight } from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import './Navbar.css'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#trabaja', label: 'Trabaja con nosotros' },
  { href: '#contacto', label: 'Contáctanos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#inicio" className="nav__brand" onClick={close} aria-label="Visual Connections — inicio">
          <img src="/img/logo-icon.png" alt="" className="nav__logo" width="42" height="42" />
          <span className="nav__brand-text">
            <strong>VISUAL</strong>
            <em>Connections</em>
          </span>
        </a>

        <nav className={`nav__menu ${open ? 'is-open' : ''}`} aria-label="Navegación principal">
          <ul className="nav__list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav__link" onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={NEGOCIO.kmtUrl}
            className="nav__kmt"
            onClick={close}
            target={NEGOCIO.kmtUrl.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            KMT · Ventas
            <ArrowUpRight weight="bold" size={16} />
          </a>
        </nav>

        <button
          className="nav__toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X weight="bold" size={26} /> : <List weight="bold" size={26} />}
        </button>
      </div>

      {open && <button className="nav__scrim" aria-hidden="true" tabIndex={-1} onClick={close} />}
    </header>
  )
}
