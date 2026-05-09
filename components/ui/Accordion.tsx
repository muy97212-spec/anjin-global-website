'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  q: string
  a: string
}

export interface AccordionProps {
  items: AccordionItem[]
  className?: string
  defaultOpenIndex?: number
}

export function Accordion({ items, className, defaultOpenIndex }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(
    defaultOpenIndex ?? null,
  )

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        const panelId = `accordion-panel-${idx}`
        const buttonId = `accordion-trigger-${idx}`

        return (
          <div
            key={item.q}
            className="overflow-hidden rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] shadow-sm"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[var(--color-surface-alt)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]"
            >
              <span className="text-h3 text-[var(--color-neutral-900)]">{item.q}</span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 shrink-0 text-[var(--color-brand-primary)] transition-transform',
                  isOpen && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <p className="text-body px-6 pb-6 text-[var(--color-neutral-700)]">
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
