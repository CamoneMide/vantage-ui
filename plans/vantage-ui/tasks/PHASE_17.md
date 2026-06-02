# PHASE 17 — Authentication API & Extension Integration

**Goal:** Build all auth API routes using Supabase Auth, create reusable API client in the extension, and replace the mocked auth flow with real Supabase integration.  
**Depends On:** Phase 16  
**Unblocks:** Phase 18, Phase 19

---

- [ ] **Create auth middleware for protected routes**.
  - **Details:** Create `apps/landing/src/lib/auth/middleware.ts` with a `requireAuth` function that:
    1. Reads `Authorization: Bearer <jwt>` header
    2. Validates JWT against Supabase (using `supabase.auth.getUser(token)`)
    3. Returns `{ user, error }` — if error, returns 401 `{ error: 'Unauthorized', code: 'unauthorized' }`
    4. Extracts user ID and email for downstream use
  - **Verification:** Middleware rejects requests without token (401). Middleware accepts valid Supabase JWT (returns user). Middleware rejects expired/invalid tokens (401).

- [ ] **Build `POST /api/auth/signup`**.
  - **Details:** Validate body with Zod: `z.object({ email: z.string().email(), password: z.string().min(8) })`. Call `supabase.auth.signUp({ email, password })`. On success, return `{ user, session }`. On error (email already registered, weak password), return 400 with specific error message. The `handle_new_user` DB trigger (Phase 16) automatically creates user profile + 5 free credits.
  - **Verification:** `curl -X POST localhost:3000/api/auth/signup -H 'Content-Type: application/json' -d '{"email":"test@test.com","password":"password123"}'` returns user + session. Duplicate email returns 400.

- [ ] **Build `POST /api/auth/login`**.
  - **Details:** Validate body: `z.object({ email: z.string().email(), password: z.string() })`. Call `supabase.auth.signInWithPassword({ email, password })`. On success, return `{ user, session }`. On failure, return 401 `{ error: 'Invalid email or password', code: 'unauthorized' }`.
  - **Verification:** Login with valid credentials returns session. Login with wrong password returns 401.

- [ ] **Build `POST /api/auth/logout`**.
  - **Details:** Protected route (uses `requireAuth` middleware). Call `supabase.auth.signOut()`. Return `{ success: true }`. The extension will clear the stored JWT client-side.
  - **Verification:** Authenticated POST returns `{ success: true }`. Unauthenticated request returns 401.

- [ ] **Build `GET /api/auth/me`**.
  - **Details:** Protected route. Validates JWT via `requireAuth`, then queries `public.users` and `public.credits` to return: `{ user: { id, email, created_at }, credits: { balance } }`.
  - **Verification:** Authenticated GET returns user profile + credit balance. Token change or expiration updates correctly.

- [ ] **Create reusable extension API client**.
  - **Details:** Create `apps/extension/src/lib/api-client.ts`:
    - `ApiClient` class with configurable `baseUrl` (defaults to `http://localhost:3000` in dev, production URL in build)
    - Methods: `post<T>(path, body, auth?)`, `get<T>(path)`, `delete<T>(path)`
    - Automatic JWT handling: read from `chrome.storage.local`, attach as `Authorization: Bearer` header
    - Automatic token refresh on 401 response (call `/api/auth/login` with stored credentials or redirect to login)
    - Error handling: parse `ApiError` response, throw typed errors
  - **Verification:** `ApiClient` initializes with correct base URL. Requests include JWT header. 401 responses trigger re-auth flow.

- [ ] **Replace `mockLogin` with real API call in `popup-store.ts`**.
  - **Details:** Update `popup-store.ts`:
    - Replace `mockLogin` implementation: call `apiClient.post('/api/auth/login', { email, password })`
    - Store JWT in `chrome.storage.local` under key `vantageui-auth-token`
    - On success: set `authState: 'authenticated'`, `userEmail: email`, `user: { email }`
    - On error: set `authState: 'unauthenticated'`, `error: error.message`
    - Keep the `authState: 'loading'` state during API call (was already defined but unused)
  - **Verification:** Login form now calls real API. Loading spinner shows during request. Error message displays on failure. Session persists.

- [ ] **Replace `mockSignup` with real API call in `popup-store.ts`**.
  - **Details:** Similar to login: call `apiClient.post('/api/auth/signup', { email, password })`. Store JWT. On success, the `handle_new_user` DB trigger already grants 5 credits — no need for local `initSignupCredits()`. Fix audit issue V2 (mock bypass of initSignupCredits).
  - **Verification:** Signup creates real Supabase user. 5 free credits appear in balance. Transaction history shows 'granted' entry.

- [ ] **Replace `mockLogout` with real API call in `popup-store.ts`**.
  - **Details:** Call `apiClient.post('/api/auth/logout')`. Clear JWT from `chrome.storage.local`. Reset all auth state. Fix audit issue C10: sign out must set `inspectorActive: false` and send message to content script to deactivate inspector overlay.
  - **Verification:** Logout clears session. Inspector deactivates if active. User returns to unauthenticated view.

- [ ] **Add session restore on extension startup**.
  - **Details:** On popup/side panel mount, check `chrome.storage.local` for stored JWT. If found, call `GET /api/auth/me` to validate it's still active. If valid, set `authState: 'authenticated'`. If expired/invalid, clear JWT and show unauthenticated view. Fix audit issue D3: show loading state while checking (add spinner).
  - **Verification:** Closing and reopening the extension restores session if JWT is valid. Expired session shows login screen.

- [ ] **Remove dev auth toggle and mock auth data**.
  - **Details:** Remove `toggleAuth()`, `mockLogin`, `mockSignup`, `mockLogout` from `popup-store.ts`. Remove `auth.mock.ts` mock file. Remove the dev auth toggle UI component (`dev-auth-toggle.tsx`). Clean up any references.
  - **Verification:** No more mock auth functions exist. `auth.mock.ts` is deleted. Dev toggle no longer appears in UI.
