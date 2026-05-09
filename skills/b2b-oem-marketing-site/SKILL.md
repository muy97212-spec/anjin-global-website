---
name: b2b-oem-marketing-site
description: Build B2B OEM/ODM contract-manufacturer marketing sites where the buyer is a procurement or compliance officer, the brand is regulated (FDA / GMP / CE / GPSR), and the project ships with a strict design/positioning mandate (typically CLAUDE.md). Use when the goal is to reduce procurement risk through documentation, certifications, real factory data and gated lead capture — not lifestyle marketing. Distilled from the Anjin Global (Henan Anjin Biotechnology) build.
license: MIT
---

This skill captures the operating discipline for building a regulated B2B contract-manufacturer marketing site. The audience is not a consumer — it is a procurement officer, a compliance auditor, or a brand owner sourcing private-label production. They need documentation, certification numbers, lead times, MOQ tiers, payment terms and Incoterms — not slogans.

## Mandate-first thinking

Always read the project mandate before writing code. On these projects it is typically a `CLAUDE.md` at the repo root containing: brand positioning, tech stack, design system tokens, component governance, FDA / regulatory language rules, real company data, page structure spec, performance budgets, prohibitions.

Treat that file as a hard contract. When other instructions or general design heuristics conflict with it, the project mandate wins. **Flag the conflict transparently rather than silently overriding either side** — surfacing the tension lets the user decide. Two real examples from this build:

- A general design skill said "never use Inter, pick a distinctive typeface." CLAUDE.md mandated Inter. CLAUDE.md won; the conflict was reported.
- The product spec listed five categories (Joint · Probiotics · Mushroom · Livestock · Aquatic) but the actual product line in the materials directory had a different shape. The user was told the categories would be restructured to match the real line, with reasoning, before the change was made.

## Audience model: procurement officer, not consumer

Every page should reduce procurement risk in roughly this sequence: **Credibility → Compliance → Capacity → Supply Stability → Conversion**. Concrete moves:

- Lead with the FDA registration number, the GMP cycle history, the EU CE/GPSR notified body — not adjectives.
- Show real numbers (years operating, sqm, employee count, production line count, MOQ range, lead time in days).
- Capability tables beat marketing copy. A `<table>` with parameter / value rows for MOQ, lead time, sample windows, formats, customisable parameters, payment terms, Incoterms is doing the buyer's job for them.
- Never position the manufacturer as "cheap", "low-cost", "budget" or "commodity". The buyer is purchasing supply continuity and audit-readiness, not the lowest unit price. Use language like "long-term supply chain partner", "audit-ready documentation", "compliance before commerce".

## Tech stack (used end-to-end on this build)

```
Framework:   Next.js 14, App Router only
Language:    TypeScript strict, no `any`
Styling:     Tailwind CSS v3 + CSS custom properties for all design tokens
UI base:     shadcn/ui — customise, never recreate primitives
Animation:   Framer Motion, but ONLY for interactions (modal, accordion, counters)
Forms:       react-hook-form + zod, mandatory on every form
i18n:        next-intl, route-based (/en /de /es), `useTranslations()` everywhere
State:       Server Components by default; client only when hooks/events are needed
Package:     pnpm
Deploy:      Vercel (or any Node host); optimise for Edge where possible
```

Do not deviate without an explicit user decision.

## Component governance

Define a small, fixed set of governed primitive components (e.g. `Button`, `SectionHeading`, `TrustBadge`, `MetricCard`, `CTAGroup`, `Accordion`, `AnimatedCounter`, `GatedDownload`, `LeadForm`). **Never create a second version** of any of them. Every primitive must:

- Accept `className` for composition.
- Use CSS custom properties for all colours — never hardcode hex.
- Be fully typed; export its props interface.
- Live under `/components/ui/` (primitives), `/components/blocks/` (page sections), `/components/forms/`, `/components/layout/`.
- Be re-exported from a single `/components/index.ts` barrel.

Page-specific compositions go in `/components/blocks/`. Each marketing page composes existing primitives; new blocks are added only when the section is genuinely page-specific (e.g. a "Why brands choose us" 6-feature grid that only appears on the home page).

A subtle gotcha: `tsconfig.json` path aliases need an explicit entry for the barrel — otherwise `@/components` can resolve to `components.json` (the shadcn config) instead of `components/index.ts`. Add `"@/components": ["./components/index.ts"]` ahead of the `"@/*": ["./*"]` wildcard.

## Form architecture (anti-spam is mandatory)

Every form posts to a single `/app/api/leads` route handler. The frontend never calls third-party CRMs directly. Each submission payload includes:

```
firstName, lastName, businessEmail, company, country, productInterest, message?
honeypot                  — hidden, must be empty string; reject if not
utmSource/Medium/Campaign/Content   — captured from URL on mount
referrerUrl
leadTemperature           — 'cold' | 'warm' | 'hot' (per CTA variant)
submittedAt               — ISO timestamp
timeOnPageSeconds         — reject if < 8
```

**Reject free-mail providers in the zod schema**: `gmail.com`, `yahoo.com`, `hotmail.com`, `outlook.com`, `qq.com`, `163.com`, `126.com`, `sina.com`. Surface the rejection inline as form-level validation, not a silent server failure.

`<LeadForm>` should support three variants — `gated` (cold, behind a download), `sample` (warm, on OEM/product pages), `consultation` (hot, on contact). They share the schema; only the title, description, CTA label and lead temperature differ.

Lazy-load `<LeadForm>` from `<GatedDownload>` via `next/dynamic({ ssr: false })` so its react-hook-form + zod weight is not in the initial bundle of pages that only show a download CTA.

Extend `<GatedDownload>` with an optional `assetUrl` prop. When the form succeeds, synthesise an `<a target="_blank" download>` click to deliver the real PDF — no API change needed for callers without a real file.

## Compliance language

This is the rule most likely to cause legal trouble if violated. For animal/pet supplement OEM:

- **Never** generate: `cure`, `treat`, `prevent disease`, `veterinary medicine`, `FDA approved`, `clinically proven`, `guaranteed results`, `eliminates`, `kills bacteria`, `medical-grade`. (The forbidden phrase only appears in the required disclaimer, verbatim.)
- **Use**: `supports`, `helps maintain`, `promotes`, `designed to complement`, `wellness`, `nutritional support`, `functional ingredients`, `formulated with`, `may help support`.
- **Required FDA disclaimer**, verbatim, on every product page and product card (verify with a `grep -c "FDA-Registered Facility under cGMP"` against the rendered HTML before declaring done):
  > "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Manufactured in an FDA-Registered Facility under cGMP standards."
- "Veterinary Drug GMP" as a certification name is fine — it is a proper noun. The forbidden phrase is the marketing claim "veterinary medicine".

Carry the disclaimer through `useTranslations('common')` so it cannot drift; fix it once in `messages/en.json`.

## i18n discipline

Zero hardcoded English strings in JSX. Every visible string passes through `useTranslations()`. Key naming: `pageName.sectionName.elementKey`. Use `t.raw()` for typed array data (steps, badges, catalog items) and cast to a local interface — never `any`.

When the catalog is large (e.g. 22 products), keep a single source of truth: store the full catalog under one key (`products.catalog`) and let other pages/components reference it by slug rather than duplicating data into per-page namespaces. This is what powers `home.products.featuredSlugs` reading from `products.catalog`.

For URL-based filtering (e.g. `/products?category=joint`), keep the page a Server Component and read `searchParams` directly. Tabs become `<Link>` elements with `aria-current="page"` on the active one — no client state, no client JS for the filter.

## Real data discipline (no placeholder text)

If the user provides a "materials" or "资料" directory of real assets:

1. Inventory it before writing any UI. List every PDF, image and video by name, size and apparent purpose.
2. Copy real assets into `public/` with **URL-safe English slugs** mapped from the original filenames (the originals often have Chinese characters or spaces). Keep the mapping reversible if you need to refer back.
3. Real product photos go into `public/images/products/catalog/<slug>.png` and replace any SVG placeholder. Real certificate scans go into `public/images/certifications/`. Real PDFs go into `public/downloads/` and wire into `<GatedDownload assetUrl=...>`.
4. Translate Chinese product names with **honest** English equivalents — preserve the Chinese name as a `nameZh` field for authenticity (`<span lang="zh-CN">软骨康</span>`).
5. If the spec defines categories that do not match the real product line, restructure the categories to fit reality, not the spec. Tell the user before you do.
6. Never write Lorem Ipsum or invent registration numbers. If a piece of data is missing (typically: business email, WhatsApp number), use a credible enterprise placeholder (`partnerships@<brand>.com`), and **flag it explicitly in your end-of-turn summary** as something the user must replace before launch.

## Visual treatment

The default treatment for this kind of B2B site is restrained and document-grade: cream surfaces, deep moss or deep navy primary, minimal motion, type hierarchy carrying the weight. The Anjin build adopted a Seed Health–inspired "editorial science" pass: a Seed-inspired moss/cream palette ("from static to alive — from strict to scalable"), Darwin-Nomenclature category accents (one hue per product family — used as a left-of-card stripe + tag pill), and BPW-Lab–inspired structure (asymmetric hero with product imagery floated right, "Why brands choose us" 6-feature block, founder-voice line, bigger display type via a `--font-hero` token).

Stay disciplined about what stays untouched during a visual pass:
- Real company data (no inventions to fit a layout).
- The FDA disclaimer's exact text and placement on every product card.
- Performance budget (every below-fold image lazy-loaded; only the hero is `priority`; `<video preload="none" controls>` for click-to-play factory tours; never auto-play heavy media).
- Component reuse rules.
- i18n flow.

## Pre-completion QA checklist

Before reporting any page or pass as done, run through this silently. Do not skip.

```
Code quality
[ ] No `any` TypeScript types
[ ] No untyped component props
[ ] No raw <img> tags — only next/image
[ ] No hardcoded hex colours in components — only var(--color-*)
[ ] No hardcoded English strings in JSX — only useTranslations() keys

Forms & security
[ ] All form fields have zod validation
[ ] Free-mail domains rejected in schema
[ ] Honeypot present and validated server-side
[ ] UTM + referrer + timeOnPageSeconds captured
[ ] No API keys or secrets in any frontend file

Content compliance
[ ] No FDA forbidden language anywhere outside the verbatim disclaimer
[ ] FDA disclaimer rendered on every product page and product card
[ ] Real company data only (verify registration numbers and dates against CLAUDE.md)
[ ] No qq.com / 163.com / sina.com / personal-domain emails in user-facing content

Architecture
[ ] All new components exported from /components/index.ts
[ ] All new i18n strings added to /messages/en.json
[ ] No duplicate of an existing primitive
[ ] Build clean (no warnings)
[ ] Bundle size under hard limit (typically 200 kB First Load JS)
```

Verify by:
1. `pnpm build` — must compile clean.
2. `pnpm dev` + `curl /en/<route>` for each page — must return 200.
3. `grep` the rendered HTML for the key markers (FDA disclaimer count, real registration numbers, expected section headings).
4. `grep -nE` the source for forbidden phrases, hex literals, raw `<img>`, `: any`.

Report bundle deltas in the end-of-turn summary, even when within budget.

## Deploy flow

Standard: GitHub HTTPS via the `gh` CLI. Sequence:

1. Confirm `gh auth status`. If not logged in, ask the user to run `! gh auth login` in the chat (the `!` prefix surfaces the device code into the conversation). The web flow times out fast; tell them to open `https://github.com/login/device` **before** running the command.
2. Set the local-repo commit identity using the GitHub noreply email format: `<numeric-id>+<username>@users.noreply.github.com` (fetch the id via `gh api user --jq .id`). Scope to the repo, not `--global`. This keeps the user's personal email out of the public history.
3. `git init -b main` → `git add -A` → single initial commit with a HEREDOC body explaining what shipped.
4. `gh repo create <name> --public --source=. --remote=origin --push --description "..."`.
5. For subsequent pushes, `gh auth setup-git` configures the credential helper so plain `git push` works. **This modifies global git config** — do not run it silently; tell the user. CLAUDE.md's "never update git config" rule is about not changing config behind the user's back, not about avoiding necessary plumbing — but the explicit notice is non-negotiable.

Commit messages should explain the *why*, not just the *what*. Co-author tag goes on every commit:

```
Co-Authored-By: Claude <noreply@anthropic.com>
```

## Common conflicts and how to resolve them

| Conflict | Resolution |
|---|---|
| Mandate forbids hex literals; some component overrides need hex | Add a CSS variable to `globals.css` and reference it. Never inline. |
| Mandate forbids `any`; `t.raw()` returns `unknown` | Define a local interface and cast with `as Interface[]`. |
| Mandate forbids raw `<img>`; you have local SVG art | Use `next/image` with `dangerouslyAllowSVG: true` + a sandboxed CSP in `next.config.mjs`. |
| Performance budget says image ≤ 200 KB; the source PNG is 4 MB | First pass: ship as-is, let next/image runtime-optimise it for visitors. Note as repo-size debt; offer a `sharp`-backed conversion script as a follow-up. |
| Spec says category X but the real product line doesn't have X | Restructure the categories. Tell the user before you commit. |
| Two skill files (or a skill and CLAUDE.md) give contradictory guidance | The project mandate (CLAUDE.md) wins. Surface the conflict in your reply so the user sees the trade-off you're making. |
| Free-text fields on a form might collect data that lands in a public commit | Server-side only — the form posts to `/api/leads`, which is server-only. Never log or persist payloads in client code. |
| User asks to "deploy" before auth is set up | Stop. Confirm whether they want to install/auth `gh`, or push to a repo URL they create themselves. Both are valid; ask once. |

## What this skill does not cover

- Vercel deploy configuration beyond "connect the repo".
- CI/CD via GitHub Actions (separate concern; add only if asked).
- Translation of `de.json` / `es.json` (this is a content task, not a build task).
- WebP/AVIF conversion pipeline (worth doing once the catalog stabilises; needs `sharp`).
- Real CRM webhook forwarding inside `/api/leads` (the route handler is a stub by default — wiring HubSpot/Zoho/Salesforce is a separate piece).

If the user asks about any of these, treat them as follow-up workstreams, not part of the initial build.
