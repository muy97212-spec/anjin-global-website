import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export interface CTABannerProps {
  className?: string
}

export function CTABanner({ className }: CTABannerProps) {
  const t = useTranslations('home.ctaBanner')
  const locale = useLocale()

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-[var(--color-surface-deep)] text-[var(--color-surface)]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[var(--color-brand-accent)]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-20 h-[320px] w-[320px] rounded-full bg-[var(--color-brand-secondary)]/15 blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="text-label text-[var(--color-brand-accent-soft)]">{t('eyebrow')}</span>
          <h2 className="text-h1 text-[var(--color-surface)]">{t('title')}</h2>
          <p className="text-body text-[var(--color-neutral-100)]/85">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href={`/${locale}/contact`}>
            <Button
              variant="primary"
              size="lg"
              className="bg-[var(--color-brand-accent)] text-[var(--color-surface)] hover:bg-[var(--color-brand-accent)]/90"
            >
              {t('primaryCta')}
            </Button>
          </Link>
          <Link href={`/${locale}/oem-odm`}>
            <Button
              variant="ghost"
              size="lg"
              className="text-[var(--color-surface)] hover:bg-[var(--color-surface)]/10"
            >
              {t('secondaryCta')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
