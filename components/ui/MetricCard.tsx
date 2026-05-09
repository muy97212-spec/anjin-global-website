import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MetricCardProps {
  value: string | number
  label: string
  prefix?: string
  suffix?: string
  className?: string
}

export function MetricCard({ value, label, prefix, suffix, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 shadow-sm',
        className,
      )}
    >
      <div className="flex items-baseline gap-1 text-[var(--color-brand-primary)]">
        {prefix ? <span className="text-h3 font-semibold">{prefix}</span> : null}
        <span className="text-display leading-none">{value}</span>
        {suffix ? <span className="text-h3 font-semibold">{suffix}</span> : null}
      </div>
      <span className="text-small text-[var(--color-neutral-700)]">{label}</span>
    </div>
  )
}
