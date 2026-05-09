'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './Button'

function LeadFormFallback() {
  const t = useTranslations('common')
  return (
    <div
      aria-busy="true"
      className="flex h-72 items-center justify-center text-small text-[var(--color-neutral-400)]"
    >
      {t('loading')}
    </div>
  )
}

const LeadForm = dynamic(
  () => import('@/components/forms/LeadForm').then((m) => m.LeadForm),
  {
    ssr: false,
    loading: () => <LeadFormFallback />,
  },
)

export type GatedAssetType = 'catalog' | 'coa' | 'spec-sheet' | 'whitepaper'

export interface GatedDownloadProps {
  assetName: string
  assetType: GatedAssetType
  ctaLabel: string
  /** Optional public URL of a real file to deliver after lead capture. */
  assetUrl?: string
  className?: string
  triggerVariant?: 'primary' | 'secondary' | 'ghost'
}

export function GatedDownload({
  assetName,
  assetType,
  ctaLabel,
  assetUrl,
  className,
  triggerVariant = 'primary',
}: GatedDownloadProps) {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations('common')

  const handleSuccess = React.useCallback(() => {
    if (assetUrl) {
      const link = document.createElement('a')
      link.href = assetUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      const filename = assetUrl.split('/').pop()
      if (filename) link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    setOpen(false)
  }, [assetUrl])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <Button
        variant={triggerVariant}
        size="lg"
        onClick={() => setOpen(true)}
        className={className}
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {ctaLabel}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-neutral-900)]/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t('downloadAria', { asset: assetName })}
          >
            <motion.div
              className={cn(
                'relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-[var(--color-surface)]',
              )}
              style={{ boxShadow: 'var(--shadow-lg)' }}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label={t('close')}
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded text-[var(--color-neutral-700)] hover:bg-[var(--color-surface-alt)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="border-b border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] px-8 py-6">
                <span className="text-label text-[var(--color-brand-secondary)]">
                  {assetType.replace('-', ' ')}
                </span>
                <h3 className="text-h3 mt-1 text-[var(--color-neutral-900)]">
                  {assetName}
                </h3>
              </div>

              <div className="p-2">
                <LeadForm variant="gated" onSuccess={handleSuccess} className="border-0 shadow-none" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
