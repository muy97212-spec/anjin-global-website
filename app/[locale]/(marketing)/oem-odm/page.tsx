import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadForm } from '@/components/forms/LeadForm'

interface ProcessStep {
  number: string
  title: string
  body: string
}

interface CapabilityRow {
  label: string
  value: string
}

interface SampleOption {
  tag: string
  title: string
  body: string
  bullets: string[]
}

const REQUEST_FORM_ANCHOR = 'request-samples'

export default function OemOdmPage() {
  const tHero = useTranslations('oemOdm.hero')
  const tProcess = useTranslations('oemOdm.process')
  const tCaps = useTranslations('oemOdm.capabilities')
  const tSamples = useTranslations('oemOdm.samples')
  const tForm = useTranslations('oemOdm.form')
  const tCompliance = useTranslations('oemOdm.compliance')
  const tCommon = useTranslations('common')
  const locale = useLocale()

  const steps = tProcess.raw('steps') as ProcessStep[]
  const rows = tCaps.raw('rows') as CapabilityRow[]
  const sampleOptions = tSamples.raw('options') as SampleOption[]

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="text-label text-[var(--color-brand-secondary)]">
              {tHero('eyebrow')}
            </span>
            <h1 className="text-display text-[var(--color-neutral-900)]">{tHero('title')}</h1>
            <p className="text-body max-w-2xl text-[var(--color-neutral-700)]">
              {tHero('subtitle')}
            </p>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href={`#${REQUEST_FORM_ANCHOR}`}>
                <Button variant="primary" size="lg">
                  {tHero('primaryCta')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="ghost" size="lg">
                  {tHero('secondaryCta')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={tProcess('eyebrow')}
            title={tProcess('title')}
            subtitle={tProcess('subtitle')}
            align="center"
            className="mx-auto mb-16"
          />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, idx) => (
              <li
                key={step.number}
                className="relative flex flex-col gap-3 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-label text-[var(--color-brand-secondary)]">
                    {step.number}
                  </span>
                  {idx < steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-px w-12 bg-[var(--color-neutral-400)] lg:block"
                    />
                  ) : null}
                </div>
                <h3 className="text-h3 text-[var(--color-neutral-900)]">{step.title}</h3>
                <p className="text-small text-[var(--color-neutral-700)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={tCaps('eyebrow')}
            title={tCaps('title')}
            subtitle={tCaps('subtitle')}
            align="left"
            className="mb-12"
          />

          <div className="overflow-hidden rounded border border-[var(--color-surface-alt)] shadow-sm">
            <table className="w-full border-collapse">
              <thead className="bg-[var(--color-surface-alt)]">
                <tr>
                  <th
                    scope="col"
                    className="text-label px-6 py-4 text-left text-[var(--color-neutral-700)]"
                  >
                    {tCaps('headers.parameter')}
                  </th>
                  <th
                    scope="col"
                    className="text-label px-6 py-4 text-left text-[var(--color-neutral-700)]"
                  >
                    {tCaps('headers.detail')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.label}
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
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={tSamples('eyebrow')}
            title={tSamples('title')}
            subtitle={tSamples('subtitle')}
            align="center"
            className="mx-auto mb-16"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {sampleOptions.map((option) => (
              <article
                key={option.tag}
                className="flex flex-col gap-5 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 shadow-sm"
              >
                <span className="text-label inline-flex w-fit rounded bg-[var(--color-surface-alt)] px-3 py-1 text-[var(--color-brand-primary)]">
                  {option.tag}
                </span>
                <h3 className="text-h2 text-[var(--color-neutral-900)]">{option.title}</h3>
                <p className="text-body text-[var(--color-neutral-700)]">{option.body}</p>
                <ul className="mt-2 flex flex-col gap-3">
                  {option.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-small flex items-start gap-3 text-[var(--color-neutral-700)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-secondary)]"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id={REQUEST_FORM_ANCHOR} className="bg-[var(--color-surface)] scroll-mt-24">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={tForm('eyebrow')}
              title={tForm('title')}
              subtitle={tForm('subtitle')}
              align="left"
            />

            <div className="mt-4 flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface-alt)] p-6">
              <h3 className="text-h3 text-[var(--color-neutral-900)]">{tCompliance('title')}</h3>
              <p className="text-small text-[var(--color-neutral-700)]">{tCompliance('body')}</p>
              <p className="text-small text-[var(--color-neutral-400)]">
                {tCommon('fdaDisclaimer')}
              </p>
            </div>
          </div>

          <LeadForm variant="sample" />
        </div>
      </section>
    </>
  )
}
