# PHASE 20 — Waitlist API & Landing Page Finalization

**Goal:** Build the real waitlist API endpoint, integrate it with the landing page, and fix remaining landing page audit issues.  
**Depends On:** Phase 16, Phase 15  
**Unblocks:** Phase 21

---

- [ ] **Build `POST /api/waitlist`**.
  - **Details:** Public route (no auth required). Validate body: `z.object({ email: z.string().email() })`. Steps:
    1. Check rate limit: `checkRateLimit(waitlistLimit, ip)` — max 2 requests/min per IP
    2. Check for duplicate: `SELECT id FROM public.waitlist WHERE email = email` — if exists, return 409 `{ error: 'Already on the waitlist', code: 'duplicate' }`
    3. Insert: `INSERT INTO public.waitlist (email) VALUES (email) RETURNING id`
    4. Return 201 `{ success: true, message: 'You\'re on the list!' }`
  - **Verification:** Email submission inserts into Supabase. Duplicate email returns 409. Rate-limited request returns 429. Invalid email returns 400.

- [ ] **Update landing page waitlist form to use real API**.
  - **Details:** Modify `apps/landing/src/components/waitlist-form.tsx`:
    - Replace the mock `setTimeout` submission with a real `fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email }) })` call
    - Handle success (201): show green success state "You're on the list!"
    - Handle 409 (duplicate): show "You're already on the list!" — also green, still a positive outcome
    - Handle 429 (rate limited): show "Too many requests. Please try again later." in orange
    - Handle validation errors (400): show field-level error (already handled by Zod client-side but server validates too)
    - Handle network errors: show "Something went wrong. Please try again." — generic fallback
    - Loading state: spinner on button during request
  - **Verification:** Form submits email to real Supabase. Duplicate email shows friendly message. Rate limiting shows appropriate message. Network error shows fallback.

- [ ] **Update landing page social proof to show real waitlist count**.
  - **Details:** Create a server component or client-side fetch to get the waitlist count:
    - Option A (SSR): Create a simple API endpoint `GET /api/waitlist/count` that returns `{ count: number }` — only the count, not the emails
    - Option B (build-time): For SSG landing page, hardcode a count that gets updated periodically
    - For v1, Option A is preferred: fetch on client mount, show live count
    - Update the social proof section text: "Join {count}+ engineers already on the waitlist"
  - **Verification:** Waitlist count displays correctly. Increases after each new signup.

- [ ] **Add `theme-color` meta tag and JSON-LD structured data**.
  - **Details:** Fix audit issue Q7:
    - Add `<meta name="theme-color" content="#F5F5F6">` to `layout.tsx`
    - Add JSON-LD structured data for `SoftwareApplication` type:
      ```json
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "VantageUI",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Chrome",
        "description": "Extract any live website UI component and synthesize it into production-ready React/Tailwind/Shadcn code.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
      ```
  - **Verification:** `<meta name="theme-color">` present in `<head>`. JSON-LD validates on Google Structured Data Testing Tool.

- [ ] **Fix dual styling system issue (Q8)**.
  - **Details:** Fix audit issue Q8: audit `navbar.tsx` and all landing page components for mixed `style={{}}` inline styles alongside Tailwind classes. Convert all inline styles to Tailwind equivalents. Where Tailwind cannot express the value (e.g., dynamic values), extract to a constant. This affects primarily `navbar.tsx` (the backdrop blur glass effect).
  - **Verification:** No remaining `style={}` props in landing page components. All styling uses Tailwind classes exclusively.

- [ ] **Final landing page polish**.
  - **Details:** Run full visual QA on landing page:
    - Verify all sections render at 320px, 768px, 1280px
    - Verify no horizontal overflow
    - Verify waitlist form works end-to-end (client validation → API → success state)
    - Verify navigation links scroll to correct sections
    - Verify pricing cards match extension's credit pack selector
    - Lighthouse audit: target Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95
  - **Verification:** Lighthouse scores meet targets. Waitlist flow end-to-end verified.
