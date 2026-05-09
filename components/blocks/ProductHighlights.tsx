import * as React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GatedDownload } from '@/components/ui/GatedDownload'
import { cn } from '@/lib/utils'

interface ProductCard {
  title: string
  imageAlt: string
  ingredients: string
  format: string
  marketNote: string
  assetName: string
}

const PRODUCT_IMAGES = [
  '/images/products/hip-joint.svg',
  '/images/products/probiotic.svg',
  '/images/products/mushroom.svg',
] as const

export interface ProductHighlightsProps {
  className?: string
}

export function ProductHighlights({ className }: ProductHighlightsProps) {
  const t = useTranslations('home.products')
  const tCommon = useTranslations('common')
  const items = t.raw('items') as ProductCard[]
  const ctaLabel = t('ctaLabel')
  const labels = {
    ingredients: t('labels.ingredients'),
    format: t('labels.format'),
    marketContext: t('labels.marketContext'),
  }
  const disclaimer = tCommon('fdaDisclaimer')

  return (
    <section className={cn('mx-auto w-full max-w-7xl px-6 py-24', className)}>
      <SectionHeading
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
        className="mx-auto mb-16"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <article
            key={item.title}
            className="flex flex-col overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full bg-[var(--color-surface-alt)]">
              <Image
                src={PRODUCT_IMAGES[idx]}
                alt={item.imageAlt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-6">
              <h3 className="text-h3 text-[var(--color-neutral-900)]">{item.title}</h3>
              <dl className="flex flex-col gap-3 text-small text-[var(--color-neutral-700)]">
                <div>
                  <dt className="text-label text-[var(--color-neutral-400)]">
                    {labels.ingredients}
                  </dt>
                  <dd className="mt-1">{item.ingredients}</dd>
                </div>
                <div>
                  <dt className="text-label text-[var(--color-neutral-400)]">
                    {labels.format}
                  </dt>
                  <dd className="mt-1">{item.format}</dd>
                </div>
                <div>
                  <dt className="text-label text-[var(--color-neutral-400)]">
                    {labels.marketContext}
                  </dt>
                  <dd className="mt-1">{item.marketNote}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-2">
                <GatedDownload
                  assetName={item.assetName}
                  assetType="spec-sheet"
                  ctaLabel={ctaLabel}
                  triggerVariant="ghost"
                />
              </div>
              <p className="text-small text-[var(--color-neutral-400)]">{disclaimer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
