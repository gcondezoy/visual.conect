import { useEffect, useRef } from 'react'
import './ProgresoScroll.css'

/**
 * Barra de avance de lectura, pegada al borde superior.
 *
 * La página es larga; esta línea indica cuánto queda sin ocupar sitio ni
 * pedir atención. Se actualiza dentro del rAF y escribe solo una variable
 * CSS, así que no provoca renderizados de React ni recálculos de maquetado.
 */
export default function ProgresoScroll() {
  const barraRef = useRef(null)

  useEffect(() => {
    const barra = barraRef.current
    if (!barra) return

    let raf = 0
    let ultimo = -1

    const pintar = () => {
      raf = requestAnimationFrame(pintar)

      const alcance = document.documentElement.scrollHeight - window.innerHeight
      const avance = alcance > 0 ? Math.min(window.scrollY / alcance, 1) : 0

      // Solo se toca el DOM cuando el valor cambia de forma perceptible.
      if (Math.abs(avance - ultimo) < 0.001) return
      ultimo = avance
      barra.style.setProperty('--avance', avance)
    }

    const alCambiarVisibilidad = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) raf = requestAnimationFrame(pintar)
    }

    raf = requestAnimationFrame(pintar)
    document.addEventListener('visibilitychange', alCambiarVisibilidad)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [])

  return <div ref={barraRef} className="progreso-scroll" aria-hidden="true" />
}
