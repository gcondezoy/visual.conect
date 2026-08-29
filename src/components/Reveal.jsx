import { motion } from 'motion/react'

// Envoltorio reutilizable: revela su contenido al entrar en viewport.
// direction: 'up' | 'down' | 'left' | 'right' | 'none'
export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  as = 'div',
  once = true,
  amount = 0.2,
}) {
  const offset = 28
  const from = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  }[direction]

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
