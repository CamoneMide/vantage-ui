# 02 — Technical Specification: VantageUI (Frontend Only)

**Status:** Approved — Planning Phase  
**Scope:** Frontend implementation only. Backend (Supabase, Stripe, Vercel API routes) is NOT covered here.

---

## 1. Architecture Overview

VantageUI's frontend is composed of **three distinct React apps** that share a common design system and component library but run in different browser contexts:

```
vantage-ui/
├── extension/               # Plasmo MV3 Chrome Extension
│   ├── popup/               # Compact popup (320×480px)
│   ├── sidepanel/           # Full Chrome Side Panel app
│   └── contents/            # Content scripts (Inspector overlay)
├── landing/                 # Marketing landing page (Next.js)
└── packages/
    └── ui/                  # Shared design system (tokens, components)
```

### Context Boundaries

| Surface        | React Renderer           | DOM Access       | Chrome APIs                                         |
| -------------- | ------------------------ | ---------------- | --------------------------------------------------- |
| Popup          | Extension popup          | None (sandboxed) | `chrome.storage`, `chrome.tabs`                     |
| Side Panel     | Extension sidepanel      | None (sandboxed) | `chrome.storage`, `chrome.tabs`, `chrome.sidePanel` |
| Content Script | Injected into active tab | Full DOM access  | `chrome.runtime.sendMessage`                        |
| Landing Page   | Next.js (SSR/SSG)        | N/A              | N/A                                                 |

---

## 2. Tech Stack

### Core

| Tool           | Version | Purpose                                                 |
| -------------- | ------- | ------------------------------------------------------- |
| **Plasmo**     | Latest  | MV3 Chrome Extension framework (React, TypeScript, HMR) |
| **React**      | 18.x    | UI framework for all extension surfaces                 |
| **TypeScript** | 5.x     | Strict type safety throughout                           |
| **Next.js**    | 15.x    | Landing page (App Router, SSG)                          |

### Styling & Components

| Tool              | Purpose                                                              |
| ----------------- | -------------------------------------------------------------------- |
| **Tailwind CSS**  | Utility-first styling, configured with VantageUI custom tokens       |
| **Shadcn/ui**     | Accessible component primitives (Button, Input, Dialog, Tabs, etc.)  |
| **Radix UI**      | Headless primitives underlying Shadcn (do not use directly)          |
| **Framer Motion** | Micro-animations (panel entries, overlay transitions, toast reveals) |

### Extension-Specific

| Tool                            | Purpose                                                  |
| ------------------------------- | -------------------------------------------------------- |
| **@codesandbox/sandpack-react** | Embedded live code sandbox in the side panel             |
| **@monaco-editor/react**        | Code editor inside Sandpack (via Sandpack's integration) |

### State Management

| Tool                     | Purpose                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| **Zustand**              | Lightweight global state for extension surfaces (auth state, credit balance, extraction results, history) |
| **React Context**        | Local panel-level state (active tab, inspector mode)                                                      |
| **chrome.storage.local** | Persistent state across popup/sidepanel boundary (mocked with localStorage in dev)                        |

### Validation

| Tool    | Purpose                                                    |
| ------- | ---------------------------------------------------------- |
| **Zod** | Schema validation for all form inputs and mock data shapes |

### Fonts

- `Outfit` (700, 600) — loaded via `@next/font/google` on landing, via CSS `@import` in extension
- `DM Sans` (400, 500) — same
- `JetBrains Mono` (400) — for code display in Blueprint viewer and Sandpack

---

## 3. Tailwind Configuration

```js
// tailwind.config.js (shared token definition — sourced from DESIGN.md)
module.exports = {
  theme: {
    extend: {
      colors: {
        // Canvas & surfaces (two-tier: Soft White page → White card)
        canvas: '#F5F5F6', // Soft White — primary page/panel background
        surface: '#FFFFFF', // White — cards, inputs, nav, elevated containers
        // Brand
        primary: {
          DEFAULT: '#053B84', // Nero Blue — CTAs, active states, focus rings
          foreground: '#FFFFFF',
        },
        // Text
        foreground: '#0A0A0A', // Deep Black — primary text
        // Semantic
        success: '#16A34A',
        destructive: '#DC2626',
        // Inspector overlay fill
        overlay: 'rgba(5,59,132,0.12)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'], // Headings
        body: ['DM Sans', 'sans-serif'], // UI & body text
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.10', fontWeight: '600' }], // 64px
        section: ['3.25rem', { lineHeight: '1.20', fontWeight: '600' }], // 52px
        sub: ['2rem', { lineHeight: '1.20', fontWeight: '500' }], // 32px
        'body-lg': ['1.25rem', { lineHeight: '1.60' }], // 20px
        body: ['1rem', { lineHeight: '1.50' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.50' }], // 14px
        label: ['0.75rem', { lineHeight: '1.25', fontWeight: '500' }], // 12px
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px', // Standard: buttons, inputs, cards
        lg: '12px', // Large containers, modals
        xl: '16px',
      },
      boxShadow: {
        // Matches DESIGN.md elevation levels
        'level-1': 'none', // Contained (border only)
        'level-2': '0px 4px 12px rgba(0,0,0,0.05)', // Cards, dropdowns
        'level-3': '0px 8px 24px rgba(0,0,0,0.10)', // Modals, floating panels
        cta: '0px 2px 4px rgba(5,59,132,0.20)', // Primary button shadow
      },
      spacing: {
        // 8px base unit scale from DESIGN.md
        4.5: '18px',
      },
      animation: {
        'fade-up': 'fadeUp 150ms ease-out forwards',
        'fade-in': 'fadeIn 120ms ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
};
```

---

## 4. Frontend Data Handling (Mock Strategy)

All backend interactions are **mocked during the frontend phase** using constants and JSON fixture files. No real API calls are made.

### Mock Data Locations

```
extension/src/
└── mocks/
    ├── auth.mock.ts          # Mocked user session, login/logout handlers
    ├── credits.mock.ts       # Mocked credit balance, transaction history
    ├── extractions.mock.ts   # Mocked extraction results (JSON Blueprint + generated code)
    ├── history.mock.ts       # Mocked extraction history with thumbnail URLs
    └── design-system.mock.ts # Mocked DESIGN.md content and tailwind.config output
```

### Mock Data Shapes (Zod-validated)

```typescript
// Schema for a mocked Extraction Result
const ExtractionResultSchema = z.object({
  id: z.string().uuid(),
  sourceUrl: z.string().url(),
  capturedAt: z.string().datetime(),
  jsonBlueprint: z.record(z.unknown()), // Raw blueprint preview
  generatedCode: z.string(), // The React/TSX component code string
  thumbnailUrl: z.string().url().optional(),
});
```

### Mocked State Machines

| State            | Mock Behavior                                                                 |
| ---------------- | ----------------------------------------------------------------------------- |
| Auth             | Toggle between `authenticated` / `unauthenticated` via a dev toggle in the UI |
| Extraction       | Simulate the 3-step pipeline with a `setTimeout` delay sequence               |
| Credit deduction | Decrement a Zustand-managed counter on each mock extraction                   |
| Stripe checkout  | Show a success toast after 2 seconds when "Purchase" is clicked               |
| Inspector        | Full content script overlay is real DOM manipulation (not mocked)             |

---

## 5. Component Architecture

### Shared UI Package (`packages/ui/`)

All design system primitives live here and are consumed by both the extension and the landing page:

- `Button`, `Input`, `Badge`, `Tooltip`, `Dialog`, `Tabs`, `Card`, `Separator`
- All are Shadcn-based, re-exported with VantageUI theme overrides applied

### Extension Component Structure

```
sidepanel/
└── components/
    ├── layout/
    │   ├── SidePanelShell.tsx      # Root layout, tab navigation
    │   ├── PanelHeader.tsx         # Branding + credit balance
    │   └── PanelNav.tsx            # Tab bar (Extract / History / Design / Settings)
    ├── auth/
    │   ├── LoginForm.tsx
    │   └── SignupForm.tsx
    ├── extraction/
    │   ├── ExtractionTrigger.tsx   # "Extract" button + credit check
    │   ├── ExtractionProgress.tsx  # 3-step stepper
    │   ├── BlueprintViewer.tsx     # Collapsible JSON tree
    │   └── ExtractionError.tsx     # Error states
    ├── sandbox/
    │   ├── SandpackContainer.tsx   # Sandpack wrapper
    │   └── SandpackToolbar.tsx     # Copy + Download actions
    ├── prompt/
    │   ├── PromptGenerator.tsx
    │   └── FrameworkSelector.tsx
    ├── design-system/
    │   ├── ThemeScanButton.tsx
    │   ├── ColorPaletteGrid.tsx
    │   ├── TypographyScale.tsx
    │   └── DesignMdViewer.tsx
    ├── history/
    │   ├── HistoryList.tsx
    │   ├── HistoryItem.tsx
    │   └── HistoryEmpty.tsx
    ├── credits/
    │   ├── CreditBalance.tsx
    │   ├── CreditPackSelector.tsx
    │   └── TransactionHistory.tsx
    └── onboarding/
        ├── OnboardingOverlay.tsx
        └── TooltipStep.tsx
```

---

## 6. Routing & Navigation

### Side Panel Navigation (Tabs)

| Tab      | Icon     | Content                                        |
| -------- | -------- | ---------------------------------------------- |
| Extract  | Sparkles | Extraction flow → Blueprint → Sandbox → Prompt |
| History  | Clock    | Extraction history list                        |
| Design   | Palette  | Theme Scan → Design System Viewer              |
| Credits  | Zap      | Balance, packs, transaction history            |
| Settings | Gear     | (placeholder in v1)                            |

### Extension Popup Navigation

Single-screen popup with:

- Header: VantageUI logo + credit badge
- Inspector toggle button (primary CTA)
- "Open Side Panel" button
- Auth state section (login link or user email)

### Landing Page Routes (Next.js App Router)

| Route       | Content                                           |
| ----------- | ------------------------------------------------- |
| `/`         | Full marketing landing page                       |
| `/waitlist` | Waitlist confirmation page (post-signup redirect) |

---

## 7. Testing Strategy (Frontend)

- **Vitest** for unit tests on utility functions and mock data validators
- **Testing Library** for component tests (form validation, state transitions)
- Every Zod schema must have a passing + failing test case
- Every utility function (mock extraction simulator, credit deduction) must have a unit test
- Manual UI verification checklist per phase (see task files)
