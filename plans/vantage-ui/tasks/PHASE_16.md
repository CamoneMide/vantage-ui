# PHASE 16 — Backend Foundation & Database Schema

**Goal:** Set up Supabase project, create complete database schema with RLS policies, install all backend dependencies, and prepare the `apps/landing` app for API routes.  
**Depends On:** Phase 15 (Landing Page)  
**Unblocks:** Phase 17, Phase 18, Phase 19, Phase 20

---

- [ ] **Create Supabase project and configure authentication**.
  - **Details:** Create a new Supabase project. Enable email/password auth in the Supabase dashboard (disable public signups — we handle this via API). Generate anon key and service role key. Configure Auth settings: session length 7 days, no OAuth providers. URL: `https://[project].supabase.co`.
  - **Verification:** Supabase project dashboard shows Auth enabled. Anon and service role keys are generated.

- [ ] **Create database schema — all tables**.
  - **Details:** Execute the following SQL in Supabase SQL Editor:
    - `public.users` — UUID id (PK, references auth.users), email TEXT UNIQUE NOT NULL, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ
    - `public.credits` — user_id UUID (PK, references users), balance INTEGER DEFAULT 0 CHECK (>= 0), updated_at TIMESTAMPTZ
    - `public.credit_transactions` — id UUID (PK, gen_random_uuid), user_id UUID, type TEXT (granted/spent/purchased), amount INTEGER, description TEXT, created_at TIMESTAMPTZ. Index on (user_id, created_at DESC)
    - `public.extractions` — id UUID (PK), user_id UUID, source_url TEXT, source_domain TEXT, element_tag TEXT, captured_at TIMESTAMPTZ, json_blueprint JSONB, generated_code TEXT, thumbnail_url TEXT. Index on (user_id, captured_at DESC)
    - `public.waitlist` — id UUID (PK), email TEXT UNIQUE NOT NULL, created_at TIMESTAMPTZ
  - **Verification:** All 5 tables visible in Supabase Table Editor. Indexes created. Foreign key constraints enforced.

- [ ] **Create `handle_new_user()` trigger function for free credits**.
  - **Details:** Create a `SECURITY DEFINER` PostgreSQL function `handle_new_user()` that inserts into `public.users`, `public.credits` (balance=5), and `public.credit_transactions` (type='granted', amount=5). Attach it as an `AFTER INSERT ON auth.users FOR EACH ROW` trigger.
  - **Verification:** Create a test user via Supabase Auth API in dashboard. Verify: user profile created, balance=5, transaction record created.

- [ ] **Enable Row-Level Security and create policies on all tables**.
  - **Details:**
    - `users`: `FOR ALL USING (auth.uid() = id)` — users read/update their own record
    - `credits`: `FOR SELECT USING (auth.uid() = user_id)` — only read own balance
    - `credit_transactions`: `FOR SELECT USING (auth.uid() = user_id)` — only read own transactions
    - `extractions`: `FOR ALL USING (auth.uid() = user_id)` — full CRUD on own extractions
    - `waitlist`: `FOR INSERT WITH CHECK (true)` — anyone can insert; `FOR SELECT USING (auth.jwt() ? 'is_admin' AND auth.jwt()->>'is_admin' = 'true')` — admin only for reads
  - **Verification:** RLS enabled on all tables. Unauthenticated queries (via anon key) return empty/error for protected tables. `waitlist` INSERT succeeds without auth. `waitlist` SELECT fails without admin JWT.

- [ ] **Install backend dependencies in `apps/landing`**.
  - **Details:** Run `pnpm --filter landing add @supabase/supabase-js @supabase/ssr stripe @anthropic-ai/sdk openai @upstash/ratelimit @vercel/kv`. These will be used across the API routes.
  - **Verification:** All packages install without peer dependency conflicts. `pnpm --filter landing build` succeeds.

- [ ] **Create Supabase client utilities**.
  - **Details:** Create `apps/landing/src/lib/supabase/server.ts` — server-side Supabase client using `@supabase/ssr` (handles cookie-based session for Next.js). Create `apps/landing/src/lib/supabase/client.ts` — browser-side Supabase client. Create `apps/landing/src/lib/supabase/middleware.ts` — Next.js middleware for session refresh. Create `apps/landing/src/lib/supabase/admin.ts` — service_role client (for admin operations, protected by env var).
  - **Verification:** Server client initializes without errors. Admin client logs a warning if `SUPABASE_SERVICE_ROLE_KEY` is missing.

- [ ] **Create shared TypeScript types for API**.
  - **Details:** Create `apps/landing/src/lib/types/api.ts` with request/response types:
    - `AuthResponse` — `{ user: { id: string, email: string }, session: { access_token: string, expires_at: number } }`
    - `AuthErrorResponse` — `{ error: string, code: string }`
    - `CreditBalanceResponse` — `{ balance: number }`
    - `TransactionResponse` — `{ transactions: CreditTransaction[], total: number }`
    - `ExtractionRequest` — `{ jsonBlueprint: JsonBlueprint, sourceUrl: string, targetFramework: string }`
    - `ExtractionResponse` — `{ id: string, generatedCode: string, jsonBlueprint: JsonBlueprint }`
    - `WaitlistRequest` — `{ email: string }`
    - `ApiError` — `{ error: string, code: 'insufficient_credits' | 'rate_limited' | 'unauthorized' | 'validation_error' | 'llm_error' }`
  - **Verification:** TypeScript compiles with no errors. Types are importable by API routes and (later) by the extension's `api-client.ts`.

- [ ] **Create API directory structure**.
  - **Details:** Create `apps/landing/src/app/api/` with subdirectories: `auth/signup/`, `auth/login/`, `auth/logout/`, `auth/me/`, `credits/balance/`, `credits/transactions/`, `credits/create-checkout/`, `webhooks/stripe/`, `extractions/`, `extractions/[id]/`, `waitlist/`. Each gets a `route.ts` file placeholder exporting a function that returns `Response.json({ status: 'not implemented' }, { status: 501 })`.
  - **Verification:** `GET /api/health` (create manually for testing) returns 200. All placeholder routes return 501. No Next.js build errors.

- [ ] **Configure environment variables**.
  - **Details:** Update `.env.example` with full backend vars:
    ```
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_ANON_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
    STRIPE_SECRET_KEY=
    STRIPE_PUBLISHABLE_KEY=
    STRIPE_WEBHOOK_SECRET=
    ANTHROPIC_API_KEY=
    OPENAI_API_KEY=
    LLM_PROVIDER=claude
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=
    NEXT_PUBLIC_EXTENSION_ID=
    ```
    Create `.env.local` with actual dev values (documented in team vault/password manager).
  - **Verification:** `process.env.NEXT_PUBLIC_SUPABASE_URL` and other vars resolve correctly at runtime. Extension can reach `localhost:3000` during dev.
