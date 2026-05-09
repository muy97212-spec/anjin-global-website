import * as React from 'react'
import { cn } from '@/lib/utils'

export type SectionHeadingAlign = 'left' | 'center'

export interface SectionHeadingProps {
  title: string
  subtitle?: string
  eyebrow?: string
  align?: SectionHeadingAlign
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = 'left',
  className,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  const headingClass = Heading === 'h1' ? 'text-h1' : Heading === 'h3' ? 'text-h3' : 'text-h2'

  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <span className="text-label text-[var(--color-brand-secondary)]">{eyebrow}</span>
      ) : null}
      <Heading className={cn(headingClass, 'text-[var(--color-neutral-900)]')}>{title}</Heading>
      {subtitle ? (
        <p className="text-body max-w-2xl text-[var(--color-neutral-700)]">{subtitle}</p>
      ) : null}
    </div>
  )
}
