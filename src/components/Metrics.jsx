import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { METRICAS } from '../data.js'
import './Metrics.css'

function Counter({ target, sufijo = '', plano = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 0 : 1400
    const start = performance.now()
    let raf

    const tick = (now) => {
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target])

  const shown = plano ? String(value) : value.toLocaleString('es-PE')

  return (
    <span ref={ref} className="metric__value mono">
      {shown}
      {sufijo}
    </span>
  )
}

export default function Metrics() {
  return (
    <section className="metrics">
      <div className="container metrics__inner">
        {METRICAS.map((m) => (
          <div className="metric" key={m.etiqueta}>
            <Counter target={m.valor} sufijo={m.sufijo} plano={m.plano} />
            <span className="metric__label">{m.etiqueta}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
