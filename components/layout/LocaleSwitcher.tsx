'use client'

import * as React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
] as const

export interface LocaleSwitcherProps {
  className?: string
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value
    if (next === locale) return
    const segments = pathname.split('/')
    if (LOCALES.some((l) => l.code === segments[1])) {
      segments[1] = next
    } else {
      segments.splice(1, 0, next)
    }
    router.push(segments.join('/') || `/${next}`)
  }

  return (
    <label className={cn('relative inline-flex items-center gap-2', className)}>
      <Globe className="h-4 w-4 text-[var(--color-neutral-700)]" aria-hidden="true" />
      <span className="sr-only">{t('selectLanguage')}</span>
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none bg-transparent pr-2 text-small text-[var(--color-neutral-700)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  )
}
