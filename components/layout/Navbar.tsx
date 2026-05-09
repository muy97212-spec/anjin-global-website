'use client'

import * as React from 'react'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { LocaleSwitcher } from './LocaleSwitcher'

interface NavLink {
  href: string
  key: 'products' | 'oemOdm' | 'certifications' | 'about' | 'blog'
}

const NAV_LINKS: NavLink[] = [
  { href: '/products', key: 'products' },
  { href: '/oem-odm', key: 'oemOdm' },
  { href: '/certifications', key: 'certifications' },
  { href: '/about', key: 'about' },
  { href: '/blog', key: 'blog' },
]

export interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const localeHref = (href: string) => `/${locale}${href}`

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-[var(--color-surface-alt)] bg-[var(--color-surface)]/90 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 text-h3 font-bold text-[var(--color-brand-primary)]"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded bg-[var(--color-brand-primary)] text-[var(--color-surface)] text-base font-bold"
          >
            A
          </span>
          Anjin Global
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label={t('primary')}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={localeHref(link.href)}
              className="text-small text-[var(--color-neutral-700)] transition-colors hover:text-[var(--color-brand-primary)]"
            >
              {t(`links.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <Link href={localeHref('/contact')}>
            <Button variant="primary" size="sm">
              {t('ctaSamples')}
            </Button>
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded text-[var(--color-neutral-900)] hover:bg-[var(--color-surface-alt)] md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-[var(--color-surface-alt)] bg-[var(--color-surface)] md:hidden"
        >
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label={t('mobile')}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={localeHref(link.href)}
                onClick={() => setMobileOpen(false)}
                className="rounded px-3 py-3 text-body text-[var(--color-neutral-700)] hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-brand-primary)]"
              >
                {t(`links.${link.key}`)}
              </Link>
            ))}
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-[var(--color-surface-alt)] pt-4">
              <LocaleSwitcher />
              <Link href={localeHref('/contact')} onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="sm">
                  {t('ctaSamples')}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
