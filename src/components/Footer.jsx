import { useState } from 'react'
import {
  ArrowUpRight,
  BookOpen,
  EnvelopeSimple,
  WhatsappLogo,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import { buildWhatsAppLink } from '../whatsapp.js'
import LogoMark from './LogoMark.jsx'
import LibroReclamaciones from './LibroReclamaciones.jsx'
import './Footer.css'

const REDES = [
  { key: 'facebook', Icon: FacebookLogo, label: 'Facebook' },
  { key: 'instagram', Icon: InstagramLogo, label: 'Instagram' },
  { key: 'linkedin', Icon: LinkedinLogo, label: 'LinkedIn' },
]

export default function Footer() {
  const [libroAbierto, setLibroAbierto] = useState(false)
  const anio = 2017
  const redesActivas = REDES.filter((r) => NEGOCIO.redes[r.key])

  return (
    <footer className="footer">
      {/* Banner KMT — página hermana de ventas */}
      <div className="container">
        <div className="kmt-banner">
          <div className="kmt-banner__text">
            <span className="kmt-banner__eyebrow">Página hermana</span>
            <h3>
              ¿Buscas contratar un servicio? Visita <strong>KMT</strong>
            </h3>
            <p>Nuestra área comercial, donde encuentras planes y ventas de fibra óptica.</p>
          </div>
          <a
            href={NEGOCIO.kmtUrl}
            className="btn btn-primary kmt-banner__btn"
            target={NEGOCIO.kmtUrl.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
          >
            Ir a KMT · Ventas
            <ArrowUpRight weight="bold" size={18} />
          </a>
        </div>
      </div>

      <div className="container footer__main">
        <div className="footer__brand">
          <LogoMark
            variante="lockup"
            alto={52}
            className="footer__logo"
            alt="Corporación Visual Connections"
          />
          <p>
            Servicios de telecomunicaciones a nivel nacional. Partner autorizado de WIN y
            ENTEL desde {NEGOCIO.fundacion}.
          </p>
          {redesActivas.length > 0 && (
            <div className="footer__social">
              {redesActivas.map(({ key, Icon, label }) => (
                <a
                  key={key}
                  href={NEGOCIO.redes[key]}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon weight="fill" size={20} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="footer__col" aria-label="Secciones">
          <h4>Navegación</h4>
          <a href="#inicio">Inicio</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#servicios">Servicios</a>
          <a href="#trabaja">Trabaja con nosotros</a>
          <a href="#contacto">Contáctanos</a>
        </nav>

        <div className="footer__col">
          <h4>Contacto</h4>
          <a href={`mailto:${NEGOCIO.email}`}>
            <EnvelopeSimple weight="fill" size={15} /> {NEGOCIO.email}
          </a>
          <a href={buildWhatsAppLink('¡Hola Visual Connections!')} target="_blank" rel="noreferrer">
            <WhatsappLogo weight="fill" size={15} /> {NEGOCIO.whatsappVisible}
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>
            © {anio}
            {new Date().getFullYear() > anio ? `–${new Date().getFullYear()}` : ''}{' '}
            {NEGOCIO.nombre}. Todos los derechos reservados.
          </span>

          {/* El acceso al Libro de Reclamaciones debe ser visible y estar en
              todas las páginas (Ley 29571). */}
          <button
            type="button"
            className="footer__libro"
            onClick={() => setLibroAbierto(true)}
          >
            <BookOpen weight="fill" size={16} />
            Libro de Reclamaciones
          </button>
        </div>
      </div>

      <LibroReclamaciones abierto={libroAbierto} onCerrar={() => setLibroAbierto(false)} />
    </footer>
  )
}
