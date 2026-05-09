import * as React from 'react'
import { useTranslations } from 'next-intl'
import {
  ShieldCheck,
  FlaskConical,
  Building2,
  Globe2,
  Clock4,
  UserRound,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

interface Feature {
  title: string
  body: string
}

const FEATURE_ICONS = [
  ShieldCheck,
  FlaskConical,
  Building2,
  Globe2,
  Clock4,
  UserRound,
] as const

export interface WhyAnjinProps {
  className?: string
}

export function WhyAnjin({ className }: WhyAnjinProps) {
  const t = useTranslations('home.whyAnjin')
  const features = t.raw('features') as Feature[]

  return (
    <section className={cn('bg-[var(--color-surface-alt)]', className)}>
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
          align="left"
          className="mb-16 max-w-3xl"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--color-brand-primary)]/10 bg-[var(--color-brand-primary)]/10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length]
            return (
              <article
                key={feature.title}
                className="flex flex-col gap-4 bg-[var(--color-surface)] p-8 transition-colors hover:bg-[var(--color-neutral-100)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-[var(--color-surface)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-h3 text-[var(--color-brand-primary)]">{feature.title}</h3>
                <p className="text-body text-[var(--color-neutral-700)]">{feature.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
