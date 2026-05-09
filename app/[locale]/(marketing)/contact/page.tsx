import * as React from 'react'
import { useTranslations } from 'next-intl'
import { Mail, MessageCircle, MapPin, Clock, ExternalLink } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LeadForm } from '@/components/forms/LeadForm'

const MAPS_QUERY =
  'Xinyuan+Financial+Plaza,+Jingsan+Road,+Jinshui+District,+Zhengzhou,+Henan,+China'
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`
const MAPS_LINK_URL = `https://www.google.com/maps?q=${MAPS_QUERY}`

interface ExpectationStep {
  title: string
  body: string
}

export default function ContactPage() {
  const t = useTranslations('contact')

  const email = {
    label: t('methods.items.email.label'),
    value: t('methods.items.email.value'),
    description: t('methods.items.email.description'),
  }
  const whatsapp = {
    label: t('methods.items.whatsapp.label'),
    value: t('methods.items.whatsapp.value'),
    description: t('methods.items.whatsapp.description'),
  }
  const address = {
    label: t('methods.items.address.label'),
    valueEn: t('methods.items.address.valueEn'),
    valueZh: t('methods.items.address.valueZh'),
    description: t('methods.items.address.description'),
  }
  const sla = {
    label: t('methods.items.sla.label'),
    value: t('methods.items.sla.value'),
    description: t('methods.items.sla.description'),
  }

  const expectations = t.raw('expectations.steps') as ExpectationStep[]

  return (
    <>
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="text-label text-[var(--color-brand-secondary)]">
              {t('hero.eyebrow')}
            </span>
            <h1 className="text-display text-[var(--color-neutral-900)]">{t('hero.title')}</h1>
            <p className="text-body max-w-2xl text-[var(--color-neutral-700)]">
              {t('hero.subtitle')}
            </p>
            <div className="mt-2 inline-flex w-fit items-center gap-2 rounded bg-[var(--color-surface-alt)] px-4 py-2 text-small text-[var(--color-brand-primary)]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {sla.value}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-alt)]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={t('methods.eyebrow')}
              title={t('methods.title')}
              align="left"
              as="h2"
            />

            <ul className="flex flex-col gap-4">
              <li className="flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Mail
                    className="h-5 w-5 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <span className="text-label text-[var(--color-neutral-700)]">{email.label}</span>
                </div>
                <a
                  href={`mailto:${email.value}`}
                  className="text-h3 text-[var(--color-brand-primary)] hover:underline"
                >
                  {email.value}
                </a>
                <p className="text-small text-[var(--color-neutral-700)]">{email.description}</p>
              </li>

              <li className="flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <MessageCircle
                    className="h-5 w-5 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <span className="text-label text-[var(--color-neutral-700)]">
                    {whatsapp.label}
                  </span>
                </div>
                <span className="text-h3 text-[var(--color-neutral-900)]">{whatsapp.value}</span>
                <p className="text-small text-[var(--color-neutral-700)]">{whatsapp.description}</p>
              </li>

              <li className="flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin
                    className="h-5 w-5 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <span className="text-label text-[var(--color-neutral-700)]">
                    {address.label}
                  </span>
                </div>
                <address className="not-italic">
                  <p className="text-h3 text-[var(--color-neutral-900)]">{address.valueEn}</p>
                  <p
                    lang="zh-CN"
                    className="mt-1 text-small text-[var(--color-neutral-700)]"
                  >
                    {address.valueZh}
                  </p>
                </address>
                <p className="text-small text-[var(--color-neutral-700)]">{address.description}</p>
              </li>

              <li className="flex flex-col gap-2 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Clock
                    className="h-5 w-5 text-[var(--color-brand-primary)]"
                    aria-hidden="true"
                  />
                  <span className="text-label text-[var(--color-neutral-700)]">{sla.label}</span>
                </div>
                <span className="text-h3 text-[var(--color-neutral-900)]">{sla.value}</span>
                <p className="text-small text-[var(--color-neutral-700)]">{sla.description}</p>
              </li>
            </ul>

            <div className="flex flex-col gap-4 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 shadow-sm">
              <h3 className="text-h3 text-[var(--color-neutral-900)]">
                {t('expectations.title')}
              </h3>
              <span className="text-label text-[var(--color-brand-secondary)]">
                {t('expectations.eyebrow')}
              </span>
              <ol className="flex flex-col gap-3">
                {expectations.map((step, idx) => (
                  <li
                    key={step.title}
                    className="flex items-start gap-4 text-small text-[var(--color-neutral-700)]"
                  >
                    <span
                      aria-hidden="true"
                      className="text-label inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-[var(--color-surface)]"
                    >
                      {idx + 1}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className="text-body font-medium text-[var(--color-neutral-900)]">
                        {step.title}
                      </span>
                      <span>{step.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <LeadForm variant="consultation" />
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow={t('map.eyebrow')}
            title={t('map.title')}
            subtitle={t('map.subtitle')}
            align="left"
            className="mb-8 max-w-3xl"
          />

          <div className="overflow-hidden rounded border border-[var(--color-surface-alt)] shadow-sm">
            <iframe
              src={MAPS_EMBED_URL}
              title={t('map.iframeTitle')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[480px] w-full border-0"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-small inline-flex items-center gap-2 text-[var(--color-brand-primary)] hover:underline"
            >
              {t('map.openInMaps')}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
