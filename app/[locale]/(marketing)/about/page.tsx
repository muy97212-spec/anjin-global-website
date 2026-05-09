import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import {
  Award,
  Trophy,
  Star,
  GraduationCap,
  Microscope,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MetricCard } from '@/components/ui/MetricCard'
import { TrustBadge } from '@/components/ui/TrustBadge'

interface ValueItem {
  title: string
  body: string
}

interface Milestone {
  year: string
  title: string
  body: string
}

interface FactoryMetric {
  value: string
  suffix?: string
  label: string
}

interface BaseEntry {
  tag: string
  title: string
  body: string
}

interface UniversityEntry {
  name: string
  nameZh: string
  focus: string
}

interface ResearchCentre {
  name: string
  nameZh: string
  body: string
}

interface HonourEntry {
  label: string
  issuer: string
}

const HONOUR_ICONS = [Award, Trophy, Star, Award, Trophy, Star, Award, Trophy, Star] as const

export default function AboutPage() {
  const t = useTranslations('about')
  const locale = useLocale()

  const values = t.raw('mission.values') as ValueItem[]
  const milestones = t.raw('timeline.milestones') as Milestone[]
  const metrics = t.raw('factory.metrics') as FactoryMetric[]
  const bases = t.raw('factory.bases') as BaseEntry[]
  const universities = t.raw('universities.items') as UniversityEntry[]
  const centres = t.raw('research.centres') as ResearchCentre[]
  const honours = t.raw('honours.items') as HonourEntry[]

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
            eyebrow={t('mission.eyebrow')}
            title={t('mission.title')}
            subtitle={t('mission.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {values.map((value) => (
              <article
                key={value.title}
                className="flex flex-col gap-3 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 shadow-sm"
              >
                <h3 className="text-h3 text-[var(--color-neutral-900)]">{value.title}</h3>
                <p className="text-body text-[var(--color-neutral-700)]">{value.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('timeline.eyebrow')}
            title={t('timeline.title')}
            subtitle={t('timeline.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <ol className="relative flex flex-col gap-8 border-l-2 border-[var(--color-surface-alt)] pl-8">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[41px] top-2 inline-flex h-4 w-4 items-center justify-center rounded-full border-4 border-[var(--color-surface)] bg-[var(--color-brand-primary)]"
                />
                <div className="flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
                  <span className="text-label text-[var(--color-brand-secondary)]">
                    {milestone.year}
                  </span>
                  <h3 className="text-h3 text-[var(--color-neutral-900)]">{milestone.title}</h3>
                  <p className="text-body text-[var(--color-neutral-700)]">{milestone.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-surface-deep)] text-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <span className="text-label text-[var(--color-brand-accent-soft)]">
              {t('video.eyebrow')}
            </span>
            <h2 className="text-h2 mt-3 text-[var(--color-surface)]">{t('video.title')}</h2>
            <p className="text-body mt-4 text-[var(--color-neutral-100)]/85">
              {t('video.subtitle')}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg bg-[var(--color-neutral-900)] shadow-lg">
            <video
              controls
              preload="none"
              playsInline
              aria-label={t('video.videoLabel')}
              className="block aspect-video w-full"
            >
              <source src="/videos/factory-tour.mp4" type="video/mp4" />
              <p className="p-6 text-small text-[var(--color-neutral-100)]">
                {t('video.fallback')}{' '}
                <a
                  href="/downloads/anjin-pet-brochure.pdf"
                  className="font-medium text-[var(--color-brand-accent-soft)] underline"
                >
                  {t('video.fallbackCta')}
                </a>
              </p>
            </video>
          </div>

          <p className="mt-3 text-small text-[var(--color-neutral-400)]">{t('video.captions')}</p>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('factory.eyebrow')}
            title={t('factory.title')}
            subtitle={t('factory.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <div className="mb-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.label}
                value={metric.value}
                suffix={metric.suffix}
                label={metric.label}
              />
            ))}
          </div>

          <h3 className="text-h3 mb-6 text-[var(--color-neutral-900)]">{t('factory.basesHeading')}</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {bases.map((base) => (
              <article
                key={base.title}
                className="flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <Building2
                    className="mt-1 h-5 w-5 shrink-0 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <span className="text-label text-[var(--color-brand-primary)]">{base.tag}</span>
                </div>
                <h4 className="text-h3 text-[var(--color-neutral-900)]">{base.title}</h4>
                <p className="text-small text-[var(--color-neutral-700)]">{base.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('universities.eyebrow')}
            title={t('universities.title')}
            subtitle={t('universities.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {universities.map((university) => (
              <li
                key={university.name}
                className="flex flex-col gap-3 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-6"
              >
                <GraduationCap
                  className="h-6 w-6 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <h3 className="text-h3 text-[var(--color-neutral-900)]">{university.name}</h3>
                <span lang="zh-CN" className="text-small text-[var(--color-neutral-700)]">
                  {university.nameZh}
                </span>
                <span className="text-label text-[var(--color-brand-secondary)]">
                  {university.focus}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('research.eyebrow')}
            title={t('research.title')}
            subtitle={t('research.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {centres.map((centre) => (
              <article
                key={centre.name}
                className="flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 shadow-sm"
              >
                <Microscope
                  className="h-6 w-6 text-[var(--color-brand-primary)]"
                  aria-hidden="true"
                />
                <h3 className="text-h3 text-[var(--color-neutral-900)]">{centre.name}</h3>
                <span lang="zh-CN" className="text-small text-[var(--color-neutral-700)]">
                  {centre.nameZh}
                </span>
                <p className="text-body text-[var(--color-neutral-700)]">{centre.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('honours.eyebrow')}
            title={t('honours.title')}
            subtitle={t('honours.subtitle')}
            align="left"
            className="mb-12 max-w-3xl"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {honours.map((honour, idx) => {
              const Icon = HONOUR_ICONS[idx % HONOUR_ICONS.length]
              return (
                <TrustBadge
                  key={honour.label}
                  label={honour.label}
                  issuer={honour.issuer}
                  icon={<Icon className="h-6 w-6" aria-hidden="true" />}
                />
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-8 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-10 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading
              eyebrow={t('footerCta.eyebrow')}
              title={t('footerCta.title')}
              subtitle={t('footerCta.subtitle')}
              align="left"
              className="max-w-3xl"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" size="lg">
                  {t('footerCta.primaryCta')}
                </Button>
              </Link>
              <Link href={`/${locale}/products`}>
                <Button variant="ghost" size="lg">
                  {t('footerCta.secondaryCta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
