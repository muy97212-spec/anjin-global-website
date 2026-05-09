import * as React from 'react'
import { useTranslations } from 'next-intl'
import {
  ShieldCheck,
  BadgeCheck,
  Globe2,
  Ship,
  Award,
  Beaker,
  Factory,
  Microscope,
  GraduationCap,
  Trophy,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TrustBadge } from '@/components/ui/TrustBadge'
import { GatedDownload, type GatedAssetType } from '@/components/ui/GatedDownload'

interface BadgeEntry {
  label: string
  issuer: string
}

interface DownloadEntry {
  assetName: string
  assetType: GatedAssetType
  ctaLabel: string
}

const PRIMARY_ICONS = [ShieldCheck, BadgeCheck, Globe2, Ship, Award] as const
const SECONDARY_ICONS = [Beaker, Award, Factory, Microscope, GraduationCap, Trophy] as const

export default function CertificationsPage() {
  const t = useTranslations('certifications')
  const tCommon = useTranslations('common')

  const primaryBadges = t.raw('primary.badges') as BadgeEntry[]
  const secondaryBadges = t.raw('secondary.badges') as BadgeEntry[]
  const downloads = t.raw('downloads.items') as DownloadEntry[]

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="text-label text-[var(--color-brand-secondary)]">
              {t('hero.eyebrow')}
            </span>
            <h1 className="text-display text-[var(--color-neutral-900)]">{t('hero.title')}</h1>
            <p className="text-body max-w-2xl text-[var(--color-neutral-700)]">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('primary.eyebrow')}
            title={t('primary.title')}
            subtitle={t('primary.subtitle')}
            align="left"
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {primaryBadges.map((badge, idx) => {
              const Icon = PRIMARY_ICONS[idx % PRIMARY_ICONS.length]
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
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('downloads.eyebrow')}
            title={t('downloads.title')}
            subtitle={t('downloads.subtitle')}
            align="left"
            className="mb-12"
          />

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {downloads.map((item) => (
              <li
                key={item.assetName}
                className="flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-6 shadow-sm"
              >
                <h3 className="text-h3 text-[var(--color-neutral-900)]">{item.assetName}</h3>
                <div className="mt-auto">
                  <GatedDownload
                    assetName={item.assetName}
                    assetType={item.assetType}
                    ctaLabel={item.ctaLabel}
                    triggerVariant="primary"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('secondary.eyebrow')}
            title={t('secondary.title')}
            subtitle={t('secondary.subtitle')}
            align="left"
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryBadges.map((badge, idx) => {
              const Icon = SECONDARY_ICONS[idx % SECONDARY_ICONS.length]
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
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-6 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-10">
            <SectionHeading
              eyebrow={t('compliance.eyebrow')}
              title={t('compliance.title')}
              align="left"
              as="h2"
              className="max-w-3xl"
            />
            <p className="text-body max-w-3xl text-[var(--color-neutral-700)]">
              {t('compliance.body')}
            </p>
            <p className="text-small max-w-3xl text-[var(--color-neutral-400)]">
              {tCommon('fdaDisclaimer')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
