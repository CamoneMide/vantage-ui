# 01 — Product Requirements Document: VantageUI (v1.0)

**Status:** Approved — Planning Phase  
**Version:** 1.0  
**Last Updated:** 2026-05-06

---

## 1. Vision & Goals

### Vision

VantageUI is a **precision extraction bridge** — a Chrome extension that transforms the painful, multi-hour process of reverse-engineering a polished website component into a 8-second, single-click workflow. It captures what screenshots and raw copy-paste cannot: computed styles, animation curves, ARIA states, and design tokens — then synthesizes them into production-ready React/Tailwind/Shadcn code.

### Goals (v1)

1. Enable any frontend engineer to extract a complex UI component and have it rendered in a live sandbox in under 8 seconds.
2. Achieve ≥ 80% sandbox render success rate without manual correction.
3. Convert ≥ 15% of users who exhaust their free credits into paying customers.
4. Validate demand with 500+ waitlist sign-ups within 2 weeks of launch.

---

## 2. User Personas

### Persona A — "The Inspired Engineer" (Primary)

- **Role:** Mid-to-senior frontend engineer
- **Pain:** Spends 30–120 mins re-implementing UI patterns they find on live sites, fighting "CSS soup" from DevTools
- **Goal:** A component they can drop into their codebase in 5 minutes, not 2 hours
- **Behavior:** Frequently browses Stripe, Linear, Vercel, Apple for UI inspiration

### Persona B — "The Design-Aware PM/Designer" (Secondary)

- **Role:** Product manager or UI/UX designer who codes
- **Pain:** Can't easily extract a competitor's or inspiration site's design system for reference
- **Goal:** A `DESIGN.md` + `tailwind.config.js` bootstrapped from any site without manual color picking
- **Behavior:** Uses Figma, inspects competitor sites, documents design patterns

---

## 3. Design & Theming Constraints

### Color Palette

| Token             | Value                 | Role                                         |
| ----------------- | --------------------- | -------------------------------------------- |
| Soft White        | `#F5F5F6`             | Primary page/panel background (canvas)       |
| White             | `#FFFFFF`             | Card & container surfaces, inputs, nav       |
| Deep Black        | `#0A0A0A`             | Primary text, icons                          |
| Black             | `#000000`             | Maximum emphasis / deepest elements          |
| Nero Blue         | `#053B84`             | Brand CTA, active states, focus rings, links |
| Secondary Text    | `rgba(10,10,10,0.6)`  | Subtitles, metadata, placeholders            |
| Border Subtle     | `rgba(10,10,10,0.08)` | Card/container borders                       |
| Border Input      | `rgba(10,10,10,0.15)` | Input field borders                          |
| Success           | `#16A34A`             | Credit additions, success toasts             |
| Destructive       | `#DC2626`             | Errors, delete, low-credit warning           |
| Inspector Overlay | `rgba(5,59,132,0.12)` | Ghost hover fill on the active tab           |

### Typography

| Usage                      | Family           | Weight         |
| -------------------------- | ---------------- | -------------- |
| Display / Headings (H1–H2) | `Outfit`         | 700 (Bold)     |
| Sub-headings (H3–H4)       | `Outfit`         | 600 (SemiBold) |
| Body text / Labels / UI    | `DM Sans`        | 400 (Regular)  |
| Body emphasis              | `DM Sans`        | 500 (Medium)   |
| Code / Monospace           | `JetBrains Mono` | 400            |

### Mode

- **Light Mode Only** (v1). No dark mode toggle. The UI is designed as a clean, professional developer tool.

### Layout Style

- **Clean precision tool aesthetic** directly per `DESIGN.md`: Soft White (`#F5F5F6`) canvas, White (`#FFFFFF`) card surfaces, Nero Blue (`#053B84`) for all CTAs and active states.
- Spacing base unit: **8px**. All padding/margin values are multiples of 8 (8, 12, 16, 24, 32, 48, 64px).
- Cards: `background: #FFFFFF`, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px–12px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.05)`.
- Buttons: Primary = Nero Blue bg + White text + `box-shadow: 0px 2px 4px rgba(5,59,132,0.2)` + `border-radius: 8px`.
- Inputs: White bg, `border: 1px solid rgba(10,10,10,0.15)`, `border-radius: 8px`, `padding: 12px 16px`, focus = `2px solid #053B84`.
- Micro-animations: fade + slide-up for panel entries (150ms ease-out). No heavy or warm shadows.

---

## 4. Functional Requirements

### F1 — Extension Surfaces

- **Popup** (320×480px): Quick access hub — inspector toggle, credit balance, open side panel button, auth state.
- **Side Panel** (400px min-width, full browser height): Primary workspace for all extraction, sandbox, history, and design system features.
- **Content Script Overlay**: Injected into the active tab for the Ghost inspector, hover highlights, and selection UI.

### F2 — Authentication UI

- Sign-up form: email + password + confirm password (Zod validation)
- Login form: email + password
- Persistent session state stored in Chrome extension storage (mocked in v1 frontend)
- Logged-out state: Auth gate in popup and side panel

### F3 — Inspector

- Keyboard shortcut `Ctrl+Shift+X` activates inspector mode
- Ghost overlay: `#053B84` 2px border + `rgba(5,59,132,0.12)` fill highlight on hover
- Arrow-key DOM tree navigation (parent/child traversal)
- ARIA badge: floating chip showing captured `role`, `aria-expanded`, `data-state` values
- Click to confirm selection

### F4 — Extraction Flow

- One-click extraction trigger after selection confirmation
- Progress indicator: 3-step stepper (Capturing → Normalizing → Synthesizing)
- JSON Blueprint preview (collapsible `<details>` tree)
- Error states: Shadow DOM, CORS, LLM timeout — each with a specific, actionable message

### F5 — Sandpack Sandbox

- Auto-renders generated component on extraction success
- Pre-configured with `react-ts` + Tailwind + Shadcn/Radix + Framer Motion
- Live code editor (Monaco via Sandpack)
- Copy-to-clipboard + Download as `.tsx` buttons

### F6 — Prompt Generator

- Framework selector: React/Shadcn | React/Tailwind | Raw HTML/CSS
- Formatted Markdown prompt display
- One-click copy to clipboard

### F7 — Design System Viewer

- "Theme Scan" trigger in side panel
- Color palette grid (with semantic role labels)
- Typography scale table
- Spacing system swatches
- Inline `DESIGN.md` viewer
- Download `DESIGN.md` + `tailwind.config.js` buttons

### F8 — Extraction History

- Scrollable list: thumbnail + source URL + timestamp
- Re-open in sandbox action
- Delete action (with confirmation)
- Empty state illustration

### F9 — Credit & Billing UI

- Credit balance badge in popup header and side panel header
- Low-credit warning banner (< 5 credits)
- Credit pack selector (50 / 100 / 200)
- Stripe Checkout trigger (mocked in frontend)
- Transaction history table

### F10 — Onboarding

- First-time user: tooltip sequence (5 steps) overlaid on the side panel
- Steps: Inspector → Extract → Sandbox → Prompt → History
- Progress dots + Skip button

### F11 — Landing Page

- Hero: headline + subheadline + CTA (join waitlist) + demo video placeholder
- Features grid: 6 feature cards
- How It Works: 3-step visual flow
- Pricing/Credits section
- Social proof / waitlist count
- Footer

---

## 5. Success Metrics

| Metric                                   | Target      |
| ---------------------------------------- | ----------- |
| Extraction → sandbox render success rate | ≥ 80%       |
| Mean time: selection → sandbox render    | < 8 seconds |
| Credit-to-paid conversion rate           | ≥ 15%       |
| Credit churn (zero-balance abandonment)  | < 40%       |
| Waitlist sign-ups in first 2 weeks       | ≥ 500       |
