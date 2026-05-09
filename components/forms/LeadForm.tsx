'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import {
  baseLeadSchema,
  type LeadPayload,
  type LeadVariant,
} from '@/lib/validations/lead'
import { useLeadMetadata } from '@/lib/hooks/useLeadMetadata'
import { Button } from '@/components/ui/Button'

const PRODUCT_INTERESTS = [
  'Hip & Joint Soft Chews',
  'Probiotic Soft Chews / Powder',
  'Functional Mushroom Soft Chews',
  'Livestock Medicine',
  'Aquatic Supplements',
  'Feed Additives',
  'Custom Formulation',
] as const

const VARIANT_COPY: Record<
  LeadVariant,
  { title: string; description: string; ctaLabel: string; temperature: 'cold' | 'warm' | 'hot' }
> = {
  gated: {
    title: 'Download our product catalog',
    description:
      'Receive our full product catalog and certifications dossier. We respond within 24 hours.',
    ctaLabel: 'Send me the catalog',
    temperature: 'cold',
  },
  sample: {
    title: 'Request free samples',
    description:
      'Stock samples ship in 3–5 days. Custom samples in 2–4 weeks. Tell us what you need.',
    ctaLabel: 'Request samples',
    temperature: 'warm',
  },
  consultation: {
    title: 'Book a supply chain consultation',
    description:
      'Speak with our OEM/ODM team about formulation, MOQ, and lead times. We respond within 24 hours.',
    ctaLabel: 'Book consultation',
    temperature: 'hot',
  },
}

export interface LeadFormProps {
  variant: LeadVariant
  endpoint?: string
  className?: string
  onSuccess?: () => void
}

type FormValues = LeadPayload

export function LeadForm({
  variant,
  endpoint = '/api/leads',
  className,
  onSuccess,
}: LeadFormProps) {
  const copy = VARIANT_COPY[variant]
  const { metadata, mountedAt } = useLeadMetadata()
  const [submitState, setSubmitState] = React.useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(baseLeadSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      businessEmail: '',
      company: '',
      country: '',
      productInterest: '',
      message: '',
      honeypot: '',
      utmSource: '',
      utmMedium: '',
      utmCampaign: '',
      utmContent: '',
      referrerUrl: '',
      leadTemperature: copy.temperature,
      submittedAt: new Date().toISOString(),
      timeOnPageSeconds: 0,
    },
  })

  const onSubmit = async (values: FormValues) => {
    const payload: FormValues = {
      ...values,
      ...metadata,
      leadTemperature: copy.temperature,
      submittedAt: new Date().toISOString(),
      timeOnPageSeconds: Math.round((Date.now() - mountedAt) / 1000),
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error('Request failed')
      setSubmitState('success')
      reset()
      onSuccess?.()
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        'flex flex-col gap-6 rounded border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 shadow-sm',
        className,
      )}
    >
      <header className="flex flex-col gap-2">
        <h3 className="text-h2 text-[var(--color-neutral-900)]">{copy.title}</h3>
        <p className="text-small text-[var(--color-neutral-700)]">{copy.description}</p>
      </header>

      {/* Honeypot — visually hidden, must remain empty */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Do not fill this field
          <input type="text" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message} htmlFor="firstName">
          <input id="firstName" type="text" {...register('firstName')} className={inputClass} />
        </Field>
        <Field label="Last name" error={errors.lastName?.message} htmlFor="lastName">
          <input id="lastName" type="text" {...register('lastName')} className={inputClass} />
        </Field>
      </div>

      <Field
        label="Business email"
        error={errors.businessEmail?.message}
        htmlFor="businessEmail"
        hint="Free providers (Gmail, Yahoo, QQ, 163) are not accepted."
      >
        <input
          id="businessEmail"
          type="email"
          autoComplete="email"
          {...register('businessEmail')}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Company" error={errors.company?.message} htmlFor="company">
          <input id="company" type="text" {...register('company')} className={inputClass} />
        </Field>
        <Field label="Country" error={errors.country?.message} htmlFor="country">
          <input id="country" type="text" {...register('country')} className={inputClass} />
        </Field>
      </div>

      <Field
        label="Product interest"
        error={errors.productInterest?.message}
        htmlFor="productInterest"
      >
        <select
          id="productInterest"
          {...register('productInterest')}
          className={inputClass}
          defaultValue=""
        >
          <option value="" disabled>
            Select a category
          </option>
          {PRODUCT_INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message (optional)" error={errors.message?.message} htmlFor="message">
        <textarea
          id="message"
          rows={4}
          {...register('message')}
          className={cn(inputClass, 'min-h-[120px] resize-y')}
        />
      </Field>

      {/* Hidden tracking fields */}
      <input type="hidden" {...register('utmSource')} />
      <input type="hidden" {...register('utmMedium')} />
      <input type="hidden" {...register('utmCampaign')} />
      <input type="hidden" {...register('utmContent')} />
      <input type="hidden" {...register('referrerUrl')} />
      <input type="hidden" {...register('leadTemperature')} />
      <input type="hidden" {...register('submittedAt')} />
      <input
        type="hidden"
        {...register('timeOnPageSeconds', { valueAsNumber: true })}
        onFocus={() =>
          setValue('timeOnPageSeconds', Math.round((Date.now() - mountedAt) / 1000))
        }
      />

      <Button type="submit" variant="primary" size="lg" loading={isSubmitting}>
        {copy.ctaLabel}
      </Button>

      {submitState === 'success' ? (
        <p
          role="status"
          className="text-small rounded bg-[var(--color-surface-alt)] p-3 text-[var(--color-brand-secondary)]"
        >
          Thank you. Our team will reply within 24 hours.
        </p>
      ) : null}
      {submitState === 'error' ? (
        <p
          role="alert"
          className="text-small rounded bg-[var(--color-surface-alt)] p-3 text-[var(--color-brand-accent)]"
        >
          Something went wrong. Please try again or email us directly.
        </p>
      ) : null}

      <p className="text-small text-[var(--color-neutral-400)]">
        By submitting this form you agree to be contacted regarding your enquiry. We respond within
        24 hours.
      </p>
    </form>
  )
}

const inputClass =
  'w-full rounded border border-[var(--color-neutral-400)] bg-[var(--color-surface)] px-4 py-3 text-body text-[var(--color-neutral-900)] placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/20'

interface FieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: React.ReactNode
}

function Field({ label, htmlFor, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-label text-[var(--color-neutral-700)]">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <span className="text-small text-[var(--color-neutral-400)]">{hint}</span>
      ) : null}
      {error ? (
        <span className="text-small text-[var(--color-brand-accent)]" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
