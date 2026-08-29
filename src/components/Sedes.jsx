import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, Users, ImageSquare } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { SEDES } from '../config.js'
import './Sedes.css'

// Para cada sede definimos cuántas fotos mostrar en la galería.
// Cuando tengas las fotos reales, colócalas en /public/img/sedes/
// con el patrón <id>-1.jpg, <id>-2.jpg, ... y pon la ruta en `fotos`.
// Si `fotos` está vacío, se muestran placeholders elegantes.
const GALERIAS = {
  lima: { fotos: [], placeholders: 3 },
  trujillo: { fotos: [], placeholders: 3 },
  piura: { fotos: [], placeholders: 3 },
  chiclayo: { fotos: [], placeholders: 3 },
}

const ease = [0.22, 1, 0.36, 1]

export default function Sedes() {
  const [activa, setActiva] = useState(SEDES[0].id)
  const sede = SEDES.find((s) => s.id === activa)
  const galeria = GALERIAS[activa] || { fotos: [], placeholders: 3 }
  const items = galeria.fotos.length
    ? galeria.fotos
    : Array.from({ length: galeria.placeholders }, () => null)

  return (
    <section className="section sedes">
      <div className="container">
        <Reveal className="sedes__head">
          <span className="section-eyebrow">Cobertura nacional</span>
          <h2 className="section-title">
            Nuestros <span className="text-accent">equipos</span> por sede
          </h2>
          <p className="section-lead">
            Contamos con cuadrillas técnicas operando en cuatro ciudades del país,
            atendiendo averías, instalaciones, traslados y ordenamiento.
          </p>
        </Reveal>

        {/* Tabs de sedes */}
        <div className="sedes__tabs" role="tablist" aria-label="Selecciona una sede">
          {SEDES.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activa}
              className={`sede-tab ${s.id === activa ? 'is-active' : ''}`}
              onClick={() => setActiva(s.id)}
            >
              <span className="sede-tab__city">{s.ciudad}</span>
              <span className="sede-tab__badge">{s.cuadrillasTexto}</span>
            </button>
          ))}
        </div>

        {/* Panel activo con cross-fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activa}
            className="sede-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="sede-panel__info">
              <div className="sede-panel__label">
                {sede.etiqueta === 'Sede Principal' ? (
                  <span className="sede-chip sede-chip--main">Sede Principal</span>
                ) : (
                  <span className="sede-chip">Sucursal</span>
                )}
              </div>
              <h3 className="sede-panel__city">{sede.ciudad}</h3>

              <ul className="sede-panel__facts">
                <li>
                  <Users weight="duotone" size={20} />
                  <span>{sede.cuadrillasTexto} operativas</span>
                </li>
                <li>
                  <MapPin weight="duotone" size={20} />
                  <span>{sede.direccion}</span>
                </li>
              </ul>

              <p className="sede-panel__services">
                <strong>Servicios:</strong> {sede.servicios}.
              </p>
            </div>

            {/* Galería */}
            <div className="sede-gallery">
              {items.map((foto, i) => (
                <figure className="sede-shot" key={i}>
                  {foto ? (
                    <img
                      src={foto}
                      alt={`Equipo técnico de Visual Connections en ${sede.ciudad}`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="sede-shot__placeholder" aria-hidden="true">
                      <ImageSquare weight="duotone" size={34} />
                      <span>Foto {sede.ciudad}</span>
                    </div>
                  )}
                </figure>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
