import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MapPin, X, CaretLeft, CaretRight, Broadcast } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'
import MapaPeru from './MapaPeru.jsx'
import { SEDES, CUADRILLAS_NACIONAL } from '../config.js'
import { GALERIA } from '../galeria.js'
import './Sedes.css'

// A las cuatro sedes se suma el equipo comercial, que opera transversalmente
// y por eso no tiene punto en el mapa.
const GRUPOS = [
  ...SEDES.map((s) => ({ ...s, fotos: GALERIA[s.id] ?? [] })),
  {
    id: 'comercial',
    ciudad: 'Equipo Comercial',
    etiqueta: 'Fuerza de ventas',
    direccion: 'Fuerza de ventas certificada — WIN & ENTEL',
    servicios: 'Asesoría, contratación y venta de servicios de fibra óptica',
    fotos: GALERIA.comercial ?? [],
  },
]

const ease = [0.32, 0.72, 0, 1]

// Cuántas fotos entran sin volver interminable la sección.
function usarEsMovil() {
  const [esMovil, setEsMovil] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 520px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 520px)')
    const alCambiar = (e) => setEsMovil(e.matches)
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])
  return esMovil
}

export default function Sedes() {
  const [activa, setActiva] = useState(GRUPOS[0].id)
  const [visor, setVisor] = useState(null) // índice de la foto ampliada
  const esMovil = usarEsMovil()

  const grupo = GRUPOS.find((g) => g.id === activa)
  const fotos = grupo.fotos
  // Seis reparten bien las tres columnas del escritorio; en el móvil, con dos
  // columnas, cuatro bastan para dar idea del equipo sin alargar el scroll.
  const visibles = fotos.slice(0, esMovil ? 4 : 6)

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

  // Deslizar para cambiar de foto: en el móvil es el gesto natural; apuntar
  // a una flecha con el dedo no lo es.
  const gesto = useRef(null)

  const alTocar = (e) => {
    const t = e.changedTouches[0]
    gesto.current = { x: t.clientX, y: t.clientY }
  }

  const alSoltar = (e) => {
    if (!gesto.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - gesto.current.x
    const dy = t.clientY - gesto.current.y
    gesto.current = null
    // Solo cuenta si el gesto fue claramente horizontal, para no robarle el
    // deslizamiento vertical al navegador.
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      setVisor((i) => (i + (dx < 0 ? 1 : -1) + total) % total)
    }
  }

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
            {CUADRILLAS_NACIONAL} cuadrillas técnicas a nivel nacional, operando en cuatro
            ciudades del país entre averías, instalaciones, traslados y ordenamiento de red.
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
                {g.ciudad}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="sede-panel">
          {/* Columna izquierda: el mapa se mantiene fijo entre sedes (solo
              cambia el punto activo); la ficha sí se renueva. */}
          <aside className="sede-lateral">
            <MapaPeru sedes={SEDES} activa={activa} onSeleccionar={setActiva} />

            <AnimatePresence mode="wait">
              <motion.div
                key={activa}
                className="bezel sede-ficha"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
              >
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
                      <MapPin weight="light" size={17} />
                      <span>{grupo.direccion}</span>
                    </li>
                  </ul>

                  <p className="sede-servicios">{grupo.servicios}.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </aside>

          {/* Mosaico en columnas: cada foto conserva su proporción real y la
              rejilla se acomoda a ella, sin recortes ni marcos vacíos. */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activa}
              className="sede-mosaico"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease }}
            >
              {visibles.map((foto, i) => {
                const esUltima = i === visibles.length - 1
                const restantes = fotos.length - visibles.length
                return (
                  <button
                    key={foto.src}
                    className="sede-foto"
                    onClick={() => setVisor(i)}
                    aria-label={
                      esUltima && restantes > 0
                        ? `Ver las ${fotos.length} fotografías de ${grupo.ciudad}`
                        : `Ampliar fotografía ${i + 1} de ${grupo.ciudad}`
                    }
                  >
                    <img
                      src={foto.src}
                      alt={`Equipo de Visual Connections en ${grupo.ciudad}`}
                      loading="lazy"
                      decoding="async"
                      width={foto.ancho}
                      height={foto.alto}
                    />
                    {esUltima && restantes > 0 && (
                      <span className="sede-foto-mas" aria-hidden="true">
                        +{restantes} fotos
                      </span>
                    )}
                  </button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
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
            onTouchStart={alTocar}
            onTouchEnd={alSoltar}
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
              key={fotos[visor].src}
              src={fotos[visor].src}
              width={fotos[visor].ancho}
              height={fotos[visor].alto}
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
