import * as React from 'react'
import { useTranslations } from 'next-intl'
import { ShieldCheck, BadgeCheck, CheckCircle2, Clock4, Factory } from 'lucide-react'
import { cn } from '@/lib/utils'

const ICONS = [ShieldCheck, BadgeCheck, CheckCircle2, Clock4, Factory] as const

export interface TrustBarProps {
  className?: string
}

export function TrustBar({ className }: TrustBarProps) {
  const t = useTranslations('home.trustBar')
  const items = t.raw('items') as string[]

  return (
    <section
      aria-label={t('label')}
      className={cn(
        'border-y border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)]',
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-8 md:flex-row md:justify-between md:gap-4">
        <span className="text-label text-[var(--color-neutral-700)]">{t('label')}</span>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-end">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <li
                key={item}
                className="flex items-center gap-2 text-small text-[var(--color-neutral-700)]"
              >
                <Icon
                  className="h-4 w-4 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <span className="font-medium">{item}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
