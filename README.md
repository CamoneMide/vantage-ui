# VantageUI

> **Extract any UI component from any live website. Ship production-ready React/Tailwind/Shadcn code in seconds.**

VantageUI is a Chrome extension that acts as a precision extraction bridge between any live website and a developer's local React codebase. It captures what screenshots and raw copy-paste cannot — computed styles, animation curves, ARIA states, and design tokens — then synthesizes them into idiomatic, production-ready component code.

---

## 📋 Planning Documents

All planning artifacts live in [`plans/vantage-ui/`](./plans/vantage-ui/).

| Document                                                  | Description                                                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [01_PRD.md](./plans/vantage-ui/01_PRD.md)                 | Product Requirements — vision, personas, design constraints, functional requirements         |
| [02_TECH_SPEC.md](./plans/vantage-ui/02_TECH_SPEC.md)     | Technical Specification — stack, Tailwind config, component architecture, mock data strategy |
| [03_PHASED_PLAN.md](./plans/vantage-ui/03_PHASED_PLAN.md) | Execution Roadmap — 15 phases with dependency graph and milestones                           |

### 📂 Phase Task Files

| Phase | File                                                | Focus                                                               |
| ----- | --------------------------------------------------- | ------------------------------------------------------------------- |
| 1     | [PHASE_1.md](./plans/vantage-ui/tasks/PHASE_1.md)   | pnpm monorepo setup, ESLint, Prettier, Vitest, TypeScript           |
| 2     | [PHASE_2.md](./plans/vantage-ui/tasks/PHASE_2.md)   | Plasmo MV3 Chrome Extension scaffold                                |
| 3     | [PHASE_3.md](./plans/vantage-ui/tasks/PHASE_3.md)   | Shared design system package (Tailwind tokens, Shadcn, fonts)       |
| 4     | [PHASE_4.md](./plans/vantage-ui/tasks/PHASE_4.md)   | Extension Popup UI                                                  |
| 5     | [PHASE_5.md](./plans/vantage-ui/tasks/PHASE_5.md)   | Side Panel shell & navigation                                       |
| 6     | [PHASE_6.md](./plans/vantage-ui/tasks/PHASE_6.md)   | Auth UI — Login & Signup forms (Zod validation)                     |
| 7     | [PHASE_7.md](./plans/vantage-ui/tasks/PHASE_7.md)   | Inspector content script — Ghost overlay, ARIA badge, DOM traversal |
| 8     | [PHASE_8.md](./plans/vantage-ui/tasks/PHASE_8.md)   | Extraction Flow UI — all 5 states                                   |
| 9     | [PHASE_9.md](./plans/vantage-ui/tasks/PHASE_9.md)   | Sandpack Sandbox integration                                        |
| 10    | [PHASE_10.md](./plans/vantage-ui/tasks/PHASE_10.md) | Prompt Generator                                                    |
| 11    | [PHASE_11.md](./plans/vantage-ui/tasks/PHASE_11.md) | Design System Viewer & Theme Scan                                   |
| 12    | [PHASE_12.md](./plans/vantage-ui/tasks/PHASE_12.md) | Extraction History                                                  |
| 13    | [PHASE_13.md](./plans/vantage-ui/tasks/PHASE_13.md) | Credits & Billing UI                                                |
| 14    | [PHASE_14.md](./plans/vantage-ui/tasks/PHASE_14.md) | Onboarding tooltip sequence                                         |
| 15    | [PHASE_15.md](./plans/vantage-ui/tasks/PHASE_15.md) | Marketing Landing Page (Next.js)                                    |

---

## 🎨 Design System

All UI decisions are documented in [`DESIGN.md`](./DESIGN.md).

| Token             | Value                  |
| ----------------- | ---------------------- |
| Canvas Background | `#F5F5F6` (Soft White) |
| Card Surface      | `#FFFFFF` (White)      |
| Primary Text      | `#0A0A0A` (Deep Black) |
| Brand / CTA       | `#053B84` (Nero Blue)  |
| Secondary Text    | `rgba(10,10,10,0.6)`   |
| Card Border       | `rgba(10,10,10,0.08)`  |

**Fonts:** `Outfit` (headings, 600/700) · `DM Sans` (body/UI, 400/500) · `JetBrains Mono` (code)

---

## 🏗️ Tech Stack

| Layer               | Technology                                                      |
| ------------------- | --------------------------------------------------------------- |
| Extension Framework | [Plasmo](https://docs.plasmo.com/) (MV3, React, TypeScript)     |
| Styling             | Tailwind CSS + Shadcn/ui + Framer Motion                        |
| Sandbox             | [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/) |
| State Management    | Zustand + chrome.storage.local                                  |
| Validation          | Zod                                                             |
| Testing             | Vitest + Testing Library                                        |
| Landing Page        | Next.js 15 (App Router)                                         |
| Package Manager     | pnpm (monorepo)                                                 |

---

## 📁 Monorepo Structure

```
vantage-ui/
├── apps/
│   ├── extension/          # Plasmo Chrome Extension (popup + sidepanel + content scripts)
│   └── landing/            # Next.js marketing landing page
├── packages/
│   └── ui/                 # Shared design system (Tailwind config, Shadcn components)
├── plans/
│   └── vantage-ui/         # Planning documents and phase task files
├── DESIGN.md               # Design system specification
├── NewVantageUI_PRD.md     # Original product requirements document
└── .env.example            # Environment variable template
```

> **Note:** The `apps/` and `packages/` directories are created in **Phase 1**. The repo currently contains only planning and design documents.

---

## ⚙️ Local Development

> Setup instructions will be added after **Phase 1** is complete.

```bash
# Install dependencies (run from root)
pnpm install

# Start the extension dev server
pnpm dev:extension

# Start the landing page dev server
pnpm dev:landing

# Run all tests
pnpm test

# Lint
pnpm lint
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

> **Never commit `.env.local` or any file containing real secrets.**

---

## 🔄 Development Workflow

This project follows a **phase-by-phase, frontend-first** approach:

1. **Read the phase task file** before starting any code (e.g., `plans/vantage-ui/tasks/PHASE_1.md`).
2. **Complete every task** in the phase, including the verification step for each.
3. **Run the full test suite** (`pnpm test`) before marking a phase complete.
4. **Get team sign-off** on the phase before starting the next one.
5. **Mock all backend interactions** — no real API calls until the backend phase begins.

> Phases must be completed in order. Each phase lists its dependencies at the top of its task file.

---

## 📜 Legal

All extracted components and downloaded files must include the following attribution comment (enforced in the extension):

```tsx
// Component extracted from: [source URL] on [date] using VantageUI.
// This code is for educational and inspirational purposes.
// Ensure compliance with the source site's Terms of Service before use in production.
```

---

## 🗺️ Roadmap

| Version          | Scope                                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| **v1 (current)** | Chrome extension · React/Tailwind/Shadcn output · Pay-as-you-go credits · Sandpack sandbox · Prompt Generator        |
| v2               | Firefox support · Multi-component batch export · CLI (`npx vantage add`) · Subscription billing · Visual Diff Engine |
