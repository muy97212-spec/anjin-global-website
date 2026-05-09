import * as React from 'react'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MetricCard } from '@/components/ui/MetricCard'
import { cn } from '@/lib/utils'

interface MetricEntry {
  value: string
  prefix?: string
  suffix?: string
  label: string
}

export interface MetricGridProps {
  className?: string
}

export function MetricGrid({ className }: MetricGridProps) {
  const t = useTranslations('home.metrics')
  const items = t.raw('items') as MetricEntry[]

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-7xl px-6 py-24',
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            align="left"
            as="h2"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
          {items.map((item) => (
            <MetricCard
              key={item.label}
              value={item.value}
              prefix={item.prefix}
              suffix={item.suffix}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
