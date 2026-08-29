import * as Icons from '@phosphor-icons/react'
import { Target, Eye } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { EMPRESA_DESCRIPCION, MISION, VISION, VALORES } from '../data.js'
import './Nosotros.css'

export default function Nosotros() {
  return (
    <section id="nosotros" className="section nosotros">
      <div className="container">
        <Reveal className="nosotros__head">
          <span className="section-eyebrow">Quiénes somos</span>
          <h2 className="section-title">
            Experiencia y garantía en <span className="text-accent">telecomunicaciones</span>
          </h2>
          <p className="section-lead">{EMPRESA_DESCRIPCION}</p>
        </Reveal>

        <div className="nosotros__grid">
          <Reveal className="mv-card" direction="up" delay={0.05}>
            <div className="mv-card__icon mv-card__icon--orange">
              <Target weight="duotone" size={28} />
            </div>
            <h3>Misión</h3>
            <p>{MISION}</p>
          </Reveal>

          <Reveal className="mv-card" direction="up" delay={0.15}>
            <div className="mv-card__icon mv-card__icon--cyan">
              <Eye weight="duotone" size={28} />
            </div>
            <h3>Visión</h3>
            <p>{VISION}</p>
          </Reveal>
        </div>

        <Reveal className="valores" delay={0.1}>
          <h3 className="valores__title">Nuestros valores corporativos</h3>
          <ul className="valores__list">
            {VALORES.map((v, i) => {
              const Icon = Icons[v.icono] || Icons.CheckCircle
              return (
                <Reveal as="li" key={v.nombre} className="valor" delay={i * 0.06} direction="up">
                  <Icon weight="duotone" size={22} />
                  <span>{v.nombre}</span>
                </Reveal>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
