import * as React from 'react'
import { useTranslations } from 'next-intl'
import {
  ShieldCheck,
  BadgeCheck,
  Globe2,
  Beaker,
  Ship,
  Award,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { cn } from '@/lib/utils'

interface BadgeEntry {
  label: string
  issuer: string
}

const BADGE_ICONS = [ShieldCheck, BadgeCheck, Globe2, Beaker, Ship, Award] as const

export interface SocialProofProps {
  className?: string
}

export function SocialProof({ className }: SocialProofProps) {
  const t = useTranslations('home.socialProof')
  const badges = t.raw('badges') as BadgeEntry[]
  const associations = t.raw('associations') as string[]

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, i) => {
            const Icon = BADGE_ICONS[i % BADGE_ICONS.length]
            return (
              <TrustBadge
                key={badge.label}
                label={badge.label}
                issuer={badge.issuer}
                icon={<Icon className="h-6 w-6" aria-hidden="true" />}
              />
            )
          })}
        </div>

        <div className="mt-16 flex flex-col gap-6">
          <h3 className="text-h3 text-[var(--color-neutral-900)]">
            {t('associationsHeading')}
          </h3>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {associations.map((association) => (
              <li
                key={association}
                className="flex items-start gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-4 text-small text-[var(--color-neutral-700)]"
              >
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand-secondary)]"
                  aria-hidden="true"
                />
                <span>{association}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
