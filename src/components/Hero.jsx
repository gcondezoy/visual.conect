import { motion } from 'motion/react'
import { ArrowDown, WhatsappLogo, Broadcast } from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import { SOCIOS } from '../data.js'
import HeroFoto from './HeroFoto.jsx'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner container">
        <div className="hero__content">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Broadcast weight="fill" size={16} />
            Partner autorizado
          </motion.span>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            Conectamos el Perú con{' '}
            <span className="hero__hl">tecnología</span>,{' '}
            <span className="hero__hl hero__hl--cyan">puntualidad</span> y garantía.
          </motion.h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
          >
            Somos Corporación Visual Connections. Con experiencia desde 2017 brindamos
            instalación, averías, traslados y mantenimiento de telecomunicaciones para
            clientes hogar y empresas a nivel nacional.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
          >
            <a href="#trabaja" className="btn btn-primary">
              Trabaja con nosotros
            </a>
            <a href="#servicios" className="btn btn-ghost">
              Nuestros servicios
            </a>
          </motion.div>

          {/* Las cifras salían aquí, en las fichas de la foto y otra vez en la
              franja de métricas de abajo: tres veces los mismos números en una
              pantalla. Se quedan en la foto, que es donde aportan, y en la
              franja, que es su sitio. */}

          <motion.div
            className="hero__partners"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.44 }}
          >
            <span className="hero__partners-label">Trabajamos con</span>
            {SOCIOS.map((s) => (
              <img
                key={s.nombre}
                className="hero__partner"
                src={s.logo}
                alt={s.nombre}
                style={{ '--escala': s.escala }}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <HeroFoto />
        </motion.div>
      </div>

      <a href="#nosotros" className="hero__scroll" aria-label="Ir a la siguiente sección">
        <ArrowDown weight="bold" size={18} />
      </a>

      <a
        href={`https://wa.me/${NEGOCIO.whatsapp}`}
        className="hero__wa-hint"
        target="_blank"
        rel="noreferrer"
      >
        <WhatsappLogo weight="fill" size={18} />
        Escríbenos
      </a>
    </section>
  )
}
