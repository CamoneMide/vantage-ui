# PHASE 4 — Popup UI

**Goal:** Build the fully styled, production-quality 320×480px popup with all auth and non-auth states, grounded in DESIGN.md.  
**Depends On:** Phase 3  
**Unblocks:** Phase 14

---

- [x] **Set up popup entry point styling**: Apply design system to the popup root.
  - **Details:** In `src/popup.tsx`, import `globals.css`. Set root `<div>` to `width: 320px; min-height: 480px; background: #F5F5F6; font-family: 'DM Sans', sans-serif; overflow: hidden`. Wrap with the Zustand `StoreProvider`.
  - **Verification:** Popup renders at exactly 320×480px. Background is Soft White `#F5F5F6`, not pure white or grey.

- [x] **Build `PopupHeader` component**: Renders the VantageUI logo/wordmark + credit balance badge.
  - **Details:** White (`#FFFFFF`) background surface, `border-bottom: 1px solid rgba(10,10,10,0.08)`, `padding: 16px`. Left side: SVG logo + "VantageUI" wordmark in Outfit SemiBold 16px, Deep Black. Right side: `<CreditBadge>` from `@vantage-ui/ui`. Export with JSDoc.
  - **Verification:** Header renders correctly in both authenticated and unauthenticated states. Credit badge shows mocked balance.

- [x] **Build unauthenticated popup state**: Auth gate for first-time / logged-out users.
  - **Details:** Full-bleed Soft White canvas. VantageUI logo centered top (64px from top). Tagline: "Extract any UI. Ship in seconds." in Outfit Medium 18px, centered. Two buttons stacked vertically with 12px gap: Primary "Sign In" (Nero Blue, full-width, 8px radius) and Secondary "Create Account" (White bg, `rgba(10,10,10,0.1)` border, full-width). `padding: 24px`. Fade-up animation on mount.
  - **Verification:** Renders correctly when `authState === 'unauthenticated'`. Both buttons are present. Mount animation plays.

- [x] **Build authenticated popup state**: Main popup dashboard for logged-in users.
  - **Details:** White card (`background: #FFFFFF`, `border-radius: 8px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.05)`, `margin: 12px`, `padding: 20px`). Contents:
    - User email in DM Sans 14px, `rgba(10,10,10,0.6)` (secondary text).
    - "Activate Inspector" primary button: Nero Blue, full-width, Zap icon + "Activate Inspector" text. On click: sends `TOGGLE_INSPECTOR` message to active tab.
    - "Open Side Panel" ghost/secondary button: full-width, Sparkles icon, opens the Chrome side panel via `chrome.sidePanel.open()`.
    - "Sign Out" ghost link: right-aligned, DM Sans 13px, Nero Blue text, `rgba(10,10,10,0.6)` on hover.
  - **Verification:** All three interactive elements render and are clickable. "Activate Inspector" sends the correct Chrome message (verify in background console). "Open Side Panel" opens the side panel.

- [x] **Build low-credit warning ribbon**: Renders when credit balance falls below 5.
  - **Details:** A full-width banner inside the authenticated card (below the email, above the buttons): `background: rgba(220,38,38,0.06)`, `border-left: 3px solid #DC2626`, `padding: 10px 12px`. Text: "⚡ Low credits — {balance} remaining. [Top Up →]" in DM Sans 13px Destructive red. "Top Up" is a Nero Blue underline link. Conditionally rendered when `creditBalance < 5`.
  - **Verification:** With `creditBalance = 4` in mock store, banner appears. With `creditBalance = 10`, banner is hidden. Clicking "Top Up" has a placeholder action (console log is fine for Phase 4).

- [x] **Build dev auth toggle**: Hidden dev mode flag for toggling auth state during testing.
  - **Details:** When the URL param `?dev=1` is appended (popup URL), render a small toggle switch at the very bottom of the popup: "Dev: Auth On/Off". This toggle flips the `authState` in Zustand. This element must NOT render in production builds (use `process.env.NODE_ENV === 'development'` guard).
  - **Verification:** Opening `popup.html?dev=1` shows the toggle. Flipping it switches between authenticated and unauthenticated states. Opening `popup.html` (no param) shows no toggle.

- [x] **Write unit test for `CreditBadge` color logic**: Vitest unit test.
  - **Details:** In `packages/ui/src/__tests__/CreditBadge.test.tsx`: test that `balance >= 5` renders Nero Blue styling and `balance < 5` renders Destructive red styling. Use `@testing-library/react` render + `getByText`.
  - **Verification:** `pnpm test` passes with 2 assertions green.
