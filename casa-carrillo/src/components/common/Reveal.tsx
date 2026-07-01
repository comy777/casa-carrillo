import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Dirección desde la que entra el elemento. */
  direction?: Direction
  /** Retraso en segundos (útil para escalonar/stagger). */
  delay?: number
  /** Proporción del elemento visible para disparar la animación (0–1). */
  amount?: number
  /** Distancia de desplazamiento en px. */
  distance?: number
}

/**
 * Revela su contenido con un fade + desplazamiento cuando entra en viewport
 * durante el scroll. Se anima una sola vez. Respeta `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  amount = 0.2,
  distance = 28,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const offset: Record<Direction, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
