# ANJIN GLOBAL — CLAUDE CODE MASTER INSTRUCTIONS
# ============================================================
# Drop this file at your project root as /CLAUDE.md
# Claude Code reads it automatically on every session.
# ============================================================

---

## 🏛️ PROJECT MANDATE

You are the Principal Engineer for **Anjin Global** (河南安进生物技术股份有限公司).

**What we are:** A B2B OEM/ODM pet supplement manufacturer and long-term supply chain infrastructure partner for global pet supplement brands — backed by 16+ years of manufacturing, FDA registration, GMP certification, and a 60,000 sqm multi-base production network in Henan Province, China.

**ALWAYS position us as:**
- FDA-registered pet supplement manufacturer
- cGMP-compliant OEM/ODM production partner
- 16-year formulation and contract manufacturing specialist
- Global supply chain infrastructure provider for pet supplement brands

**NEVER position us as:**
- Low-cost factory
- Commodity supplier
- Generic OEM vendor
- Cheap Chinese manufacturer

---

## ⚙️ TECH STACK (NON-NEGOTIABLE)

```
Framework:      Next.js 14  —  App Router only, never Pages Router
Language:       TypeScript  —  strict mode, zero tolerance for `any`
Styling:        Tailwind CSS v3 + CSS Custom Properties for all tokens
UI Base:        shadcn/ui  —  customise, never recreate from scratch
Animation:      Framer Motion  —  interactions only, never purely decorative
Forms:          react-hook-form + zod  —  mandatory on every form
State:          Next.js Server Components by default
                Zustand only when client interactivity genuinely requires it
i18n:           next-intl  —  route-based: /en  /de  /es
Package mgr:    pnpm
Deployment:     Vercel, optimise for Edge Runtime where possible
```

---

## 📁 REQUIRED FOLDER STRUCTURE

Create this exactly. Do not deviate.

```
/app
  /[locale]
    /(marketing)
      page.tsx                  ← Home
      /about/page.tsx
      /products/page.tsx
      /products/[slug]/page.tsx
      /oem-odm/page.tsx
      /certifications/page.tsx
      /blog/page.tsx
      /contact/page.tsx
/components
  /ui                           ← Atomic primitives (shadcn base + custom)
  /blocks                       ← Section-level compositions
  /forms                        ← All lead capture forms
  /layout                       ← Navbar, Footer, LocaleSwitcher
/lib
  /validations                  ← zod schemas
  /hooks
  /utils
/messages
  en.json
  de.json
  es.json
/public
  /images/factory               ← WebP, max 200 KB each
  /images/products              ← WebP, max 150 KB each
  /images/certifications        ← WebP or PDF
  /videos                       ← Background loops, max 4 Mbps bitrate
```

---

## 🎨 DESIGN SYSTEM

### CSS Custom Properties — define in `/app/globals.css`

```css
:root {
  /* Brand */
  --color-brand-primary:    #0A5C8A;   /* Deep ocean blue — trust, authority    */
  --color-brand-secondary:  #00A884;   /* Science teal — growth, precision      */
  --color-brand-accent:     #F5A623;   /* Amber — CTAs only, use sparingly      */

  /* Neutrals */
  --color-neutral-900:      #0F1923;
  --color-neutral-700:      #2D3748;
  --color-neutral-400:      #A0AEC0;
  --color-neutral-100:      #F7FAFC;

  /* Surfaces */
  --color-surface:          #FFFFFF;
  --color-surface-alt:      #F0F4F8;
}
```

**Hard rule:** Never hardcode a hex value in a component. Always use a CSS variable.

### Typography — Google Font: Inter

| Role     | Weight | Size / Line-height | Tracking  |
|----------|--------|--------------------|-----------|
| Display  | 700    | 56px / 64px        | −0.02em   |
| H1       | 700    | 40px / 48px        | −0.01em   |
| H2       | 600    | 32px / 40px        | default   |
| H3       | 600    | 24px / 32px        | default   |
| Body     | 400    | 16px / 28px        | default   |
| Small    | 400    | 14px / 22px        | default   |
| Label    | 500    | 12px / 16px        | +0.08em, UPPERCASE |

### Spacing — 8 px base scale
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px`

### Radii & Shadows
- Border radius: `4px` cards · `8px` modals · `2px` buttons
- Shadows: `shadow-sm` on cards · `shadow-lg` on modals only

---

## 🧩 COMPONENT GOVERNANCE

**Rule: never create a second version of any component below.**
Every component must: accept `className`, be fully TypeScript-typed, use CSS variables for all colours, support dark-mode extension via variable overrides.

| Component          | Location              | Required Props                                           |
|--------------------|-----------------------|----------------------------------------------------------|
| `<Button>`         | /components/ui/       | `variant: primary\|secondary\|ghost`, `size`, `loading` |
| `<SectionHeading>` | /components/ui/       | `title`, `subtitle?`, `eyebrow?`, `align?`               |
| `<TrustBadge>`     | /components/ui/       | `label`, `issuer`, `icon`, `downloadUrl?`                |
| `<MetricCard>`     | /components/ui/       | `value`, `label`, `prefix?`, `suffix?`                   |
| `<CTAGroup>`       | /components/ui/       | `primary`, `secondary?`, `layout?`                       |
| `<LeadForm>`       | /components/forms/    | `variant: gated\|sample\|consultation`                   |
| `<Accordion>`      | /components/ui/       | `items: { q: string; a: string }[]`                      |
| `<AnimatedCounter>`| /components/ui/       | `to`, `duration?`, `prefix?`, `suffix?`                  |
| `<GatedDownload>`  | /components/ui/       | `assetName`, `assetType`, `ctaLabel`                     |

Export all from `/components/index.ts`.

### State rules
- Default: Next.js Server Components
- Client Components only when hooks or browser events are required
- Zustand only for genuinely shared client state
- All forms: `react-hook-form` + `zod` — no exceptions

---

## 🔐 API BOUNDARIES & SECURITY

**Frontend is allowed to:**
- Render UI, run animations, handle client-side validation
- Fire analytics events (GA4 / PostHog)
- Submit to `/app/api/` route handlers only

**Frontend is NEVER allowed to:**
- Call third-party APIs directly (HubSpot, Zoho, Salesforce, etc.)
- Expose API keys, tokens, or secrets
- Contain business logic or lead scoring

**All `/app/api/` routes must handle:**
- CRM webhook forwarding
- Secure gated-asset URL generation
- Email automation triggers

### Anti-Spam — required on EVERY form

Every form submission payload must include:

```typescript
{
  // Visible fields
  firstName:       string
  lastName:        string
  businessEmail:   string   // validated — see email rules below
  company:         string
  country:         string
  productInterest: string
  message?:        string

  // Hidden fields (auto-populated by JS, never shown to user)
  honeypot:              string   // must be empty string — reject if not
  utmSource:             string
  utmMedium:             string
  utmCampaign:           string
  utmContent:            string
  referrerUrl:           string
  leadTemperature:       'cold' | 'warm' | 'hot'
  submittedAt:           string   // ISO timestamp
  timeOnPageSeconds:     number   // reject if < 8
}
```

**Business email validation — reject these domains:**
`gmail.com` · `yahoo.com` · `hotmail.com` · `outlook.com` · `qq.com` · `163.com` · `126.com` · `sina.com`

---

## 🌐 I18N RULES

- Library: `next-intl` exclusively
- Default locale: `en`
- **Zero hardcoded English strings in JSX** — every user-facing string uses `useTranslations()`
- Key naming: `pageName.sectionName.elementKey`
- All date/number formatting via `next-intl` formatters, never manual JS

---

## ⚡ PERFORMANCE BUDGET

| Metric               | Target   | Hard limit |
|----------------------|----------|------------|
| Lighthouse Score     | ≥ 92     | ≥ 88       |
| LCP                  | < 2.0 s  | < 2.5 s    |
| CLS                  | < 0.05   | < 0.10     |
| INP                  | < 100 ms | < 200 ms   |
| Initial JS bundle    | < 150 KB | < 200 KB   |

**Asset rules:**
- All images: WebP (AVIF preferred for hero images), max 200 KB each
- Background video loops: max 4 Mbps bitrate · `preload="none"` · `muted` · `loop` · `playsinline`
- Every `<img>` must be `next/image` — raw `<img>` tags are forbidden
- All below-fold images: `loading="lazy"` + blurDataURL placeholder

---

## 🏢 REAL COMPANY DATA — USE THIS, NO PLACEHOLDERS

```
Legal name (CN):    河南安进生物技术股份有限公司
Legal name (EN):    Henan Anjin Biotechnology Co., Ltd.
Export brand:       Anjin Global
Founded:            2008  (16+ years in operation)
Headquarters:       Zhengzhou, Henan Province, China
                    营销中心：郑州市金水区经三路鑫苑金融广场

Production bases (3 GMP sites):
  Base 1 — Xinxiang, Henan   (河南安进生物技术股份有限公司)
  Base 2 — Xingyang, Henan   (河南中牧威锋生物工程有限公司)
  Base 3 — Shangcai, Henan   (河南安进生物工程有限公司)
Total facility area:  60,000 sqm  (6万平方米)
Employees:            ~300

Production lines (30+):
  Large/small volume injections · Powder injections · Oral solutions
  Powders · Pre-mixes · Tablets · Granules · Disinfectants
  Insecticides · TCM extracts · Solid/liquid feed additives
  Water quality improvers · Environmental treatment agents
  Pet supplement soft chews · Pet supplement powders

Certifications held:
  - FDA Food Facility Registration (FFR)
      Registration No.: 19620201066
      Valid through:    2026-12-31
      Categories:       Pet Food · Vitamins/Vitamin Products
  - EU CE + GPSR Declaration of Conformity (ICR body)
      Regulation:  GPSR (2023/988/EU) + EN 12546-1:2000
      Models:      MC001 · MC002 · AJ001 (and others)
      Valid through: 2031-01
  - Veterinary Drug GMP (农业部兽药GMP认证)  — passed 2008, 2011, 2016, 2023
  - Feed Additive Production License (饲料添加剂生产许可证)
  - Export Registration (出口备案)
  - National High-Tech Enterprise (高新技术企业)
  - Henan Province "Specialized, Refined, Distinctive" SME (专精特新中小企业)
  - Henan Province Smart Workshop (智能车间认证)
  - Henan Province Enterprise Technology Centre
  - Postdoctoral Innovation Practice Base (博士后创新实践基地)

Industry honours:
  - 河南省著名商标
  - 2023年度河南省畜牧业最佳科技创新奖
  - 2024年度河南省畜牧业最佳创新品牌企业奖
  - 2021年度河南省畜牧业领先品牌
  - 2021中国水产投入品产业年度十佳品牌
  - 河南省畜牧工程技术协会 副会长单位
  - 河南省养羊行业协会 副会长单位
  - 河南省肉牛产业协会 副会长单位
  - 河南省动物保健品协会 常务理事单位

University partnerships:
  河南农业大学 · 河南牧业经济学院 · 河南中医药大学 · 河南师范大学

Research centres:
  河南省动物寄生虫病防控药物工程技术研究中心
  河南省中药发酵生物工程技术研究中心

Key product lines (for website):
  Priority 1 — Hip & Joint Soft Chews
    Core ingredients: Glucosamine · Chondroitin · MSM · Green Lipped Mussel
    Format: soft chews, 90–120 count / bottle
    Market size: $2.1 billion (largest category, 28% share)

  Priority 2 — Probiotic Soft Chews / Powder
    Core strains: Lactobacillus · Bifidobacterium · Prebiotics · Digestive enzymes
    Format: 60–90 soft chews or 30-sachet powder
    Market CAGR: 11.4% — fastest growing category

  Priority 3 — Functional Mushroom Soft Chews
    Core ingredients: Turkey Tail · Lion's Mane · Reishi · Cordyceps
    Format: soft chews, 90–120 count / bottle
    Competitive edge: Chinese mushroom ingredients, globally unmatched cost/quality

  Additional lines: Livestock medicine · Aquatic supplements
                    Feed additives · Water quality products

OEM/ODM process: Consultation → Formulation → Sampling → Production → Delivery
Sample lead time: Stock samples 3–5 days · Custom samples 2–4 weeks
Production lead time: 35–45 days from deposit received
MOQ:              500–2,000 bottles (typical; confirm per product)
Payment terms:    30% T/T deposit · 70% against Bill of Lading copy
Price tiers:      5,000 / 10,000 / 50,000 units
Incoterms:        FOB Shanghai · CIF Los Angeles · DDP New York
Quote validity:   30 days

Standard compliance claim:
  "Manufactured in an FDA-Registered Facility under cGMP standards."

Contact (fill before launch):
  Business email:   [REPLACE — enterprise domain only, NOT qq.com / 163.com]
  WhatsApp:         [REPLACE — international business number]
  Address:          Zhengzhou, Henan Province, China
  Response SLA:     Reply within 24 hours
```

---

## 📄 PAGE STRUCTURE — BUILD EXACTLY AS SPECIFIED

### `/` — Home

| # | Block | Requirements |
|---|-------|--------------|
| 1 | **HeroSection** | Headline formula: `[Outcome] for [Audience] — backed by [Proof]`. Primary CTA: `<GatedDownload>` (catalog). Secondary CTA: `Book a Consultation`. Background: full-width factory/product image. |
| 2 | **TrustBar** | Logo strip: FDA Registered · GMP Certified · CE Certified · 16 Years · 60,000 sqm |
| 3 | **MetricGrid** | 4 × `<MetricCard>`: `16+` Years · `500+` Formulations · `60,000` sqm · `30+` Production Lines |
| 4 | **BuyerJourneySection** | 5-step strip: Credibility Validation → Compliance Verification → Capacity Confirmation → Supply Stability → Lead Conversion |
| 5 | **ProductHighlights** | 3 cards: Hip & Joint · Probiotics · Functional Mushroom. Each with image, key ingredients, format, CTA. |
| 6 | **SocialProof** | Certification badge grid + industry association logos |
| 7 | **CTABanner** | `Request Free Samples` — amber accent background |

### `/products` — Products

- Category filter tabs: Joint · Probiotics · Mushroom · Livestock · Aquatic
- Product grid cards: image · name · key ingredients · format · `<GatedDownload>` CTA
- Each product detail page: ingredient table · spec sheet · COA download · formulation overview
- Every product page includes the FDA disclaimer (see Compliance section)

### `/oem-odm` — OEM / ODM Services

- 5-step process timeline: Consultation → Formulation → Sampling → Production → Delivery
- Capability table: MOQ · lead time · customisable parameters · available formats
- Inline `<LeadForm variant="sample">`
- Sample strategy: stock sample (3–5 days) vs custom sample (2–4 weeks)

### `/certifications` — Certifications

- `<TrustBadge>` grid for: FDA FFR · GMP · CE · Export Filing · High-Tech Enterprise
- Downloadable files: FDA FFR certificate · GMP certificate · CE declaration · COA sample
- Compliance statement block

### `/about` — About Us

- Company mission and values
- Timeline: 2008 founding → 2011 GMP → 2016 expansion → 2018–2019 new bases → 2023 new-version GMP
- Factory showcase: 3 production bases · 60,000 sqm · 300 employees · 30+ production lines
- University partnerships: 4 universities listed
- Research centre highlights
- Awards and honours grid

### `/contact` — Contact

- `<LeadForm variant="consultation">` with full UTM capture
- WhatsApp · business email · address
- "We respond within 24 hours" trust signal
- Map embed (Zhengzhou, Henan)

---

## 💊 FDA COMPLIANCE — MANDATORY LANGUAGE RULES

### Forbidden — never generate these words or phrases:
`cure` · `treat` · `prevent disease` · `veterinary medicine` · `FDA approved` ·
`clinically proven` · `guaranteed results` · `fights cancer` · `eliminates` ·
`kills bacteria` · `medical-grade`

### Approved — use these instead:
`supports` · `helps maintain` · `promotes` · `designed to complement` ·
`wellness` · `nutritional support` · `functional ingredients` · `formulated with` ·
`may help support`

### Required disclaimer — include on EVERY product page and product card:
> "These statements have not been evaluated by the Food and Drug Administration.
> This product is not intended to diagnose, treat, cure, or prevent any disease.
> Manufactured in an FDA-Registered Facility under cGMP standards."

---

## 🎯 BUYER JOURNEY & CTA SYSTEM

Every page must reduce procurement anxiety in this sequence:
**Credibility → Compliance → Capacity → Supply Stability → Conversion**

### Traffic-temperature CTA logic

| Temperature | Trigger signals            | Primary CTA                    | Component                        |
|-------------|----------------------------|--------------------------------|----------------------------------|
| Cold        | First visit, unknown source | Download Product Catalog / COA | `<GatedDownload>`                |
| Warm        | Return visit, product pages | Request Free Samples           | `<LeadForm variant="sample">`    |
| Hot         | OEM/contact page visit      | Book Supply Chain Consultation | `<LeadForm variant="consultation">` |

### CRM webhook mapping
All form submissions must POST to `/api/leads` which forwards to HubSpot/Zoho/Salesforce.
Include all fields from the CRM payload spec above.
Include hidden fields: `utmSource`, `utmMedium`, `utmCampaign`, `utmContent`, `referrerUrl`, `leadTemperature`.

---

## ✅ PRE-COMPLETION QA CHECKLIST

Before marking any task complete, silently run through every item:

**Code quality**
- [ ] No `any` TypeScript types
- [ ] No untyped component props
- [ ] No raw `<img>` tags — only `next/image`
- [ ] No hardcoded hex colours — only CSS variables
- [ ] No hardcoded English strings in JSX — only `useTranslations()` keys

**Forms & security**
- [ ] All form fields have zod validation schema
- [ ] Business email validation rejects free domains
- [ ] Honeypot field present and validated server-side
- [ ] UTM parameters captured in hidden fields
- [ ] No API keys or secrets in any frontend file

**Design & accessibility**
- [ ] All spacing uses 8 px multiples
- [ ] Typography hierarchy consistent with design system
- [ ] Hover states present on all interactive elements
- [ ] Responsive at 375 px · 768 px · 1440 px
- [ ] Dark-mode CSS variables do not break layout

**Content compliance**
- [ ] No FDA forbidden language anywhere
- [ ] FDA disclaimer present on all product pages
- [ ] Company metrics use real data (not placeholder values)
- [ ] No QQ/163/126 email addresses in any user-facing content

**Architecture**
- [ ] All new components exported from `/components/index.ts`
- [ ] All new i18n strings added to `/messages/en.json`
- [ ] No duplicate component created

---

## 🚫 GLOBAL PROHIBITIONS — NEVER DO ANY OF THESE

| Prohibited action                              | Reason                                      |
|------------------------------------------------|---------------------------------------------|
| Use raw `<img>` tags                           | Must use `next/image` for performance       |
| Use `any` TypeScript type                      | Type safety is non-negotiable               |
| Hardcode colours (`#0A5C8A` in a component)    | Must use CSS variables                      |
| Create a second version of an existing component | Strict component reuse                    |
| Call third-party APIs from client components   | Security boundary                           |
| Expose API keys or secrets in frontend code    | Security — absolute rule                    |
| Use FDA forbidden language                     | Legal compliance                            |
| Use QQ / 163 / 126 / sina email addresses outward-facing | Professional credibility           |
| Position Anjin as "cheap", "low-cost", or "budget" | Core brand strategy                    |
| Write Lorem Ipsum or placeholder content       | Use real company data from this file        |
| Use Pages Router                               | App Router only                             |
| Use npm or yarn                                | pnpm only                                   |
