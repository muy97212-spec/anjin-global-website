import * as React from 'react'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

interface JourneyStep {
  number: string
  title: string
  body: string
}

export interface BuyerJourneySectionProps {
  className?: string
}

export function BuyerJourneySection({ className }: BuyerJourneySectionProps) {
  const t = useTranslations('home.buyerJourney')
  const steps = t.raw('steps') as JourneyStep[]

  return (
    <section className={cn('bg-[var(--color-surface-alt)]', className)}>
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
          className="mx-auto mb-16"
        />

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => (
            <li
              key={step.number}
              className="relative flex flex-col gap-3 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-label text-[var(--color-brand-secondary)]">
                  {step.number}
                </span>
                {idx < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="hidden h-px w-12 bg-[var(--color-neutral-400)] lg:block"
                  />
                ) : null}
              </div>
              <h3 className="text-h3 text-[var(--color-neutral-900)]">{step.title}</h3>
              <p className="text-small text-[var(--color-neutral-700)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
