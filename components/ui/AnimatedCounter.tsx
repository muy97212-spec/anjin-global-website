'use client'

import * as React from 'react'
import { animate, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface AnimatedCounterProps {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  to,
  duration = 2,
  prefix,
  suffix,
  className,
  formatter,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  React.useEffect(() => {
    if (!inView || !ref.current) return

    const node = ref.current
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        const rounded = Math.round(value)
        node.textContent = formatter ? formatter(rounded) : rounded.toLocaleString()
      },
    })

    return () => controls.stop()
  }, [inView, to, duration, formatter])

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}
