# PHASE 21 — Testing, Security & Deployment

**Goal:** Comprehensive integration tests, security audit, Vercel deployment configuration, and CI/CD pipeline. This is the final phase that validates the entire full-stack application end-to-end.  
**Depends On:** Phase 16, Phase 17, Phase 18, Phase 19, Phase 20  
**Unblocks:** Production launch

---

- [ ] **Set up Vitest configuration for API route testing**.
  - **Details:** Create `apps/landing/vitest.config.ts` extending root config. Add `@testing-library/jest-dom` and `supertest` for HTTP assertions. Create `apps/landing/src/__tests__/setup.ts` with test environment mocks: mock Supabase client, mock Stripe SDK, mock LLM providers, mock KV store.
  - **Verification:** `pnpm --filter landing test` runs without errors.

- [ ] **Write auth flow integration tests**.
  - **Details:** Cover these scenarios in `apps/landing/src/__tests__/auth.test.ts`:
    - `POST /api/auth/signup` with valid email/password → 200 + user + session returned
    - `POST /api/auth/signup` with duplicate email → 400
    - `POST /api/auth/signup` with invalid email → 400
    - `POST /api/auth/signup` with short password (< 8 chars) → 400
    - `POST /api/auth/login` with valid credentials → 200 + session
    - `POST /api/auth/login` with wrong password → 401
    - `POST /api/auth/login` with nonexistent email → 401
    - `POST /api/auth/logout` with valid JWT → 200
    - `POST /api/auth/logout` without JWT → 401
    - `GET /api/auth/me` with valid JWT → 200 + user profile + credit balance
    - `GET /api/auth/me` with expired/invalid JWT → 401
    - `GET /api/auth/me` without token → 401
  - **Verification:** All 12 test scenarios pass.

- [ ] **Write credits API integration tests**.
  - **Details:** Cover in `apps/landing/src/__tests__/credits.test.ts`:
    - `GET /api/credits/balance` → returns correct balance (5 for new user)
    - `GET /api/credits/transactions` → returns transaction history with 'granted' entry
    - `GET /api/credits/transactions?page=1&limit=5` → pagination works
    - `POST /api/credits/create-checkout` with valid priceId → returns Stripe URL
    - `POST /api/credits/create-checkout` with invalid priceId → 400
    - Unauthenticated requests to all credit endpoints → 401
    - Webhook: simulate `checkout.session.completed` with valid signature → 200, balance increases
    - Webhook: simulate with invalid signature → 400
    - Webhook: simulate with missing metadata → 400
  - **Verification:** All 9 test scenarios pass.

- [ ] **Write extraction API integration tests**.
  - **Details:** Cover in `apps/landing/src/__tests__/extractions.test.ts`:
    - `POST /api/extractions` with sufficient credits → 200 + generated code (mock LLM)
    - `POST /api/extractions` with 0 credits → 402
    - `POST /api/extractions` with invalid blueprint → 400
    - `GET /api/extractions` → returns list with created extraction
    - `GET /api/extractions?page=1` → pagination works
    - `GET /api/extractions/[id]` → returns single extraction
    - `GET /api/extractions/[id]` with nonexistent id → 404
    - `DELETE /api/extractions/[id]` → 200 + item removed from list
    - `DELETE /api/extractions/[id]` with another user's id → 404
    - Rate limiting: 11th request in 60s → 429
    - Unauthenticated requests → 401
    - LLM timeout → 500 with code 'llm_error'
  - **Verification:** All 12 test scenarios pass.

- [ ] **Write waitlist API integration tests**.
  - **Details:** Cover in `apps/landing/src/__tests__/waitlist.test.ts`:
    - `POST /api/waitlist` with valid email → 201
    - `POST /api/waitlist` with duplicate email → 409
    - `POST /api/waitlist` with invalid email → 400
    - Rate limiting: 3rd request in 60s → 429
  - **Verification:** All 4 test scenarios pass.

- [ ] **Security audit — RLS policies**.
  - **Details:** Write security tests in `apps/landing/src/__tests__/security.test.ts`:
    - As user A, try to read user B's data from `credits` table → denied (RLS)
    - As user A, try to read user B's `credit_transactions` → denied
    - As user A, try to read user B's `extractions` → denied
    - As user A, try to delete user B's extraction → denied
    - Anonymous user tries to insert into `waitlist` → allowed
    - Anonymous user tries to select from `waitlist` → denied
    - Test Supabase JWT expiry handling
  - **Verification:** All RLS policies enforced correctly. No data leakage between users.

- [ ] **Security audit — CORS and headers**.
  - **Details:** Verify CORS configuration:
    - Create `apps/landing/src/lib/cors.ts` with allowed origins: `chrome-extension://*` (any extension ID), `http://localhost:3000`, production URL
    - Apply CORS headers via Next.js middleware or per-route
    - Verify Stripe webhook endpoint does NOT require CORS (it's server-to-server)
    - Verify security headers: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security: max-age=31536000`
  - **Verification:** Extension can call API from any chrome-extension:// origin. Browser requests to API have correct security headers.

- [ ] **Configure Vercel deployment**.
  - **Details:**
    - Create `apps/landing/vercel.json`:
      ```json
      {
        "buildCommand": "pnpm --filter landing build",
        "outputDirectory": ".next",
        "framework": "nextjs",
        "installCommand": "pnpm install"
      }
      ```
    - In Vercel dashboard: set all environment variables
    - Connect Vercel KV store and get credentials
    - Set root directory to `apps/landing` or configure monorepo settings
    - Configure Vercel Cron Jobs if needed (no cron needed for v1)
    - Deploy preview and verify API routes work
  - **Verification:** Vercel deployment succeeds. API routes respond at `https://[domain].vercel.app/api/*`. Environment variables are set.

- [ ] **Configure Stripe webhook endpoint**.
  - **Details:** In Stripe Dashboard → Webhooks → Add endpoint:
    - URL: `https://[production-domain]/api/webhooks/stripe`
    - Events: `checkout.session.completed`
    - Webhook secret: copy to `STRIPE_WEBHOOK_SECRET` env var
    - In Stripe CLI for dev: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
  - **Verification:** Stripe Dashboard shows webhook endpoint as "Enabled". Test webhook via Stripe CLI succeeds.

- [ ] **Set up GitHub Actions CI/CD**.
  - **Details:** Create `.github/workflows/ci.yml`:
    ```yaml
    name: CI
    on: [push, pull_request]
    jobs:
      lint:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: pnpm/action-setup@v2
          - uses: actions/setup-node@v4
          - run: pnpm install
          - run: pnpm lint
      test:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: pnpm/action-setup@v2
          - uses: actions/setup-node@v4
          - run: pnpm install
          - run: pnpm --filter landing test
      build:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: pnpm/action-setup@v2
          - uses: actions/setup-node@v4
          - run: pnpm install
          - run: pnpm --filter landing build
    ```
  - **Verification:** CI workflow runs on push. All 3 jobs (lint, test, build) pass.

- [ ] **Add database migration step to deploy pipeline**.
  - **Details:** For production schema changes, create a migration workflow. For v1 simplicity:
    - Document that schema changes are applied manually via Supabase SQL Editor
    - Create `apps/landing/supabase/migrations/` directory with initial migration SQL file
    - Optionally configure Supabase CLI for future automated migrations
  - **Verification:** Initial migration SQL is documented and version-controlled.

- [ ] **Update `progress-history.md`**.
  - **Details:** Add entries for Phases 16–21 with completion dates and notes.
  - **Verification:** File is updated and committed.

- [ ] **Final end-to-end full-stack validation**.
  - **Details:** Run through the complete user journey on production-like environment:
    1. Install extension from `chrome://extensions` (dev mode)
    2. Open landing page → sign up for waitlist → confirm in Supabase
    3. Open side panel → sign up with email/password → receives 5 free credits
    4. Navigate to a website → activate inspector → select element
    5. Click "Extract" → progress indicator → LLM generates code
    6. Code renders in Sandpack → live edit works → copy/download work
    7. History tab shows the extraction → re-open works
    8. Credits tab shows balance = 4 → click "Purchase" → Stripe Checkout opens
    9. Complete payment → webhook fires → balance updates to 54
    10. Transaction history shows all entries
    11. Log out → log back in → session restored, history intact
  - **Verification:** All 11 steps complete successfully. Full-stack VantageUI is operational. 🚀
