import * as React from 'react'
import Image from 'next/image'
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
  ExternalLink,
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
  assetUrl?: string
}

interface GalleryEntry {
  label: string
  issuer: string
  imageSrc: string
  alt: string
}

const PRIMARY_ICONS = [ShieldCheck, BadgeCheck, Globe2, Ship, Award] as const
const SECONDARY_ICONS = [Beaker, Award, Factory, Microscope, GraduationCap, Trophy] as const

export default function CertificationsPage() {
  const t = useTranslations('certifications')
  const tCommon = useTranslations('common')

  const primaryBadges = t.raw('primary.badges') as BadgeEntry[]
  const secondaryBadges = t.raw('secondary.badges') as BadgeEntry[]
  const downloads = t.raw('downloads.items') as DownloadEntry[]
  const gallery = t.raw('gallery.items') as GalleryEntry[]
  const galleryViewLabel = t('gallery.viewLabel')

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="text-label text-[var(--color-brand-secondary)]">
              {t('hero.eyebrow')}
            </span>
            <h1 className="text-hero text-[var(--color-brand-primary)]">{t('hero.title')}</h1>
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
            className="mb-12 max-w-3xl"
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
            eyebrow={t('gallery.eyebrow')}
            title={t('gallery.title')}
            subtitle={t('gallery.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item) => (
              <li
                key={item.label}
                className="group flex flex-col overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm transition-shadow hover:shadow-lg"
              >
                <a
                  href={item.imageSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[3/4] w-full overflow-hidden bg-[var(--color-neutral-100)]"
                  aria-label={`${galleryViewLabel}: ${item.label}`}
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="text-h3 text-[var(--color-brand-primary)]">{item.label}</h3>
                  <p className="text-small text-[var(--color-neutral-700)]">{item.issuer}</p>
                  <a
                    href={item.imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex w-fit items-center gap-1 text-small font-medium text-[var(--color-brand-primary)] hover:underline"
                  >
                    {galleryViewLabel}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('downloads.eyebrow')}
            title={t('downloads.title')}
            subtitle={t('downloads.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {downloads.map((item) => (
              <li
                key={item.assetName}
                className="flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm"
              >
                <h3 className="text-h3 text-[var(--color-brand-primary)]">{item.assetName}</h3>
                <div className="mt-auto">
                  <GatedDownload
                    assetName={item.assetName}
                    assetType={item.assetType}
                    ctaLabel={item.ctaLabel}
                    assetUrl={item.assetUrl}
                    triggerVariant="primary"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('secondary.eyebrow')}
            title={t('secondary.title')}
            subtitle={t('secondary.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
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

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-6 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-10">
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
