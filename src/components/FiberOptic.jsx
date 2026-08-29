import { useEffect, useRef } from 'react'
import './FiberOptic.css'

const HEBRAS = 7
const PULSOS_POR_HEBRA = 2

// Tope del empuje que el scroll añade por frame. Sin él, un golpe de rueda
// mueve los pulsos varias pantallas de una vez y el fondo marea.
const EMPUJE_MAX = 0.006

// Cyan de señal y naranja del emisor, en RGB para poder modular el alfa.
const COLORES = [
  [53, 189, 236],
  [53, 189, 236],
  [53, 189, 236],
  [247, 145, 30],
]

// Aleatoriedad estable: mismo dibujo en cada carga, sin depender de Math.random
// en cascada (evita que dos hebras nazcan superpuestas).
function ruido(semilla) {
  const x = Math.sin(semilla * 127.1) * 43758.5453
  return x - Math.floor(x)
}

function crearHebras() {
  return Array.from({ length: HEBRAS }, (_, i) => {
    const r1 = ruido(i + 1)
    const r2 = ruido(i + 11)
    const r3 = ruido(i + 23)
    return {
      // Posición horizontal base, repartida con una ligera variación
      x: (i + 0.5) / HEBRAS + (r1 - 0.5) * 0.06,
      amplitud: 0.035 + r2 * 0.055, // cuánto serpentea
      frecuencia: 1.1 + r3 * 1.5, // cuántas ondulaciones a lo alto
      fase: r1 * Math.PI * 2,
      color: COLORES[i % COLORES.length],
      pulsos: Array.from({ length: PULSOS_POR_HEBRA }, (_, j) => ({
        t: ruido(i * 10 + j + 3), // posición 0-1 a lo largo de la hebra
        velocidad: 0.03 + ruido(i * 7 + j + 5) * 0.04,
        largo: 0.1 + ruido(i * 3 + j + 9) * 0.13,
        brillo: 0.5 + ruido(i * 5 + j + 13) * 0.5,
      })),
    }
  })
}

/**
 * Malla de fibra óptica de fondo: hebras que serpentean por el viewport con
 * pulsos de luz viajando por dentro. El scroll acelera y empuja los pulsos,
 * así que la página entera se siente como una red transmitiendo.
 *
 * Canvas fijo detrás del contenido. Solo pinta; nunca provoca reflow.
 */
export default function FiberOptic() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (sinMovimiento.matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const hebras = crearHebras()

    let ancho = 0
    let alto = 0
    let raf = 0
    let ultimoTiempo = 0
    let ultimoScroll = window.scrollY
    let empuje = 0 // energía que aporta el scroll, se disipa sola

    const redimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ancho = window.innerWidth
      alto = window.innerHeight
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      canvas.style.width = `${ancho}px`
      canvas.style.height = `${alto}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Punto de la hebra a la altura t (0 arriba, 1 abajo)
    const puntoEn = (hebra, t, desplazamiento) => ({
      x:
        (hebra.x +
          hebra.amplitud *
            Math.sin(hebra.frecuencia * t * Math.PI * 2 + hebra.fase + desplazamiento)) *
        ancho,
      y: t * alto,
    })

    const dibujar = (tiempo) => {
      raf = requestAnimationFrame(dibujar)

      const dt = Math.min((tiempo - ultimoTiempo) / 1000, 0.05) || 0
      ultimoTiempo = tiempo

      // Lectura del scroll dentro del rAF: no hace falta listener y el valor
      // llega ya sincronizado con el frame.
      const scroll = window.scrollY
      const delta = scroll - ultimoScroll
      ultimoScroll = scroll

      // El scroll acompaña el movimiento, no lo dispara: el aporte es pequeño,
      // está acotado y se disipa rápido. Un desplazamiento brusco no debe
      // lanzar los pulsos de golpe — eso es lo que marea.
      empuje += delta * 0.00035
      empuje = Math.max(-EMPUJE_MAX, Math.min(EMPUJE_MAX, empuje))
      empuje *= 0.86 // fricción: al soltar, vuelve enseguida al ritmo base

      // Deriva lenta para que la malla respire aunque nadie scrollee
      const deriva = tiempo * 0.00004

      ctx.clearRect(0, 0, ancho, alto)

      for (const hebra of hebras) {
        const [r, g, b] = hebra.color

        // 1. La hebra en reposo: un hilo casi imperceptible
        ctx.beginPath()
        for (let i = 0; i <= 48; i++) {
          const p = puntoEn(hebra, i / 48, deriva)
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.09)`
        ctx.lineWidth = 1
        ctx.stroke()

        // 2. Los pulsos de luz viajando por dentro
        for (const pulso of hebra.pulsos) {
          pulso.t += pulso.velocidad * dt + empuje
          if (pulso.t > 1.2) pulso.t -= 1.4
          if (pulso.t < -0.2) pulso.t += 1.4

          const PASOS = 16
          for (let i = 0; i < PASOS; i++) {
            const f = i / PASOS
            const t1 = pulso.t - pulso.largo * (1 - f)
            const t2 = pulso.t - pulso.largo * (1 - (i + 1) / PASOS)
            if (t2 < 0 || t1 > 1) continue

            const a = puntoEn(hebra, Math.max(t1, 0), deriva)
            const c = puntoEn(hebra, Math.min(t2, 1), deriva)

            // La cola se apaga; la cabeza concentra el brillo
            const alfa = f * f * 0.55 * pulso.brillo
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(c.x, c.y)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alfa})`
            ctx.lineWidth = 1 + f * 1.6
            ctx.stroke()
          }

          // Halo en la cabeza del pulso
          if (pulso.t >= 0 && pulso.t <= 1) {
            const cabeza = puntoEn(hebra, pulso.t, deriva)
            const halo = ctx.createRadialGradient(
              cabeza.x,
              cabeza.y,
              0,
              cabeza.x,
              cabeza.y,
              26,
            )
            halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * pulso.brillo})`)
            halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
            ctx.fillStyle = halo
            ctx.fillRect(cabeza.x - 26, cabeza.y - 26, 52, 52)
          }
        }
      }
    }

    const alCambiarVisibilidad = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        ultimoTiempo = performance.now()
        ultimoScroll = window.scrollY
        raf = requestAnimationFrame(dibujar)
      }
    }

    redimensionar()
    raf = requestAnimationFrame(dibujar)
    window.addEventListener('resize', redimensionar)
    document.addEventListener('visibilitychange', alCambiarVisibilidad)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', redimensionar)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [])

  return <canvas ref={canvasRef} className="fiber-optic" aria-hidden="true" />
}
