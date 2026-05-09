import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GatedDownload } from '@/components/ui/GatedDownload'
import enMessages from '@/messages/en.json'

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
  assetName: string
}

interface ProductDetailPageProps {
  params: { locale: string; slug: string }
}

export function generateStaticParams() {
  return enMessages.products.catalog.map((item) => ({ slug: item.slug }))
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const t = useTranslations('products')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const catalog = t.raw('catalog') as CatalogItem[]
  const product = catalog.find((item) => item.slug === params.slug)

  if (!product) {
    notFound()
  }

  const accent = CATEGORY_VAR[product.category]
  const categoryLabel = t(`categoryNames.${product.category}`)
  const related = catalog
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3)

  const rows = [
    { key: 'category', label: t('detail.rows.category'), value: categoryLabel },
    { key: 'ingredients', label: t('detail.rows.ingredients'), value: product.ingredients },
    { key: 'format', label: t('detail.rows.format'), value: product.format },
    { key: 'moq', label: t('detail.rows.moq'), value: t('detail.rows.moqValue') },
    { key: 'leadTime', label: t('detail.rows.leadTime'), value: t('detail.rows.leadTimeValue') },
    { key: 'sample', label: t('detail.rows.sample'), value: t('detail.rows.sampleValue') },
    { key: 'labelling', label: t('detail.rows.labelling'), value: t('detail.rows.labellingValue') },
    {
      key: 'compliance',
      label: t('detail.rows.compliance'),
      value: t('detail.rows.complianceValue'),
    },
  ]

  const coaName = t('detail.downloads.coaName', { product: product.name })

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-12">
          <nav aria-label="Breadcrumb" className="text-small text-[var(--color-neutral-700)]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center gap-1 hover:text-[var(--color-brand-primary)]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  {t('detail.breadcrumbProducts')}
                </Link>
              </li>
              <li className="text-[var(--color-neutral-400)]">/</li>
              <li>
                <Link
                  href={`/${locale}/products?category=${product.category}`}
                  className="hover:text-[var(--color-brand-primary)]"
                >
                  {categoryLabel}
                </Link>
              </li>
              <li className="text-[var(--color-neutral-400)]">/</li>
              <li className="text-[var(--color-neutral-900)]">{product.name}</li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-16 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-lg"
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
                src={`/images/products/catalog/${product.image}.png`}
                alt={product.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-12"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-6">
            <span
              className="text-label inline-flex w-fit rounded-sm px-3 py-1 text-[var(--color-surface)]"
              style={{ backgroundColor: accent }}
            >
              {categoryLabel}
            </span>

            <div className="flex flex-col gap-2">
              <h1 className="text-display text-[var(--color-brand-primary)]">{product.name}</h1>
              <span lang="zh-CN" className="text-h3 text-[var(--color-neutral-400)]">
                {product.nameZh}
              </span>
            </div>

            <p className="text-body text-[var(--color-neutral-700)]">{product.summary}</p>

            <div className="flex flex-col gap-3 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-6">
              <span className="text-label text-[var(--color-brand-secondary)]">
                {t('detail.formulation.heading')}
              </span>
              <p className="text-small text-[var(--color-neutral-700)]">
                {t('detail.formulation.body')}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <GatedDownload
                assetName={product.assetName}
                assetType="spec-sheet"
                ctaLabel={t('detail.downloads.specCta')}
                triggerVariant="primary"
              />
              <GatedDownload
                assetName={coaName}
                assetType="coa"
                ctaLabel={t('detail.downloads.coaCta')}
                triggerVariant="ghost"
              />
            </div>

            <p className="text-small text-[var(--color-neutral-400)]">
              {tCommon('fdaDisclaimer')}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-h2 text-[var(--color-brand-primary)]">
                {t('detail.tableHeading')}
              </h2>
              <p className="mt-3 text-body text-[var(--color-neutral-700)]">
                {t('detail.formulation.body')}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm">
                <table className="w-full border-collapse">
                  <thead className="bg-[var(--color-surface-alt)]">
                    <tr>
                      <th
                        scope="col"
                        className="text-label px-6 py-4 text-left text-[var(--color-neutral-700)]"
                      >
                        {t('detail.tableHeaders.parameter')}
                      </th>
                      <th
                        scope="col"
                        className="text-label px-6 py-4 text-left text-[var(--color-neutral-700)]"
                      >
                        {t('detail.tableHeaders.value')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr
                        key={row.key}
                        className={
                          idx % 2 === 1
                            ? 'bg-[var(--color-neutral-100)]'
                            : 'bg-[var(--color-surface)]'
                        }
                      >
                        <th
                          scope="row"
                          className="text-body w-1/3 px-6 py-5 text-left align-top font-medium text-[var(--color-neutral-900)]"
                        >
                          {row.label}
                        </th>
                        <td className="text-body px-6 py-5 align-top text-[var(--color-neutral-700)]">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-[var(--color-surface)]">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="text-h2 text-[var(--color-brand-primary)]">
                {t('detail.related.heading')}
              </h2>
              <Link
                href={`/${locale}/products?category=${product.category}`}
                className="text-small inline-flex items-center gap-1 font-medium text-[var(--color-brand-primary)] hover:underline"
              >
                {t('detail.related.viewAll', { category: categoryLabel })}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${locale}/products/${item.slug}`}
                  className="group flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-4 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div
                    className="relative aspect-square w-full overflow-hidden rounded"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${accent} 8%, var(--color-surface))`,
                    }}
                  >
                    <Image
                      src={`/images/products/catalog/${item.image}.png`}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-h3 text-[var(--color-brand-primary)]">{item.name}</span>
                    <span lang="zh-CN" className="text-small text-[var(--color-neutral-400)]">
                      {item.nameZh}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--color-surface-deep)] text-[var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-24 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <h2 className="text-h2 text-[var(--color-surface)]">{t('detail.ctaHeading')}</h2>
            <p className="text-body text-[var(--color-neutral-100)]/85">
              {t('detail.ctaSubtitle')}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href={`/${locale}/oem-odm#request-samples`}>
              <Button
                variant="primary"
                size="lg"
                className="bg-[var(--color-brand-accent)] text-[var(--color-surface)] hover:bg-[var(--color-brand-accent)]/90"
              >
                {t('detail.ctaPrimary')}
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                variant="ghost"
                size="lg"
                className="text-[var(--color-surface)] hover:bg-[var(--color-surface)]/10"
              >
                {t('detail.ctaSecondary')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
