import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GatedDownload } from '@/components/ui/GatedDownload'
import { cn } from '@/lib/utils'

export interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className }: HeroSectionProps) {
  const t = useTranslations('home.hero')
  const locale = useLocale()

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[var(--color-surface)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[var(--color-brand-secondary)]/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[var(--color-brand-accent-soft)]/30 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-12 lg:py-32">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <span className="text-label inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-brand-primary)]/20 bg-[var(--color-surface-alt)] px-4 py-2 text-[var(--color-brand-primary)]">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-secondary)]"
            />
            {t('eyebrow')}
          </span>

          <h1 className="text-hero max-w-2xl text-[var(--color-brand-primary)]">{t('title')}</h1>

          <p className="text-body max-w-xl text-[var(--color-neutral-700)]">{t('subtitle')}</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <GatedDownload
              assetName={t('catalogAssetName')}
              assetType="catalog"
              ctaLabel={t('primaryCta')}
              triggerVariant="primary"
            />
            <Link href={`/${locale}/contact`}>
              <Button
                variant="ghost"
                size="lg"
                className="text-[var(--color-brand-primary)] hover:bg-[var(--color-surface-alt)]"
              >
                {t('secondaryCta')}
              </Button>
            </Link>
          </div>

          <div className="mt-2 flex items-center gap-3 border-t border-[var(--color-surface-alt)] pt-6 text-small text-[var(--color-neutral-700)]">
            <ShieldCheck
              className="h-5 w-5 shrink-0 text-[var(--color-brand-secondary)]"
              aria-hidden="true"
            />
            <span className="font-medium text-[var(--color-brand-primary)]">{t('proudLine')}</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative ml-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-lg bg-[var(--color-surface-alt)] shadow-lg">
            <Image
              src="/images/factory/hero.svg"
              alt={t('imageAlt')}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
