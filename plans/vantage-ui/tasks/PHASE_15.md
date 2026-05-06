# PHASE 15 — Landing Page (Next.js)

**Goal:** Build the complete VantageUI marketing landing page — hero, features, how-it-works, pricing, social proof, and a waitlist form.  
**Depends On:** Phase 3 (design system)  
**Unblocks:** Nothing (final deliverable)

---

- [ ] **Scaffold `apps/landing` as a Next.js app**: Initialize the marketing site.
  - **Details:** Inside `apps/landing`: `pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias '@/*' --no-git`. Extend from the shared Tailwind config in `packages/ui`. Load fonts via `next/font/google`: `Outfit` (weights 600, 700) and `DM Sans` (weights 400, 500) — apply to `<html>` in `layout.tsx`. Import `globals.css` from `@vantage-ui/ui` or copy the base CSS into `src/app/globals.css`.
  - **Verification:** `pnpm --filter landing dev` starts the Next.js dev server at `localhost:3000` without errors. Fonts render as Outfit/DM Sans (not system fonts). Tailwind classes resolve to VantageUI tokens.

- [ ] **Build page metadata and SEO foundation**: `layout.tsx` and `page.tsx` metadata.
  - **Details:** In `src/app/layout.tsx`, export a `metadata` object: `{ title: 'VantageUI — Extract Any UI Component in Seconds', description: 'VantageUI is a Chrome extension that extracts any live website component and synthesizes it into production-ready React/Tailwind/Shadcn code.', openGraph: { ... } }`. Add canonical URL, `og:image` placeholder (1200×630px, generated). Add `<link rel="icon">` favicon.
  - **Verification:** `<title>` and `<meta name="description">` are correct in the rendered HTML. Lighthouse SEO score ≥ 95 on the initial scaffold.

- [ ] **Build `Navbar` component**: Fixed top navigation bar.
  - **Details:** `position: sticky; top: 0; z-index: 50`. White bg (`#FFFFFF`), `border-bottom: 1px solid rgba(10,10,10,0.08)`, `backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.85)`. Left: VantageUI logo SVG + wordmark (Outfit SemiBold 16px, Deep Black). Right: ghost nav links ("Features", "How It Works", "Pricing") in DM Sans 15px + "Get Started Free" primary Nero Blue button (8px radius, Outfit Medium 15px, `box-shadow: 0px 2px 4px rgba(5,59,132,0.2)`). Smooth scroll to sections on link click. Fully responsive: hamburger menu on mobile.
  - **Verification:** Navbar sticks to top on scroll. Background blur effect visible. All nav links scroll to the correct section. "Get Started Free" scrolls to the waitlist form. Mobile hamburger opens a slide-down menu.

- [ ] **Build `HeroSection` component**: Primary landing section with headline and waitlist CTA.
  - **Details:** Full-width, min-height `100vh`. Background: Soft White `#F5F5F6`. Centered content, `padding: 120px 24px 80px`. Layout:
    - Badge chip: "Now in Beta" — Nero Blue bg, White text, DM Sans 12px Medium, `border-radius: 20px`, `padding: 4px 12px`. Animate in with `animate-fade-up` (delay 0ms).
    - Headline: "Extract Any UI. Ship in Seconds." — Outfit SemiBold 64px, Deep Black, line-height 1.10. Animate in (delay 100ms).
    - Subheadline: "VantageUI inspects any live website component and synthesizes it into production-ready React/Tailwind/Shadcn code — in 8 seconds." — DM Sans 20px, `rgba(10,10,10,0.6)`, max-width 600px, line-height 1.60. Animate in (delay 200ms).
    - Waitlist form: email input (full DESIGN.md input styling: White bg, `rgba(10,10,10,0.15)` border, 8px radius, 12px 16px padding, Nero Blue focus) + "Join the Waitlist" Nero Blue button. Inline, side-by-side on desktop, stacked on mobile. Animate in (delay 300ms).
    - Social proof micro-text below form: "🔒 No credit card required · 5 free credits on sign-up · Used by 1,200+ engineers" in DM Sans 13px `rgba(10,10,10,0.5)`.
    - Demo video placeholder: A 16:9 aspect-ratio container below the form (`max-width: 900px`, `border-radius: 12px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.1)`, `border: 1px solid rgba(10,10,10,0.08)`) with a Soft White `#F5F5F6` bg, centered play button icon (Nero Blue), and "Demo coming soon" caption. Use `<video>` element with a poster image (generate one via `generate_image` tool in a later task).
  - **Verification:** Hero renders at 100vh. Staggered animations play on page load. Headline, subheadline, form, and video placeholder all visible and styled correctly.

- [ ] **Implement waitlist form logic**: Zod validation and mocked submission.
  - **Details:** Create `src/schemas/waitlist.schema.ts`: `z.object({ email: z.string().email('Please enter a valid email.') })`. On submit: validate with Zod. If invalid: show inline error below the input (`#DC2626`, DM Sans 13px). If valid: show a 1500ms loading spinner on the button, then transition the form to a success state: a green checkmark + "You're on the list! We'll email you when we launch." in DM Sans 15px `#16A34A`. The success state persists (no re-submit).
  - **Verification:** Invalid email shows error. Valid email shows success state after 1.5s. Success state cannot be re-submitted.

- [ ] **Build `HowItWorksSection` component**: 3-step visual flow.
  - **Details:** Soft White `#F5F5F6` section, `padding: 96px 24px`. Section heading: "How VantageUI Works" (Outfit SemiBold 52px, centered, Deep Black). 3-column grid (stacks vertically on mobile), `gap: 48px`. Each step: numbered circle (Nero Blue bg, White text, Outfit Bold 20px, 48px diameter) + step title (Outfit SemiBold 24px, Deep Black) + description (DM Sans 16px `rgba(10,10,10,0.6)`, max-width 280px). Steps: 1 "Inspect" / 2 "Extract" / 3 "Ship". Connecting dashed line between circles on desktop (hidden on mobile). Animate each column with `animate-fade-up` staggered (0ms, 150ms, 300ms) using Intersection Observer for scroll-triggered entry.
  - **Verification:** 3 columns render on desktop, stack vertically on mobile. Scroll-triggered animation plays when the section enters the viewport.

- [ ] **Build `FeaturesSection` component**: 6-card feature grid.
  - **Details:** White `#FFFFFF` section, `padding: 96px 24px`. Heading: "Everything You Need to Ship Faster" (Outfit SemiBold 52px, centered). 3×2 grid of feature cards. Each card: White bg (`#FFFFFF`), `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 12px`, `padding: 28px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.05)`. Card hover: `transform: translateY(-3px)`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.1)`, 200ms ease. Contents: icon (32px, Nero Blue) + feature title (Outfit SemiBold 20px) + description (DM Sans 15px `rgba(10,10,10,0.65)`, line-height 1.55). 6 features: Ghost Inspector · Sandpack Sandbox · Prompt Generator · Design System Scanner · Framer Motion Output · Extraction History. Scroll-triggered `animate-fade-up`.
  - **Verification:** 6 cards render in 3×2 grid. Hover lift effect works. Cards have correct shadow and border. Grid collapses to 1 column on mobile. Scroll animation triggers.

- [ ] **Build `PricingSection` component**: Credit packs and free tier.
  - **Details:** Soft White section, `padding: 96px 24px`. Heading: "Simple, Pay-As-You-Go Pricing" (Outfit SemiBold 52px, centered). Subheading: "Start free, no card required. Purchase credits when you need them." (DM Sans 20px, `rgba(10,10,10,0.6)`, centered). Below: 3 credit pack cards matching the extension's `CreditPackSelector` (50 / 100 / 200 credits) — same card styling, identical pricing. "100 credits" card has "Most Popular" Nero Blue badge. Below cards: "Free to start — 5 credits included on sign-up" in DM Sans 14px `rgba(10,10,10,0.6)`, centered. "Get Started Free" Nero Blue button, centered, scrolls to waitlist form.
  - **Verification:** 3 pricing cards render. "Popular" badge visible. "Get Started Free" button scrolls to the hero form.

- [ ] **Build `SocialProofSection` component**: Waitlist count and tech stack logos.
  - **Details:** White section, `padding: 64px 24px`. Two rows: (1) Centered waitlist count: "Join 1,200+ engineers already on the waitlist" — Outfit SemiBold 32px, Deep Black. (2) Horizontal row of framework/tech logos: React, Tailwind CSS, Shadcn/ui, Framer Motion — rendered as SVG icons, grayscale `rgba(10,10,10,0.35)` tint, hover → full color, 48px height, `gap: 40px`. Logos are centered and wrap on mobile.
  - **Verification:** Waitlist count renders. Logos row renders with grayscale tint. Hover restores color on each logo.

- [ ] **Build `Footer` component**: Site-wide footer.
  - **Details:** Soft White `#F5F5F6` bg, `border-top: 1px solid rgba(10,10,10,0.08)`, `padding: 40px 24px`. Two-column layout: Left: VantageUI wordmark + tagline "Extract any UI. Ship in seconds." (DM Sans 14px `rgba(10,10,10,0.6)`). Right: two placeholder links — "Privacy Policy" and "Terms of Service" — ghost links (DM Sans 14px, `rgba(10,10,10,0.5)`, hover `#053B84`). Below on a full-width row: "© 2026 VantageUI. All rights reserved." centered, DM Sans 13px `rgba(10,10,10,0.4)`.
  - **Verification:** Footer renders below all sections. Links are non-functional placeholders. Copyright text visible.

- [ ] **Validate full page responsiveness and Lighthouse score**: Final quality check.
  - **Details:** Test at 320px (mobile), 768px (tablet), and 1280px (desktop) breakpoints. All sections must reflow correctly with no horizontal overflow. Run Chrome Lighthouse audit on the dev build. Target: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
  - **Verification:** No horizontal scroll at any breakpoint. All Lighthouse scores meet targets.
