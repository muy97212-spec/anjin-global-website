import * as React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface FooterColumn {
  key: 'products' | 'capabilities' | 'company'
  links: { href: string; key: string }[]
}

const COLUMNS: FooterColumn[] = [
  {
    key: 'products',
    links: [
      { href: '/products', key: 'hipJoint' },
      { href: '/products', key: 'probiotic' },
      { href: '/products', key: 'mushroom' },
      { href: '/products', key: 'livestockAquatic' },
    ],
  },
  {
    key: 'capabilities',
    links: [
      { href: '/oem-odm', key: 'oemOdm' },
      { href: '/oem-odm', key: 'formulation' },
      { href: '/oem-odm', key: 'production' },
      { href: '/certifications', key: 'quality' },
    ],
  },
  {
    key: 'company',
    links: [
      { href: '/about', key: 'about' },
      { href: '/certifications', key: 'certifications' },
      { href: '/blog', key: 'blog' },
      { href: '/contact', key: 'contact' },
    ],
  },
]

export interface FooterProps {
  className?: string
  locale?: string
}

export function Footer({ className, locale = 'en' }: FooterProps) {
  const t = useTranslations('footer')
  const tCommon = useTranslations('common')
  const localeHref = (href: string) => `/${locale}${href}`
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'mt-24 border-t border-[var(--color-surface-alt)] bg-[var(--color-neutral-900)] text-[var(--color-neutral-100)]',
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-h3 font-bold text-[var(--color-surface)]">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded bg-[var(--color-brand-primary)] text-[var(--color-surface)] text-base font-bold"
            >
              A
            </span>
            Anjin Global
          </div>
          <p className="text-small text-[var(--color-neutral-400)]">{t('tagline')}</p>
          <p className="text-small text-[var(--color-neutral-400)]">{t('address')}</p>
          <p className="text-label text-[var(--color-brand-secondary)]">
            {t('certificationsLine')}
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.key} className="flex flex-col gap-4">
            <h4 className="text-label text-[var(--color-neutral-400)]">
              {t(`columns.${column.key}.heading`)}
            </h4>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={`${column.key}-${link.key}`}>
                  <Link
                    href={localeHref(link.href)}
                    className="text-small text-[var(--color-neutral-100)] transition-colors hover:text-[var(--color-brand-secondary)]"
                  >
                    {t(`columns.${column.key}.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--color-neutral-700)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-6 text-small text-[var(--color-neutral-400)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Henan Anjin Biotechnology Co., Ltd. {t('rights')}
          </p>
          <p className="max-w-2xl">{tCommon('fdaDisclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
