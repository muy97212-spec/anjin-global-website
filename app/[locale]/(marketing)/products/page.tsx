import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GatedDownload } from '@/components/ui/GatedDownload'
import { cn } from '@/lib/utils'

type CategoryKey =
  | 'joint'
  | 'skin'
  | 'digestive'
  | 'vitamins'
  | 'calcium'
  | 'lifestage'
  | 'specialty'

type FilterKey = 'all' | CategoryKey

const FILTER_KEYS = [
  'all',
  'joint',
  'skin',
  'digestive',
  'vitamins',
  'calcium',
  'lifestage',
  'specialty',
] as const

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
  assetName: string
}

interface ProductsPageProps {
  searchParams: { category?: string }
}

function isFilterKey(value: string | undefined): value is FilterKey {
  return value !== undefined && (FILTER_KEYS as readonly string[]).includes(value)
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const activeFilter: FilterKey = isFilterKey(searchParams.category) ? searchParams.category : 'all'
  const catalog = t.raw('catalog') as CatalogItem[]
  const visible =
    activeFilter === 'all'
      ? catalog
      : catalog.filter((item) => item.category === activeFilter)

  const ctaLabel = t('grid.ctaLabel')
  const viewLabel = t('grid.viewLabel')
  const labels = {
    ingredients: t('grid.labels.ingredients'),
    format: t('grid.labels.format'),
    summary: t('grid.labels.summary'),
  }
  const disclaimer = tCommon('fdaDisclaimer')

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
            <p className="text-small text-[var(--color-neutral-700)]">
              {visible.length}/{catalog.length} {t('grid.empty').split('.')[0].toLowerCase().includes('no') ? '' : ''}
              <span className="ml-2 text-[var(--color-neutral-400)]">
                {activeFilter === 'all' ? '' : t(`categoryNames.${activeFilter}`)}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--color-surface-alt)] bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-6">
          <nav aria-label={t('filters.ariaLabel')}>
            <span className="sr-only">{t('filters.label')}</span>
            <ul className="flex flex-wrap gap-2">
              {FILTER_KEYS.map((key) => {
                const isActive = key === activeFilter
                const href =
                  key === 'all' ? `/${locale}/products` : `/${locale}/products?category=${key}`
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'text-label inline-flex items-center rounded-sm px-4 py-2 transition-colors',
                        isActive
                          ? 'bg-[var(--color-brand-primary)] text-[var(--color-surface)]'
                          : 'bg-[var(--color-surface-alt)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]',
                      )}
                    >
                      {t(`filters.${key}`)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          {visible.length === 0 ? (
            <p className="text-body rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 text-[var(--color-neutral-700)]">
              {t('grid.empty')}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((item) => {
                const accent = CATEGORY_VAR[item.category]
                return (
                  <article
                    key={item.slug}
                    className="group relative flex flex-col overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <Link
                      href={`/${locale}/products/${item.slug}`}
                      aria-label={`${viewLabel}: ${item.name}`}
                      className="relative block aspect-square w-full overflow-hidden"
                      style={{ backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--color-surface))` }}
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
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <span
                        className="text-label absolute bottom-4 left-4 inline-flex rounded-sm px-3 py-1 text-[var(--color-surface)]"
                        style={{ backgroundColor: accent }}
                      >
                        {t(`categoryNames.${item.category}`)}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h2 className="text-h3 text-[var(--color-brand-primary)]">{item.name}</h2>
                        <span
                          lang="zh-CN"
                          className="text-small shrink-0 text-[var(--color-neutral-400)]"
                        >
                          {item.nameZh}
                        </span>
                      </div>

                      <p className="text-body text-[var(--color-neutral-700)]">{item.summary}</p>

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
                      </dl>

                      <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                          href={`/${locale}/products/${item.slug}`}
                          className="text-small inline-flex items-center gap-1 font-medium text-[var(--color-brand-primary)] hover:underline"
                        >
                          {viewLabel}
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
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
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex flex-col gap-8 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-10 lg:flex-row lg:items-center lg:justify-between">
            <SectionHeading
              eyebrow={t('footerCta.eyebrow')}
              title={t('footerCta.title')}
              subtitle={t('footerCta.subtitle')}
              align="left"
              className="max-w-3xl"
            />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={`/${locale}/oem-odm`}>
                <Button variant="primary" size="lg">
                  {t('footerCta.primaryCta')}
                </Button>
              </Link>
              <Link href={`/${locale}/oem-odm#request-samples`}>
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
