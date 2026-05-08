# 03 — Phased Execution Roadmap: VantageUI (Frontend)

**Total Phases:** 15  
**Strategy:** Frontend-first, mock-data-driven. Each phase is independently verifiable before proceeding.

---

## Phase Dependency Graph

```
Phase 1 (Foundation)
    └─► Phase 2 (Plasmo Setup)
            ├─► Phase 3 (Design System Package)
            │       └─► Phase 4 (Popup UI)
            │       └─► Phase 5 (Side Panel Shell)
            │               ├─► Phase 6 (Auth UI)
            │               ├─► Phase 7 (Inspector Overlay)
            │               ├─► Phase 8 (Extraction Flow UI)
            │               │       └─► Phase 9 (Sandpack Sandbox)
            │               │       └─► Phase 10 (Prompt Generator)
            │               ├─► Phase 11 (Design System Viewer)
            │               ├─► Phase 12 (Extraction History)
            │               └─► Phase 13 (Credits & Billing UI)
            └─► Phase 14 (Onboarding Sequence)
Phase 15 (Landing Page) — independent of extension phases, can run in parallel after Phase 3
```

---

## Phase Summaries

| #   | Phase                           | Key Deliverable                                               | Depends On |
| --- | ------------------------------- | ------------------------------------------------------------- | ---------- |
| 1   | **Project Foundation**          | Monorepo structure, tooling, env setup                        | —          |
| 2   | **Plasmo Extension Setup**      | Working MV3 extension with popup + sidepanel shells           | 1          |
| 3   | **Design System Package**       | Tailwind config, tokens, Shadcn setup, shared components      | 2          |
| 4   | **Popup UI**                    | Fully styled compact popup (all states)                       | 3          |
| 5   | **Side Panel Shell & Nav**      | Shell layout, tab navigation, header                          | 3          |
| 6   | **Auth UI Flows**               | Login + Signup forms (Zod), mocked auth state                 | 5          |
| 7   | **Inspector Content Script**    | Ghost overlay, hover highlight, ARIA badge, selection         | 2, 3       |
| 8   | **Extraction Flow UI**          | Trigger, stepper progress, Blueprint viewer, error states     | 5, 6       |
| 9   | **Sandpack Sandbox**            | Embedded sandbox, live editor, copy/download                  | 8          |
| 10  | **Prompt Generator**            | Framework selector, prompt display, copy                      | 8          |
| 11  | **Design System Viewer**        | Theme Scan UI, color/type/spacing display, downloads          | 5          |
| 12  | **Extraction History**          | History list, thumbnail, re-open, delete, empty state         | 5, 8       |
| 13  | **Credits & Billing UI**        | Balance display, pack selector, transaction history, warnings | 5          |
| 14  | **Onboarding Tooltip Sequence** | 5-step first-time overlay, progress, skip                     | 4, 5       |
| 15  | **Landing Page**                | Full Next.js marketing page with waitlist                     | 3          |

---

## Detailed Phase Descriptions

### Phase 1 — Project Foundation

**Goal:** Set up the monorepo, install all tooling, and validate a clean dev environment.

- Initialize a pnpm monorepo (`pnpm-workspace.yaml`)
- Workspaces: `apps/extension`, `apps/landing`, `packages/ui`
- Configure root ESLint (Airbnb config), Prettier, TypeScript (strict mode)
- Set up `.env.example` with placeholder keys
- Configure Vitest at the root
- **Milestone:** `pnpm dev` runs without errors in both workspaces

### Phase 2 — Plasmo Extension Setup

**Goal:** Scaffold a working MV3 Chrome Extension with a popup, side panel, and content script registered.

- `create-plasmo` scaffold inside `apps/extension`
- Register: `popup.tsx`, `sidepanel.tsx`, `contents/inspector.tsx`
- Configure `manifest.json` overrides: `side_panel`, `permissions` (`activeTab`, `storage`, `scripting`)
- Keyboard shortcut `Ctrl+Shift+X` registered in manifest
- **Milestone:** Extension loads in Chrome (`chrome://extensions/`), popup opens, side panel opens via toolbar.

### Phase 3 — Design System Package

**Goal:** Create a shared `packages/ui` package with the complete VantageUI design system, Tailwind config, and Shadcn primitives.

- Custom `tailwind.config.js` with all tokens (colors, fonts, radii, shadows, animations)
- Global CSS with `@layer base` CSS custom properties
- Font loading: Outfit + DM Sans + JetBrains Mono
- Shadcn init + add core components: `Button`, `Input`, `Badge`, `Tooltip`, `Dialog`, `Tabs`, `Card`, `Separator`, `Toast`, `Progress`, `Avatar`
- Export all as re-usable components with VantageUI overrides applied
- **Milestone:** Storybook (or a simple demo page) renders all components correctly styled.

### Phase 4 — Popup UI

**Goal:** Build the compact 320×480px popup with all auth and non-auth states.

- **Unauthenticated state:** Logo, tagline, "Sign In" + "Create Account" CTAs
- **Authenticated state:** User email, credit balance badge, "Activate Inspector" toggle button, "Open Side Panel" button, "Sign Out" link
- Low-credit warning ribbon (< 5 credits)
- Smooth mount animation (`fade-up` 150ms)
- Mocked auth toggle (dev only) via a hidden `?dev=true` query param
- **Milestone:** Popup renders both states correctly; credit badge reflects mocked balance.

### Phase 5 — Side Panel Shell & Navigation

**Goal:** Build the full side panel layout shell with tab navigation.

- Root shell: `PanelHeader` (logo + credit badge + user avatar) + `PanelNav` (tab bar) + `PanelContent` (outlet)
- 5 tabs: Extract, History, Design, Credits, Settings
- Active tab indicator: `#053B84` underline + bold label
- Tab content area: scrollable, padded, `animate-fade-up` on tab switch
- Placeholder content screens for all 5 tabs
- Responsive: side panel is always the fixed Chrome side panel width (400px+)
- **Milestone:** All 5 tabs navigate correctly; animation plays on switch; panel renders without overflow.

### Phase 6 — Auth UI Flows

**Goal:** Build login and signup forms inside the side panel with full validation.

- `LoginForm`: email + password, "Forgot Password?" link (non-functional v1), submit button
- `SignupForm`: email + password + confirm password, Zod schema with cross-field validation
- Loading state: spinner on submit button
- Error state: inline field errors + server error toast
- Success state: transition to main panel with welcome toast
- Auth gate: side panel shows auth screens if `authState === 'unauthenticated'`
- Mocked auth state managed in Zustand; persisted to `chrome.storage.local` mock
- **Milestone:** Forms validate correctly; submitting with mock credentials transitions to authenticated state; errors display on invalid input.

### Phase 7 — Inspector Content Script Overlay

**Goal:** Build the full Ghost inspector overlay that runs inside the active tab.

- On `Ctrl+Shift+X`: toggle inspector mode (send message from popup/sidepanel to content script)
- Ghost overlay: `2px solid #053B84` border + `rgba(5,59,132,0.12)` fill, rendered as an absolutely positioned `div` over the hovered element
- Hover tracking: `mousemove` listener, calculate element bounds via `getBoundingClientRect`, update overlay position
- ARIA badge: floating chip (top-right of overlay) showing `role`, `aria-expanded`, `data-state` if present
- Arrow key navigation: `ArrowUp` moves selection to `parentElement`, `ArrowDown` moves to first `children`
- Click to confirm: fires a `vantageui:selected` custom event with the serialized element data
- Escape key: deactivates inspector mode
- Inspector active indicator: a fixed bottom-right chip on the page showing "VantageUI Inspector Active"
- **Milestone:** Inspector activates/deactivates via shortcut; overlay highlights elements on hover; ARIA badge appears; arrow keys traverse DOM; click confirmation fires event.

### Phase 8 — Extraction Flow UI

**Goal:** Build the complete extraction flow in the Extract tab of the side panel.

- **Idle state:** "Select a component on the page" empty state with inspector shortcut hint
- **Selected state:** Selected component preview (URL + element tag + ARIA attributes listed), "Extract Component" button with credit cost label
- **Extracting state:** 3-step linear stepper: `Capturing DOM` → `Normalizing Blueprint` → `Synthesizing Code` with animated progress bar between steps. Simulated via `setTimeout` delays (mocked)
- **Success state:** Blueprint viewer (collapsible JSON tree, syntax-highlighted, `JetBrains Mono`) + transition to Sandpack tab
- **Error states:**
  - Shadow DOM boundary: "This component is behind a Shadow DOM boundary. Try selecting a parent element."
  - Insufficient credits: "You have 0 credits. Purchase more to continue." + CTA
  - LLM timeout: "Synthesis timed out. Please try again." + Retry button
- Credit balance decrements by 1 on each mock extraction
- **Milestone:** All 5 states render correctly; 3-step stepper animates through; error states show correct messages; credit balance decrements.

### Phase 9 — Sandpack Sandbox Integration

**Goal:** Embed a fully functional Sandpack sandbox in the side panel.

- `SandpackProvider` configured with `react-ts` template
- Pre-loaded dependencies: `tailwindcss`, `@shadcn/ui`, `framer-motion`, `clsx`, `tailwind-merge`
- `SandpackCodeEditor` with dark theme (`atomDark`), line numbers, auto-complete
- `SandpackPreview` with sandbox iframe
- `SandpackToolbar`:
  - **Copy Code** button: copies current editor content to clipboard, shows "Copied!" toast
  - **Download .tsx** button: triggers file download of editor content
- On successful extraction: auto-populates editor with generated component code
- **Milestone:** Sandpack renders; example component displays in preview; copy and download actions work; editor is live-editable and preview updates.

### Phase 10 — Prompt Generator UI

**Goal:** Build the Prompt Generator panel within the Extract tab (secondary view after extraction).

- Tab switcher within the result view: `Code` | `Prompt`
- `FrameworkSelector`: segmented control — `React / Shadcn` | `React / Tailwind` | `Raw HTML`
- Prompt display: formatted Markdown block (syntax highlighted, `JetBrains Mono`, scrollable)
- Mocked prompt content derived from the active mock extraction result
- "Copy Prompt" button: copies Markdown to clipboard
- **Milestone:** Framework selector switches prompt content (3 different mocked outputs); copy button works; prompt is readable and formatted.

### Phase 11 — Design System Viewer

**Goal:** Build the Theme Scan UI and Design System display in the Design tab.

- **Idle state:** "Theme Scan" button with description
- **Scanning state:** Animated progress bar (mocked 2-second delay)
- **Results state (3 sub-sections):**
  - **Colors:** Grid of color swatches with hex value + semantic role label
  - **Typography:** Table of font family / weight / size / line-height rows
  - **Spacing:** Row of spacing swatches (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- **Inline `DESIGN.md` viewer:** Rendered Markdown (use `react-markdown`) in a scrollable panel
- **Actions:** "Download DESIGN.md" + "Download tailwind.config.js" buttons — trigger file downloads with mocked content
- **Milestone:** Theme Scan animates and populates all 3 sections; DESIGN.md renders as formatted Markdown; both download buttons trigger file downloads.

### Phase 12 — Extraction History

**Goal:** Build the extraction history list in the History tab.

- **Populated state:** Scrollable list of `HistoryItem` cards:
  - Thumbnail image (mocked placeholder images)
  - Source URL (truncated with tooltip for full URL)
  - Timestamp (formatted: "2 hours ago")
  - Two action icons: Re-open (Sparkles icon) + Delete (Trash icon)
- **Re-open action:** Navigates to Extract tab and populates Sandpack with the saved code
- **Delete action:** Shows confirmation popover → removes item from list → success toast
- **Empty state:** Illustration + "No extractions yet. Start by inspecting a component." message
- Powered by Zustand store (`historySlice`) seeded with `history.mock.ts` fixtures
- **Milestone:** History list renders with mocked items; delete with confirmation works; re-open navigates and populates sandbox; empty state shows when list is empty.

### Phase 13 — Credits & Billing UI

**Goal:** Build the full Credits tab with balance, pack selector, and transaction history.

- **Balance card:** Large credit balance number + "Credits Remaining" label + progress bar (visual indicator of consumption)
- **Low-credit warning banner:** Red banner with Zap icon when balance < 5
- **Credit Pack Selector:** 3 cards (50 / 100 / 200 credits) with price labels ($4.99 / $8.99 / $15.99)
  - Selected card: `#053B84` border + background highlight
  - "Purchase" button: triggers mocked Stripe flow (2-second loading → success toast + balance update)
- **Transaction History:** Table with columns: Date | Type (Granted / Spent / Purchased) | Amount
  - Mocked from `credits.mock.ts`
- **Milestone:** Balance card reflects Zustand state; purchase flow shows loading then success; transaction history table renders all mocked rows; low-credit banner appears when balance < 5.

### Phase 14 — Onboarding Tooltip Sequence

**Goal:** Build the first-time user onboarding overlay.

- Triggered when `hasCompletedOnboarding` is `false` in `chrome.storage.local` (mocked)
- **5-step tooltip sequence:**
  1. "Welcome to VantageUI" → points to the panel header
  2. "Activate the Inspector" → points to inspector toggle in popup (or Extract tab shortcut hint)
  3. "Extract any Component" → points to the Extract tab
  4. "Edit in the Sandbox" → points to the Sandpack area
  5. "Build your History" → points to the History tab
- Each tooltip: step counter ("1 of 5") + title + description + "Next" button + "Skip" link
- Progress dots at bottom of tooltip
- Backdrop: semi-transparent overlay with a cutout "spotlight" effect around the target element
- On completion: sets `hasCompletedOnboarding = true`, dismisses overlay with `fade-out` animation
- Dev reset: a "Reset Onboarding" button in Settings tab (placeholder)
- **Milestone:** Onboarding overlay renders on first load; all 5 steps navigate correctly; spotlight moves to correct element per step; Skip dismisses immediately; re-trigger works via dev reset.

### Phase 15 — Landing Page (Next.js)

**Goal:** Build the complete marketing landing page.

- **Hero Section:** Large headline ("Extract Any UI. Ship in Seconds."), subheadline, email waitlist form (Zod validated), demo video placeholder (`<video>` element with poster image), animated gradient backdrop
- **How It Works (3 Steps):** Inspect → Extract → Ship — each with numbered icon + title + description
- **Features Grid (6 cards):** Ghost Inspector | Sandpack Sandbox | Prompt Generator | Design System Scanner | Framer Motion Output | Extraction History — each with icon, title, and 2-line description
- **Pricing/Credits Section:** 3 credit pack cards (matching extension UI), "Start Free" CTA (5 free credits)
- **Social Proof Bar:** Waitlist count (mocked: "1,247 engineers on the waitlist"), tech stack logos (React, Tailwind, Shadcn, Framer Motion)
- **Footer:** Logo, tagline, links (Privacy, Terms — placeholder)
- SEO: `<title>`, `<meta description>`, `og:image` (generated), structured data
- Fully responsive (mobile → desktop)
- **Milestone:** Landing page renders on `localhost:3000`; waitlist form validates and shows success state; all sections are responsive; Lighthouse score > 90.
