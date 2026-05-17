# VantageUI — Progress History

> Auto-generated progress tracker. **Every task MUST update this file** upon completion.
> Last updated: 2026-05-17 (Phase 12 completed, cross-context auth sync fix)

---

## Overall Status

| Phase | Description                      | Status         |
| ----- | -------------------------------- | -------------- |
| 1     | Project Foundation               | ✅ Complete    |
| 2     | Plasmo Extension Setup           | ✅ Complete    |
| 3     | Design System Package            | ✅ Complete    |
| 4     | Popup UI                         | ✅ Complete    |
| 5     | Side Panel Shell & Navigation    | ✅ Complete    |
| 6     | Auth UI Flows                    | ✅ Complete    |
| 7     | Inspector Content Script Overlay | ✅ Complete    |
| 8     | Extraction Flow UI               | ✅ Complete    |
| 9     | Sandpack Sandbox Integration     | ✅ Complete    |
| 10    | Prompt Generator UI              | ✅ Complete    |
| 11    | Design System Viewer             | ✅ Complete    |
| 12    | Extraction History               | ✅ Complete    |
| 13    | Credits & Billing UI             | ❌ Not Started |
| 14    | Onboarding Tooltip Sequence      | ❌ Not Started |
| 15    | Landing Page (Next.js)           | ❌ Not Started |

- **Completed:** 12 / 15 phases
- **Remaining:** 4 phases (13–15)

---

## Phase 1 — Project Foundation ✅

| Task                         | Status | Notes                                                           |
| ---------------------------- | ------ | --------------------------------------------------------------- |
| Initialize pnpm monorepo     | ✅     | `pnpm-workspace.yaml`, root `package.json` with `private: true` |
| Configure root TypeScript    | ✅     | `tsconfig.base.json` with strict mode                           |
| Configure ESLint             | ✅     | `.eslintrc.cjs` with Airbnb + TypeScript                        |
| Configure Prettier           | ✅     | `.prettierrc`                                                   |
| Configure Vitest at root     | ✅     | `vitest.config.ts`                                              |
| Create `.env.example`        | ✅     | Documented required env vars                                    |
| Verify clean dev environment | ✅     | `pnpm install && pnpm lint && pnpm format && pnpm test` passes  |

---

## Phase 2 — Plasmo Extension Setup ✅

| Task                                     | Status | Notes                                                   |
| ---------------------------------------- | ------ | ------------------------------------------------------- |
| Scaffold Plasmo app                      | ✅     | `apps/extension` with MV3 manifest                      |
| Register Side Panel in manifest          | ✅     | `side_panel` permission + default_path                  |
| Register keyboard shortcut               | ✅     | `Ctrl+Shift+X` / `Cmd+Shift+X`                          |
| Create popup shell                       | ✅     | `src/popup.tsx` — 320×480px                             |
| Create side panel shell                  | ✅     | `src/sidepanel.tsx` — full height                       |
| Create content script shell              | ✅     | `src/contents/inspector.tsx` — `<all_urls>`             |
| Wire keyboard shortcut to content script | ✅     | `src/background.ts` — `chrome.commands.onCommand`       |
| Add dev/build scripts                    | ✅     | `dev:extension`, `build:extension` in root package.json |

---

## Phase 3 — Design System Package ✅

| Task                               | Status | Notes                                                |
| ---------------------------------- | ------ | ---------------------------------------------------- |
| Initialize `packages/ui`           | ✅     | `@vantage-ui/ui` workspace package                   |
| Configure Tailwind CSS with tokens | ✅     | `tailwind.config.ts` with full token set             |
| Set up global CSS base styles      | ✅     | `globals.css` with `--color-*` custom properties     |
| Load fonts                         | ✅     | Outfit, DM Sans, JetBrains Mono via CSS `@import`    |
| Initialize Shadcn/ui               | ✅     | 14 components in `components/ui/`                    |
| Apply VantageUI theme overrides    | ✅     | Mapped Shadcn CSS vars to VantageUI tokens           |
| Create `packages/ui/src/index.ts`  | ✅     | Barrel exports including `tailwindConfig`            |
| Create `CreditBadge` primitive     | ✅     | At `packages/ui/src/components/credit-badge.tsx`     |
| Create `StepperProgress` primitive | ✅     | At `packages/ui/src/components/stepper-progress.tsx` |

---

## Phase 4 — Popup UI ✅

| Task                              | Status | Notes                                                     |
| --------------------------------- | ------ | --------------------------------------------------------- |
| Set up popup entry point styling  | ✅     | `globals.css` import, 320×480px, Soft White bg            |
| Build `PopupHeader` component     | ✅     | Logo + wordmark + `CreditBadge`                           |
| Build unauthenticated popup state | ✅     | Logo, tagline, Sign In / Create Account buttons           |
| Build authenticated popup state   | ✅     | User email, Activate Inspector, Open Side Panel, Sign Out |
| Build low-credit warning ribbon   | ✅     | Conditional red banner when balance < 5                   |
| Build dev auth toggle             | ✅     | `?dev=1` param toggle in dev mode                         |
| Write unit test for CreditBadge   | ✅     | `packages/ui/src/__tests__/CreditBadge.test.tsx`          |

---

## Phase 5 — Side Panel Shell & Navigation ✅

| Task                                  | Status | Notes                                                          |
| ------------------------------------- | ------ | -------------------------------------------------------------- |
| Set up side panel entry point         | ✅     | `src/sidepanel.tsx` — full height, Soft White bg               |
| Build `PanelHeader` component         | ✅     | Logo, credit badge, avatar — 56px                              |
| Build `PanelNav` tab bar              | ✅     | 5 tabs with icons, active/inactive states                      |
| Build `PanelContent` outlet           | ✅     | Scrollable content area with fade-up animation                 |
| Create placeholder screens for 5 tabs | ✅     | Extract, History, Design, Credits, Settings                    |
| Implement auth gate                   | ✅     | `AuthGate` shown when unauthenticated                          |
| Set up Zustand store for UI state     | ✅     | `uiSlice` with `activeTab` persisted to `chrome.storage.local` |

---

## Phase 6 — Auth UI Flows ✅

| Task                              | Status | Notes                                                        |
| --------------------------------- | ------ | ------------------------------------------------------------ |
| Create Zod auth schemas           | ✅     | `src/schemas/auth.schema.ts` — loginSchema, signupSchema     |
| Create Zustand auth slice         | ✅     | `src/store/authSlice.ts` — mockLogin, mockSignup, mockLogout |
| Build `LoginForm` component       | ✅     | Full form with Zod validation, spinner, error states         |
| Build `SignupForm` component      | ✅     | Full form with confirm password, toast on success            |
| Build `AuthGate` layout wrapper   | ✅     | Tabs switching between Login/Signup                          |
| Add welcome credit initialization | ✅     | `mockSignup()` seeds 5 credits                               |

---

## Phase 7 — Inspector Content Script Overlay ✅

| Task                                   | Status | Notes                                                     |
| -------------------------------------- | ------ | --------------------------------------------------------- |
| Set up content script React root       | ✅     | Shadow DOM mounting in `src/contents/inspector.tsx`       |
| Implement inspector toggle state       | ✅     | `TOGGLE_INSPECTOR` message toggles active/inactive        |
| Build "Inspector Active" chip          | ✅     | Fixed bottom-right pill, Nero Blue bg                     |
| Build Ghost overlay element            | ✅     | `mousemove` tracking overlay with `getBoundingClientRect` |
| Build ARIA attribute badge             | ✅     | Floating chip showing detected ARIA attributes            |
| Implement arrow-key DOM navigation     | ✅     | ArrowUp/ArrowDown for parent/child traversal              |
| Implement click-to-select confirmation | ✅     | Freezes overlay, serializes element data, sends message   |
| Implement Escape key to deactivate     | ✅     | Clean exit, removes all listeners                         |

---

## Phase 8 — Extraction Flow UI ✅

| Task                              | Status | Notes                                                       |
| --------------------------------- | ------ | ----------------------------------------------------------- |
| Create mock extraction fixtures   | ✅     | `src/mocks/extractions.mock.ts`                             |
| Create Zustand extraction slice   | ✅     | `src/store/extraction-store.ts` — state machine             |
| Build mock extraction simulator   | ✅     | `src/lib/mock-extraction.ts` — 3-step timed pipeline        |
| Build `ExtractionIdleState`       | ✅     | Dashed border box with Sparkles icon                        |
| Build `ExtractionSelectedState`   | ✅     | Component summary, ARIA chips, Extract/Re-select buttons    |
| Build `ExtractionProgressState`   | ✅     | 3-step StepperProgress with animated Progress bar           |
| Build `ExtractionSuccessState`    | ✅     | Blueprint viewer, Open in Sandbox / Generate Prompt buttons |
| Build `ExtractionErrorState`      | ✅     | 4 error types with specific messages and actions            |
| Wire all states into `ExtractTab` | ✅     | Full idle→select→extract→success→sandbox flow               |

---

## Phase 9 — Sandpack Sandbox Integration ✅

| Task                                  | Status | Notes                                                    |
| ------------------------------------- | ------ | -------------------------------------------------------- |
| Install Sandpack                      | ✅     | `@codesandbox/sandpack-react` dependency added           |
| Build `SandpackContainer`             | ✅     | SandpackProvider with react-ts template, Tailwind config |
| Configure editor styling              | ✅     | JetBrains Mono, light theme, editor/preview stack        |
| Build `SandpackToolbar`               | ✅     | Copy Code + Download .tsx buttons                        |
| Implement live-edit-to-preview        | ✅     | Native Sandpack autorun + 300ms debounce                 |
| Connect Sandpack to extraction result | ✅     | "Open in Sandbox" → Sandpack view with generated code    |
| Add loading state                     | ✅     | Skeleton shimmer while sandbox initializes               |

---

## Phase 10 — Prompt Generator UI ✅

| #   | Task                                   | Status | Notes                                                                               |
| --- | -------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| 1   | Create mock prompt fixtures            | ✅     | `src/mocks/prompts.mock.ts` — 3 frameworks, 6 Markdown sections each                |
| 2   | Build `FrameworkSelector` component    | ✅     | `src/components/prompt/framework-selector.tsx` — 3-segment pill control             |
| 3   | Build `PromptDisplay` component        | ✅     | `src/components/prompt/prompt-display.tsx` — react-markdown + rehype-highlight      |
| 4   | Build `PromptGeneratorPanel` composite | ✅     | `src/components/prompt/prompt-generator-panel.tsx` — selector, display, copy button |
| 5   | Wire Prompt Generator into Extract tab | ✅     | `promptView` in extraction store, wired via success state and extract tab           |
| 6   | Add unit test for FrameworkSelector    | ✅     | 5 assertions in `FrameworkSelector.test.tsx` — all pass                             |

> **Build note:** Custom `MarkdownRenderer` at `src/lib/markdown-renderer.tsx` used instead of `react-markdown` + `rehype-highlight` — those packages caused bundler conflicts with Plasmo (parcel-based). Custom parser handles H2/H3, paragraphs, inline bold/code, code blocks, tables, lists, and horizontal rules.

---

## Phase 11 — Design System Viewer ✅

| #   | Task                                     | Status | Notes                                                                                                            |
| --- | ---------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| 1   | Create mock design system fixtures       | ✅     | `src/mocks/design-system.mock.ts` — 8 colors, 7 typography rows, 8 spacing values, DESIGN.md, tailwind.config.js |
| 2   | Create Zustand design system slice       | ✅     | `designSystemSlice` with `startScan`, `setScanResults`, `resetScan`                                              |
| 3   | Build `DesignTabIdleState` component     | ✅     | White card, Palette icon, "Run Theme Scan" button                                                                |
| 4   | Build `DesignTabScanningState` component | ✅     | Spin animation on ScanLine, Progress bar                                                                         |
| 5   | Build `ColorPaletteGrid` component       | ✅     | 4-column grid with copy-to-clipboard, Tooltip                                                                    |
| 6   | Build `TypographyScaleTable` component   | ✅     | Responsive table with alternating rows, monospace font family                                                    |
| 7   | Build `SpacingSystem` component          | ✅     | Horizontal scrollable row with proportional bars                                                                 |
| 8   | Build `DesignMdViewer` component         | ✅     | MarkdownRenderer in scrollable container                                                                         |
| 9   | Build download action buttons            | ✅     | Blob downloads for DESIGN.md + tailwind.config.js                                                                |
| 10  | Assemble `DesignTab` with wiring         | ✅     | Full idle → scan → results flow with Re-scan button                                                              |

---

## Phase 12 — Extraction History ✅

| #   | Task                              | Status | Notes                                                                      |
| --- | --------------------------------- | ------ | -------------------------------------------------------------------------- |
| 1   | Create mock history fixtures      | ✅     | `src/mocks/history.mock.ts` — 5 items from linear.app, stripe.com, etc.    |
| 2   | Create Zustand history slice      | ✅     | `historySlice` with addItem (prepend), removeItem (immutable), clearAll    |
| 3   | Build `HistoryEmpty` component    | ✅     | Dashed border square + Clock + "Activate Inspector" sends TOGGLE_INSPECTOR |
| 4   | Build `HistoryItem` component     | ✅     | Thumbnail + domain + tag + relative timestamp + Sparkles/Trash2 actions    |
| 5   | Install `date-fns` for timestamps | ✅     | `formatDistanceToNow` for relative timestamps ("2 hours ago")              |
| 6   | Build delete confirmation popover | ✅     | Shadcn `<Popover>` with Cancel/Delete + toast                              |
| 7   | Build re-open extraction action   | ✅     | Sparkles → `setSuccess()` + `setActiveTab('extract')`                      |
| 8   | Assemble `HistoryTab` with wiring | ✅     | Full list → delete → clear all → empty state flow                          |

---

## Phase 13 — Credits & Billing UI ❌

| #   | Task                                    | Status | Notes                                   |
| --- | --------------------------------------- | ------ | --------------------------------------- |
| 1   | Create mock credits fixtures            | ❌     | `src/mocks/credits.mock.ts` not created |
| 2   | Create / finalize Zustand credits slice | ❌     | No `creditsSlice` in store              |
| 3   | Build `CreditBalanceCard` component     | ❌     | Not created                             |
| 4   | Build low-credit warning banner         | ❌     | Not created                             |
| 5   | Build `CreditPackSelector` component    | ❌     | Not created                             |
| 6   | Build mocked Stripe purchase flow       | ❌     | Not created                             |
| 7   | Build `TransactionHistoryTable`         | ❌     | Not created                             |
| 8   | Assemble `CreditsTab` with wiring       | ❌     | Placeholder still in `credits-tab.tsx`  |

---

## Phase 14 — Onboarding Tooltip Sequence ❌

| #   | Task                                 | Status | Notes                              |
| --- | ------------------------------------ | ------ | ---------------------------------- |
| 1   | Create onboarding state + storage    | ❌     | `onboardingSlice` not created      |
| 2   | Define onboarding step configuration | ❌     | `onboarding.config.ts` not created |
| 3   | Build `OnboardingBackdrop` component | ❌     | Not created                        |
| 4   | Build `OnboardingTooltip` component  | ❌     | Not created                        |
| 5   | Implement smart tooltip positioning  | ❌     | Not created                        |
| 6   | Build `OnboardingOverlay` + mount    | ❌     | Not created                        |

---

## Phase 15 — Landing Page (Next.js) ❌

| #   | Task                                   | Status | Notes                                                   |
| --- | -------------------------------------- | ------ | ------------------------------------------------------- |
| 1   | Scaffold `apps/landing` as Next.js app | ⚠️     | `package.json` and `tsconfig.json` exist, no `src/` yet |
| 2   | Build page metadata and SEO            | ❌     | `layout.tsx` not created                                |
| 3   | Build `Navbar` component               | ❌     | Not created                                             |
| 4   | Build `HeroSection` component          | ❌     | Not created                                             |
| 5   | Implement waitlist form logic          | ❌     | Not created                                             |
| 6   | Build `HowItWorksSection`              | ❌     | Not created                                             |
| 7   | Build `FeaturesSection`                | ❌     | Not created                                             |
| 8   | Build `PricingSection`                 | ❌     | Not created                                             |
| 9   | Build `SocialProofSection`             | ❌     | Not created                                             |
| 10  | Build `Footer` component               | ❌     | Not created                                             |
| 11  | Validate responsiveness + Lighthouse   | ❌     | Not done                                                |

---

## Key Files Referenced

| Path                                 | Description                     |
| ------------------------------------ | ------------------------------- |
| `plans/vantage-ui/01_PRD.md`         | Product Requirements Document   |
| `plans/vantage-ui/02_TECH_SPEC.md`   | Technical Specification         |
| `plans/vantage-ui/03_PHASED_PLAN.md` | Phased implementation plan      |
| `plans/vantage-ui/tasks/PHASE_*.md`  | Per-phase task files            |
| `DESIGN.md`                          | Design system reference         |
| `apps/extension/src/`                | Chrome extension source         |
| `packages/ui/src/`                   | Shared design system package    |
| `apps/landing/`                      | Next.js landing page (scaffold) |

---

## Agent Instructions

> **IMPORTANT — Every agent/tool working on this codebase MUST:**
>
> 1. Read the relevant phase task file(s) in `plans/vantage-ui/tasks/` before starting work.
> 2. Update this file (`progress-history.md`) after **every task** is completed — mark the check box and update the status.
> 3. Run `pnpm lint` and `pnpm test` before marking any task as complete.
> 4. If a task cannot be completed (blocked, deprioritized, or changed), note the reason in the Notes column.
> 5. Keep the "Last updated" date at the top of this file current.
