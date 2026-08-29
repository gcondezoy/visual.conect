import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, Users, X, CaretLeft, CaretRight, Broadcast } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import { SEDES } from '../config.js'
import { GALERIA } from '../galeria.js'
import './Sedes.css'

// A las cuatro sedes se suma el equipo comercial, que opera transversalmente.
const GRUPOS = [
  ...SEDES.map((s) => ({ ...s, fotos: GALERIA[s.id] ?? [] })),
  {
    id: 'comercial',
    ciudad: 'Equipo Comercial',
    etiqueta: 'Fuerza de ventas',
    direccion: 'Fuerza de ventas certificada — WIN & ENTEL',
    cuadrillasTexto: 'FFVV',
    servicios: 'Asesoría, contratación y venta de servicios de fibra óptica',
    fotos: GALERIA.comercial ?? [],
  },
]

const ease = [0.32, 0.72, 0, 1]

export default function Sedes() {
  const [activa, setActiva] = useState(GRUPOS[0].id)
  const [visor, setVisor] = useState(null) // índice de la foto ampliada

  const grupo = GRUPOS.find((g) => g.id === activa)
  const fotos = grupo.fotos
  // Una destacada (2×2) + cuatro pequeñas llenan la rejilla sin huecos.
  const visibles = fotos.slice(0, 5)

  const total = fotos.length
  const mover = (paso) =>
    setVisor((i) => (i === null ? null : (i + paso + total) % total))

  // Teclado dentro del visor: cerrar y navegar.
  useEffect(() => {
    if (visor === null) return
    const alPulsar = (e) => {
      if (e.key === 'Escape') setVisor(null)
      if (e.key === 'ArrowRight') setVisor((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setVisor((i) => (i - 1 + total) % total)
    }
    window.addEventListener('keydown', alPulsar)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', alPulsar)
      document.body.style.overflow = ''
    }
  }, [visor, total])

  return (
    <section id="sedes" className="section sedes">
      <div className="container">
        <Reveal className="sedes-head">
          <span className="section-eyebrow">
            <Broadcast weight="bold" size={13} />
            Cobertura nacional
          </span>
          <h2 className="section-title">
            Nuestros <span className="text-accent">equipos</span> en campo
          </h2>
          <p className="section-lead">
            Cuadrillas técnicas operando en cuatro ciudades del país, atendiendo averías,
            instalaciones, traslados y ordenamiento de red.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="sedes-tabs" role="tablist" aria-label="Selecciona una sede">
            {GRUPOS.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={g.id === activa}
                className="sede-tab"
                data-activa={g.id === activa}
                onClick={() => setActiva(g.id)}
              >
                <span>{g.ciudad}</span>
                <span className="sede-tab-badge mono">{g.cuadrillasTexto}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activa}
            className="sede-panel"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
          >
            {/* Ficha de la sede */}
            <aside className="bezel sede-ficha">
              <div className="core">
                <span
                  className="sede-chip"
                  data-principal={grupo.etiqueta === 'Sede Principal'}
                >
                  {grupo.etiqueta}
                </span>
                <h3 className="sede-ciudad">{grupo.ciudad}</h3>

                <ul className="sede-datos">
                  <li>
                    <Users weight="light" size={17} />
                    <span>{grupo.cuadrillasTexto}</span>
                  </li>
                  <li>
                    <MapPin weight="light" size={17} />
                    <span>{grupo.direccion}</span>
                  </li>
                </ul>

                <p className="sede-servicios">{grupo.servicios}.</p>

                <span className="sede-conteo mono">
                  {fotos.length} {fotos.length === 1 ? 'fotografía' : 'fotografías'}
                </span>
              </div>
            </aside>

            {/* Mosaico: una foto grande más cuatro pequeñas cierran exactamente
                dos filas. El resto vive en el visor, tras el contador. */}
            <div className="sede-mosaico">
              {visibles.map((foto, i) => {
                const esUltima = i === visibles.length - 1
                const restantes = fotos.length - visibles.length
                return (
                  <button
                    key={foto}
                    className="sede-foto"
                    data-destacada={i === 0}
                    onClick={() => setVisor(i)}
                    aria-label={
                      esUltima && restantes > 0
                        ? `Ver las ${fotos.length} fotografías de ${grupo.ciudad}`
                        : `Ampliar fotografía ${i + 1} de ${grupo.ciudad}`
                    }
                  >
                    <img
                      src={foto}
                      alt={`Equipo de Visual Connections en ${grupo.ciudad}`}
                      loading="lazy"
                      decoding="async"
                      width="1000"
                      height="750"
                    />
                    {esUltima && restantes > 0 && (
                      <span className="sede-foto-mas mono" aria-hidden="true">
                        +{restantes}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Visor a pantalla completa */}
      <AnimatePresence>
        {visor !== null && (
          <motion.div
            className="visor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setVisor(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Fotografía de ${grupo.ciudad}`}
          >
            <button className="visor-cerrar" onClick={() => setVisor(null)} aria-label="Cerrar">
              <X weight="light" size={20} />
            </button>

            <button
              className="visor-nav visor-nav--prev"
              onClick={(e) => {
                e.stopPropagation()
                mover(-1)
              }}
              aria-label="Anterior"
            >
              <CaretLeft weight="light" size={22} />
            </button>

            <motion.img
              key={fotos[visor]}
              src={fotos[visor]}
              alt={`Equipo de Visual Connections en ${grupo.ciudad}`}
              className="visor-img"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="visor-nav visor-nav--next"
              onClick={(e) => {
                e.stopPropagation()
                mover(1)
              }}
              aria-label="Siguiente"
            >
              <CaretRight weight="light" size={22} />
            </button>

            <span className="visor-contador mono">
              {visor + 1} / {fotos.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
