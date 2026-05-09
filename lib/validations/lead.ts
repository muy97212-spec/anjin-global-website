import { z } from 'zod'

export const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'qq.com',
  '163.com',
  '126.com',
  'sina.com',
] as const

const businessEmail = z
  .string()
  .min(1, 'Business email is required')
  .email('Please enter a valid email address')
  .refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase().trim()
      if (!domain) return false
      return !FREE_EMAIL_DOMAINS.includes(domain as (typeof FREE_EMAIL_DOMAINS)[number])
    },
    { message: 'Please use your company email address (free providers are not accepted)' },
  )

export const LEAD_TEMPERATURES = ['cold', 'warm', 'hot'] as const
export type LeadTemperature = (typeof LEAD_TEMPERATURES)[number]

export const LEAD_VARIANTS = ['gated', 'sample', 'consultation'] as const
export type LeadVariant = (typeof LEAD_VARIANTS)[number]

export const baseLeadSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  businessEmail,
  company: z.string().min(1, 'Company is required').max(120),
  country: z.string().min(2, 'Country is required').max(80),
  productInterest: z.string().min(1, 'Please select a product interest').max(120),
  message: z.string().max(2000).optional(),

  // Hidden anti-spam fields
  honeypot: z.literal('', {
    errorMap: () => ({ message: 'Spam detected' }),
  }),
  utmSource: z.string().default(''),
  utmMedium: z.string().default(''),
  utmCampaign: z.string().default(''),
  utmContent: z.string().default(''),
  referrerUrl: z.string().default(''),
  leadTemperature: z.enum(LEAD_TEMPERATURES),
  submittedAt: z.string().min(1),
  timeOnPageSeconds: z
    .number({ invalid_type_error: 'Suspicious submission' })
    .min(8, 'Please take a moment to review the form before submitting'),
})

export type LeadPayload = z.infer<typeof baseLeadSchema>
