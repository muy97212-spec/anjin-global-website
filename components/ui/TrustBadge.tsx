import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TrustBadgeProps {
  label: string
  issuer: string
  icon: React.ReactNode
  downloadUrl?: string
  className?: string
}

export function TrustBadge({ label, issuer, icon, downloadUrl, className }: TrustBadgeProps) {
  const t = useTranslations('common')
  const Wrapper: React.ElementType = downloadUrl ? 'a' : 'div'

  return (
    <Wrapper
      {...(downloadUrl
        ? { href: downloadUrl, target: '_blank', rel: 'noopener noreferrer', download: true }
        : {})}
      className={cn(
        'group flex items-start gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm transition-colors',
        downloadUrl &&
          'hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-surface-alt)]',
        className,
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[var(--color-surface-alt)] text-[var(--color-brand-primary)]">
        {icon}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-h3 text-[var(--color-neutral-900)]">{label}</span>
        <span className="text-small text-[var(--color-neutral-700)]">{issuer}</span>
        {downloadUrl ? (
          <span className="mt-2 inline-flex items-center gap-1 text-small font-medium text-[var(--color-brand-primary)]">
            <Download className="h-4 w-4" aria-hidden="true" />
            {t('download')}
          </span>
        ) : null}
      </div>
    </Wrapper>
  )
}
