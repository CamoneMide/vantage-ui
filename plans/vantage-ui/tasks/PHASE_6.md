# PHASE 6 — Auth UI Flows

**Goal:** Build login and signup forms in the side panel with full Zod validation and mocked auth state transitions.  
**Depends On:** Phase 5  
**Unblocks:** Phase 8, Phase 12, Phase 13

---

- [ ] **Create Zod auth schemas**: Define and export validation schemas for both forms.
  - **Details:** Create `src/schemas/auth.schema.ts`. Export:
    - `loginSchema`: `{ email: z.string().email(), password: z.string().min(8) }`
    - `signupSchema`: `loginSchema` extended with `confirmPassword` + `.refine()` cross-field check that `password === confirmPassword` (error: "Passwords do not match", path: `['confirmPassword']`).
  - **Verification:** Unit test in `src/schemas/__tests__/auth.schema.test.ts`: valid inputs pass, mismatched passwords fail with the correct error message, short password fails. `pnpm test` → all green.

- [ ] **Create Zustand auth slice**: Mocked auth state management.
  - **Details:** Create `src/store/authSlice.ts`. State: `{ authState: 'unauthenticated' | 'loading' | 'authenticated', user: { email: string } | null, error: string | null }`. Actions: `mockLogin(email)`, `mockSignup(email)`, `mockLogout()`. `mockLogin` / `mockSignup`: set `loading` for 1500ms (simulates API call), then set `authenticated` with the provided email. `mockLogout`: reset to `unauthenticated`. Add JSDoc to all actions.
  - **Verification:** Calling `mockLogin('test@test.com')` transitions state through `loading` → `authenticated`. Calling `mockLogout()` returns to `unauthenticated`.

- [ ] **Build `LoginForm` component**: Full login form UI.
  - **Details:** White surface card (`background: #FFFFFF`, `border-radius: 12px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.05)`, `padding: 32px`). Contents:
    - Heading: "Welcome back" in Outfit SemiBold 24px, Deep Black.
    - Subtext: "Sign in to your VantageUI account." in DM Sans 14px, `rgba(10,10,10,0.6)`.
    - Email input: label "Email" + `<Input type="email">`. Styled per DESIGN.md (White bg, `rgba(10,10,10,0.15)` border, 8px radius, 12px 16px padding, Nero Blue focus ring).
    - Password input: label "Password" + `<Input type="password">` + "Forgot password?" ghost link (right-aligned, 12px, Nero Blue) — non-functional in v1.
    - Submit: Nero Blue full-width primary button. Shows spinner (`<Loader2 className="animate-spin">`) while `authState === 'loading'`.
    - Bottom link: "Don't have an account? [Create one]" — switches to `SignupForm`.
    - Server error: `<p className="text-destructive">` shown when `authState.error` is set.
  - **Verification:** Form renders correctly. Invalid email shows inline Zod error. Short password shows inline error. Submitting valid credentials shows spinner then transitions to authenticated state. Error message renders on mock failure.

- [ ] **Build `SignupForm` component**: Full signup form UI with confirm password.
  - **Details:** Same card styling as `LoginForm`. Contents:
    - Heading: "Create your account" (Outfit SemiBold 24px).
    - Subtext: "5 free credits included on sign-up." (DM Sans 14px, `rgba(10,10,10,0.6)`).
    - Email, Password, Confirm Password fields (same input styling as login).
    - Inline field errors per Zod (show below each field in DM Sans 12px, `#DC2626`).
    - "Confirm Password" mismatch error shown under the confirm field.
    - Submit: "Create Account" primary button with spinner on loading.
    - Success: after transition to `authenticated`, show a Shadcn `<Toast>` with "Welcome! 5 free credits added to your account. 🎉"
    - Bottom: "Already have an account? [Sign In]"
  - **Verification:** Mismatched passwords show the correct error on the confirm field specifically (not on email field). Success toast appears after mock signup. Transition to authenticated shows the main panel shell.

- [ ] **Build `AuthGate` layout wrapper**: Renders inside the side panel when unauthenticated.
  - **Details:** Replaces `PanelContent` when `authState === 'unauthenticated'`. Uses a Shadcn `<Tabs>` (two tabs: "Sign In" / "Create Account") with `value` controlled by local state (togglable from links inside each form). Renders `LoginForm` or `SignupForm` based on active tab. No main panel nav shown. `PanelHeader` is still visible (with credit badge showing 0 / no balance).
  - **Verification:** Auth gate renders correctly. Clicking "Don't have an account?" inside `LoginForm` switches the outer tab to "Create Account" without a page reload.

- [ ] **Add welcome credit initialization**: After mock signup, seed credit balance.
  - **Details:** In `mockSignup()` action: after transitioning to `authenticated`, also dispatch `setCreditBalance(5)` from the credits slice (to be created fully in Phase 13, but stub the action here). This ensures the `CreditBadge` in the header shows `5` immediately after signup.
  - **Verification:** After completing mock signup, the `PanelHeader` credit badge shows "5" immediately.
