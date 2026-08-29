import { motion } from 'motion/react'
import { ArrowDown, WhatsappLogo, Broadcast } from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import LogoMark from './LogoMark.jsx'
import './Hero.css'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      {/* Fondo animado: grilla + resplandores + ondas */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--orange" />
        <div className="hero__glow hero__glow--cyan" />
      </div>

      <div className="hero__inner container">
        <div className="hero__content">
          <motion.span
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Broadcast weight="fill" size={16} />
            Partner autorizado de WIN &amp; ENTEL
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
            Somos Corporación Visual Connections. Desde 2021 brindamos servicios de
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

          <motion.div
            className="hero__partners"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="hero__partners-label">Trabajamos con</span>
            <span className="hero__partner hero__partner--win">win</span>
            <span className="hero__partners-dot">·</span>
            <span className="hero__partner hero__partner--entel">entel</span>
          </motion.div>
        </div>

        {/* Visual animado: antena + ondas de señal */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          aria-hidden="true"
        >
          <div className="signal">
            <span className="signal__ring signal__ring--1" />
            <span className="signal__ring signal__ring--2" />
            <span className="signal__ring signal__ring--3" />
            <div className="signal__core">
              <LogoMark variante="mark" alto={148} />
            </div>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong className="mono">+65</strong>
              <span>cuadrillas técnicas</span>
            </div>
            <div className="hero__stat">
              <strong className="mono">4</strong>
              <span>sedes a nivel nacional</span>
            </div>
          </div>
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
