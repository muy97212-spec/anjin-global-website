import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/utils'

type CategoryKey =
  | 'joint'
  | 'skin'
  | 'digestive'
  | 'vitamins'
  | 'calcium'
  | 'lifestage'
  | 'specialty'

const CATEGORY_VAR: Record<CategoryKey, string> = {
  joint: 'var(--color-cat-joint)',
  skin: 'var(--color-cat-skin)',
  digestive: 'var(--color-cat-digestive)',
  vitamins: 'var(--color-cat-vitamins)',
  calcium: 'var(--color-cat-calcium)',
  lifestage: 'var(--color-cat-lifestage)',
  specialty: 'var(--color-cat-specialty)',
}

interface CatalogItem {
  slug: string
  category: CategoryKey
  image: string
  name: string
  nameZh: string
  imageAlt: string
  ingredients: string
  format: string
  summary: string
}

export interface ProductHighlightsProps {
  className?: string
}

export function ProductHighlights({ className }: ProductHighlightsProps) {
  const t = useTranslations('home.products')
  const tProducts = useTranslations('products')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const featuredSlugs = t.raw('featuredSlugs') as string[]
  const catalog = tProducts.raw('catalog') as CatalogItem[]
  const featured = featuredSlugs
    .map((slug) => catalog.find((item) => item.slug === slug))
    .filter((item): item is CatalogItem => Boolean(item))

  return (
    <section className={cn('bg-[var(--color-surface)]', className)}>
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t('eyebrow')}
            title={t('title')}
            subtitle={t('subtitle')}
            align="left"
            className="max-w-3xl"
          />
          <Link
            href={`/${locale}/products`}
            className="text-small inline-flex w-fit items-center gap-1 font-medium text-[var(--color-brand-primary)] hover:underline"
          >
            {t('viewAllLabel')}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 lg:mx-0 lg:px-0"
          style={{ scrollbarWidth: 'thin' }}
        >
          {featured.map((item) => {
            const accent = CATEGORY_VAR[item.category]
            return (
              <li
                key={item.slug}
                className="w-[78vw] shrink-0 snap-start sm:w-[48vw] lg:w-[calc((100%-48px)/3)]"
              >
                <Link
                  href={`/${locale}/products/${item.slug}`}
                  aria-label={`${t('viewProductLabel')}: ${item.name}`}
                  className="group flex h-full flex-col overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className="relative aspect-square w-full overflow-hidden"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--color-surface))`,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1"
                      style={{ backgroundColor: accent }}
                    />
                    <Image
                      src={`/images/products/catalog/${item.image}.png`}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 78vw"
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <span
                      className="text-label absolute bottom-4 left-4 inline-flex rounded-sm px-3 py-1 text-[var(--color-surface)]"
                      style={{ backgroundColor: accent }}
                    >
                      {tProducts(`categoryNames.${item.category}`)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-h3 text-[var(--color-brand-primary)]">{item.name}</h3>
                      <span
                        lang="zh-CN"
                        className="text-small shrink-0 text-[var(--color-neutral-400)]"
                      >
                        {item.nameZh}
                      </span>
                    </div>
                    <p className="text-small text-[var(--color-neutral-700)]">{item.summary}</p>
                    <span className="text-small mt-auto inline-flex items-center gap-1 font-medium text-[var(--color-brand-primary)]">
                      {t('viewProductLabel')}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mt-6 text-small text-[var(--color-neutral-400)]">
          {tCommon('fdaDisclaimer')}
        </p>
      </div>
    </section>
  )
}
