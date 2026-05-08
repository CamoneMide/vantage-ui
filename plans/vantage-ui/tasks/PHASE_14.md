# PHASE 14 — Onboarding Tooltip Sequence

**Goal:** Build the first-time user onboarding overlay — a 5-step guided tooltip sequence with a spotlight effect, progress dots, and skip control.  
**Depends On:** Phase 4, Phase 5  
**Unblocks:** Nothing (final extension feature)

---

- [ ] **Create onboarding state in Zustand + storage**: Track completion state persistently.
  - **Details:** Create `src/store/onboardingSlice.ts`. State: `{ hasCompletedOnboarding: boolean, currentStep: number }`. Actions: `nextStep()`, `completeOnboarding()`, `resetOnboarding()`. On `completeOnboarding()`: persist to `chrome.storage.local` (mock with `localStorage` in dev). On mount: read `hasCompletedOnboarding` from storage — if `false`, trigger the overlay. Add JSDoc.
  - **Verification:** Unit test: `nextStep()` increments `currentStep`. `completeOnboarding()` sets `hasCompletedOnboarding = true`. `resetOnboarding()` returns to initial state. `pnpm test` → green.

- [ ] **Define onboarding step configuration**: Typed step definitions array.
  - **Details:** Create `src/config/onboarding.config.ts`. Export `ONBOARDING_STEPS: OnboardingStep[]` (5 steps). Type: `{ id: number; title: string; description: string; targetId: string; placement: 'bottom' | 'top' | 'left' | 'right' }`. Steps:
    1. target `panel-header` — "Welcome to VantageUI" — "Your credits and profile live here."
    2. target `nav-tab-extract` — "Start Extracting" — "Inspect any live website component with one click."
    3. target `inspector-toggle-popup` — "Activate the Inspector" — "Toggle the Ghost Inspector directly on any webpage."
    4. target `nav-tab-history` — "Your Extraction Library" — "Every component you extract is saved here."
    5. target `nav-tab-design` — "Design System Scanner" — "Scan any site's full design system in 2 seconds."
       Ensure all `targetId` values are set as `id` attributes on the correct DOM elements in Phases 4–5.
  - **Verification:** All 5 steps import. `targetId` values match `id` attributes on target DOM elements (manual check).

- [ ] **Build `OnboardingBackdrop` component**: Spotlight overlay with CSS cutout.
  - **Details:** Fixed full-viewport overlay (`position: fixed; inset: 0; z-index: 9998`). Uses CSS `clip-path` or SVG mask to spotlight the target element. Background: `rgba(10,10,10,0.55)`. On step change, recalculate target `getBoundingClientRect()` and update spotlight with 250ms CSS transition. Step 1 only: pulsing Nero Blue ring around the spotlight (`opacity: 0 → 0.4 → 0`, 1.5s loop). `pointer-events: none` on the spotlight area.
  - **Verification:** Backdrop renders above all panel content (z-index 9998). Spotlight accurately frames the target. Spotlight transitions smoothly between steps. Pulsing ring appears on step 1 only.

- [ ] **Build `OnboardingTooltip` component**: Floating tooltip card per step.
  - **Details:** White card, `border-radius: 12px`, `padding: 20px 24px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.12)`, `position: fixed`, `z-index: 9999`. Positioned relative to the target's bounding rect using `placement`. Layout: step counter (DM Sans 12px, `rgba(10,10,10,0.5)`) → heading (Outfit SemiBold 18px) → description (DM Sans 14px `rgba(10,10,10,0.7)`) → bottom bar [5 progress dots + "Skip" ghost link + "Next →" primary button]. Last step: "Next →" becomes "Get Started" + Sparkles icon + no Skip. Mount animation: `animate-fade-up` 120ms.
  - **Verification:** Tooltip renders adjacent to spotlight. Progress dots reflect current step. "Next →" increments step. "Get Started" calls `completeOnboarding()`. "Skip" calls `completeOnboarding()` immediately.

- [ ] **Implement smart tooltip positioning**: Prevent overflow at panel edges.
  - **Details:** After calculating the ideal position from `placement`, check for viewport overflow. If clipping: flip to the opposite side. If both clip: fall back to `'bottom'` centered. Implement in a `useTooltipPosition(targetRect, placement)` hook using `useLayoutEffect`.
  - **Verification:** Step targeting the header shows tooltip below (not above, which would clip). Step targeting a bottom element shows tooltip above.

- [ ] **Build `OnboardingOverlay` and mount in side panel**: Composite and wiring.
  - **Details:** `OnboardingOverlay` wraps `OnboardingBackdrop` + `OnboardingTooltip`, driven by `onboardingSlice`. Wrap unmounting in Framer Motion `<AnimatePresence>` (`opacity: 0` over 200ms on exit). Mount in `sidepanel.tsx` as a portal sibling: `{isAuthenticated && !hasCompletedOnboarding && <OnboardingOverlay />}`. Add "Reset Onboarding" dev-only button in `SettingsTab.tsx` that calls `resetOnboarding()`.
  - **Verification:** First load after mock signup shows overlay. After completion or skip, overlay fades out and never re-appears. "Reset Onboarding" in Settings re-triggers it.
