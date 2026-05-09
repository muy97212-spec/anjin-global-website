'use client'

import * as React from 'react'

export interface LeadMetadata {
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmContent: string
  referrerUrl: string
}

const EMPTY_METADATA: LeadMetadata = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  referrerUrl: '',
}

export function useLeadMetadata(): { metadata: LeadMetadata; mountedAt: number } {
  const [metadata, setMetadata] = React.useState<LeadMetadata>(EMPTY_METADATA)
  const mountedAtRef = React.useRef<number>(Date.now())

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    setMetadata({
      utmSource: params.get('utm_source') ?? '',
      utmMedium: params.get('utm_medium') ?? '',
      utmCampaign: params.get('utm_campaign') ?? '',
      utmContent: params.get('utm_content') ?? '',
      referrerUrl: document.referrer ?? '',
    })
  }, [])

  return { metadata, mountedAt: mountedAtRef.current }
}
