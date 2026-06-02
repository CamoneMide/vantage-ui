# PHASE 18 — Credits & Stripe Integration

**Goal:** Build credit management API routes and Stripe payment integration, then replace the extension's mocked credit/purchase flow with real API calls.  
**Depends On:** Phase 16, Phase 17  
**Unblocks:** Phase 19

---

- [ ] **Create Stripe Price objects for credit packs**.
  - **Details:** In Stripe Dashboard, create three Price objects:
    - `price_vantage_50`: 50 credits for $4.99 (one-time)
    - `price_vantage_100`: 100 credits for $8.99 (one-time)
    - `price_vantage_200`: 200 credits for $15.99 (one-time)
    - Product name: "VantageUI Credits"
  - Record Price IDs and add to `.env.local` as `STRIPE_PRICE_50`, `STRIPE_PRICE_100`, `STRIPE_PRICE_200`.
  - **Verification:** Three Price IDs visible in Stripe Dashboard. Test mode prices work.

- [ ] **Build `GET /api/credits/balance`**.
  - **Details:** Protected route. Query `public.credits` for current user's balance. Return `{ balance: number }`. Use the JWT-authenticated user ID from `requireAuth` middleware.
  - **Verification:** Authenticated GET returns correct balance from Supabase. New users see 5. Unauthenticated returns 401.

- [ ] **Build `GET /api/credits/transactions`**.
  - **Details:** Protected route. Query `public.credit_transactions` for current user, ordered by `created_at DESC`. Support pagination via query params `?page=1&limit=20`. Return `{ transactions: CreditTransaction[], total: number, page: number }`.
  - **Verification:** Returns transaction history for authenticated user. Pagination works. No cross-user data leakage (RLS enforced).

- [ ] **Build `POST /api/credits/create-checkout`**.
  - **Details:** Protected route. Validate body with Zod: `z.object({ priceId: z.string(), credits: z.number().positive() })`. Create Stripe Checkout session:
    - `mode: 'payment'`
    - `line_items: [{ price: priceId, quantity: 1 }]`
    - `client_reference_id: userId` (maps to Supabase user)
    - `metadata: { credits: amount }` — used by webhook to know how many credits to grant
    - `success_url: 'https://[extension-id].chromiumapp.org/success'` (opens extension) or a fallback web URL
    - `cancel_url: current_extension_url`
    - If no Stripe Customer exists for this user, create one and store `stripe_customer_id` in `public.users`
  - Return `{ url: string }` — extension opens this in a new tab.
  - **Verification:** Authenticated POST returns Stripe Checkout URL. Opening it shows Stripe payment page with correct amounts.

- [ ] **Build `POST /api/webhooks/stripe`**.
  - **Details:** Public route (no JWT auth — Stripe signs requests). Steps:
    1. Read raw body as string
    2. Validate Stripe signature using `stripe.webhooks.constructEvent(body, signature, webhookSecret)`
    3. Handle `checkout.session.completed`:
       - Extract `client_reference_id` (userId) and `metadata.credits` (amount)
       - Use service_role Supabase client to update: `UPDATE public.credits SET balance = balance + amount WHERE user_id = userId`
       - Insert transaction: `INSERT INTO public.credit_transactions (user_id, type, amount, description) VALUES (userId, 'purchased', amount, 'Credit Pack Purchase')`
       - Use atomic transaction (Postgres transaction, not Prisma): wrap in `supabase.rpc('purchase_credits', { p_user_id, p_amount })` or raw SQL via `supabase.rpc`
    4. Return 200 to Stripe
  - **Stripe CLI testing:** Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
  - **Verification:** `stripe trigger checkout.session.completed` (via Stripe CLI) triggers the webhook. User's balance increases. Transaction recorded.

- [ ] **Create `purchase_credits` database function for atomic updates**.
  - **Details:** Create a PostgreSQL function in Supabase:
    ```sql
    CREATE OR REPLACE FUNCTION public.purchase_credits(p_user_id UUID, p_amount INTEGER)
    RETURNS void AS $$
    BEGIN
      UPDATE public.credits SET balance = balance + p_amount, updated_at = NOW()
      WHERE user_id = p_user_id;
      INSERT INTO public.credit_transactions (user_id, type, amount, description)
      VALUES (p_user_id, 'purchased', p_amount, 'Credit Pack Purchase');
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    ```
    This ensures atomicity: balance update and transaction insert always happen together.
  - **Verification:** Function exists in Supabase. Calling it via `supabase.rpc` updates balance and creates transaction in one call.

- [ ] **Create `deduct_credit` database function for atomic deductions**.
  - **Details:**
    ```sql
    CREATE OR REPLACE FUNCTION public.deduct_credit(p_user_id UUID, p_description TEXT DEFAULT 'Component Extraction')
    RETURNS INTEGER AS $$
    DECLARE
      current_balance INTEGER;
    BEGIN
      SELECT balance INTO current_balance FROM public.credits WHERE user_id = p_user_id;
      IF current_balance IS NULL THEN
        RAISE EXCEPTION 'USER_NOT_FOUND';
      END IF;
      IF current_balance < 1 THEN
        RAISE EXCEPTION 'INSUFFICIENT_CREDITS';
      END IF;
      UPDATE public.credits SET balance = balance - 1, updated_at = NOW()
      WHERE user_id = p_user_id;
      INSERT INTO public.credit_transactions (user_id, type, amount, description)
      VALUES (p_user_id, 'spent', -1, p_description);
      RETURN current_balance - 1;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
    ```
    This prevents race conditions where two simultaneous requests could both succeed with only 1 credit.
  - **Verification:** Calling `deduct_credit` with sufficient balance returns new balance. Calling with 0 balance raises `INSUFFICIENT_CREDITS`. Calling for nonexistent user raises `USER_NOT_FOUND`.

- [ ] **Update `creditsSlice.ts` to use real API**.
  - **Details:** In `apps/extension/src/store/creditsSlice.ts`:
    - Remove local mock state mutations (balance, transactions are now server-authoritative)
    - Add async actions: `fetchBalance()`, `fetchTransactions()`, `createCheckoutSession(priceId, credits)`
    - `fetchBalance`: call `GET /api/credits/balance` via `apiClient`, update local balance
    - `fetchTransactions`: call `GET /api/credits/transactions`, update local transactions list
    - `createCheckoutSession`: call `POST /api/credits/create-checkout`, open returned URL in new tab
    - Keep local state as a cache, but always sync with server on relevant actions
  - **Verification:** Credits tab shows real balance from Supabase. Transaction history loads from server. Purchase button opens Stripe Checkout.

- [ ] **Replace `runMockPurchase` with real Stripe flow**.
  - **Details:** Update `credit-pack-selector.tsx` (or equivalent component):
    - On "Purchase" click, call `apiClient.post('/api/credits/create-checkout', { priceId, credits })`
    - Open returned `url` in `chrome.tabs.create({ url })`
    - After successful redirect back (detected via `chrome.tabs.onUpdated` or a success URL), call `fetchBalance()` to refresh
    - Remove `mock-purchase.ts` file
  - **Verification:** Clicking "Purchase" opens Stripe Checkout tab. After successful payment, balance updates. Failed payment does not change balance.

- [ ] **Fix audit issues: C3 (optimistic deduction), V2 (signup credits), V3 (mock defaults)**.
  - **Details:**
    - C3: Remove optimistic credit deduction before extraction. Credits are now deducted server-side by `deduct_credit()` only after extraction actually starts. The extraction API route (Phase 19) handles this.
    - V2: `initSignupCredits` is no longer called client-side. The `handle_new_user` DB trigger handles it. Remove any remnants of `initSignupCredits()` from the store.
    - V3: Remove `mockCreditBalance`/`mockTransactionHistory` usage as persisted defaults. The store initializes with `balance: 0, transactions: []` and fetches from server on auth.
  - **Verification:** No mock credit defaults exist. Credits are always server-authoritative.

- [ ] **Remove credits mock files**.
  - **Details:** Delete `apps/extension/src/mocks/credits.mock.ts` and `apps/extension/src/mocks/mock-purchase.ts`. Remove any import references.
  - **Verification:** Build succeeds without these files. No import errors.
