import * as React from 'react'
import {
  HeroSection,
  TrustBar,
  MetricGrid,
  WhyAnjin,
  ProductHighlights,
  SocialProof,
  CTABanner,
} from '@/components'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <MetricGrid />
      <WhyAnjin />
      <ProductHighlights />
      <SocialProof />
      <CTABanner />
    </>
  )
}
