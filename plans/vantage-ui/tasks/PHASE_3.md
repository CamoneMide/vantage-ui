# PHASE 3 — Design System Package

**Goal:** Create the shared `packages/ui` package with the complete VantageUI design system.  
**Depends On:** Phase 2  
**Unblocks:** Phase 4, Phase 5, Phase 7, Phase 15

---

- [x] **Initialize `packages/ui` package**: Set up the package manifest and TypeScript config.
  - **Details:** Create `packages/ui/package.json` with `"name": "@vantage-ui/ui"`, `"main": "src/index.ts"`. Create `packages/ui/tsconfig.json` extending `../../tsconfig.base.json`. Add `@vantage-ui/ui` as a workspace dependency in both `apps/extension` and `apps/landing` `package.json` files.
  - **Verification:** `pnpm install` resolves the workspace dependency; importing from `@vantage-ui/ui` in the extension `popup.tsx` does not throw a module resolution error.

- [x] **Configure Tailwind CSS with VantageUI tokens**: Create the custom Tailwind config.
  - **Details:** Install `tailwindcss`, `postcss`, `autoprefixer` in `packages/ui`. Create `tailwind.config.ts` with the full token set from `02_TECH_SPEC.md` (colors, fontFamily, borderRadius, boxShadow, animation, keyframes). Export this config for consumption by both `apps/extension` and `apps/landing`. Each app's own `tailwind.config.ts` should spread/extend from this shared config.
  - **Verification:** A test HTML file with `class="bg-primary text-primary-foreground"` renders with `#053B84` background and white text.

- [x] **Set up global CSS base styles**: Create `packages/ui/src/globals.css`.
  - **Details:** Use `@layer base` to declare all `--color-*` CSS custom properties on `:root`. Apply `font-family: 'DM Sans', sans-serif` to `body`. Apply `font-family: 'Outfit', sans-serif` to `h1, h2, h3, h4`. Apply `font-family: 'JetBrains Mono', monospace` to `code, pre`. Set `box-sizing: border-box` globally.
  - **Verification:** Importing `globals.css` and inspecting `:root` in DevTools shows all `--color-*` custom properties. Headings render in Outfit; body text in DM Sans.

- [x] **Load fonts**: Configure Outfit, DM Sans, and JetBrains Mono.
  - **Details:** For the extension: use CSS `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap')` in `globals.css`. For the landing page (Phase 15): use `next/font/google`. Document both approaches in a comment in `globals.css`.
  - **Verification:** In the loaded extension, DevTools shows Outfit rendering on headings and DM Sans on body text (not system fonts).

- [x] **Initialize Shadcn/ui**: Run the Shadcn CLI and configure components.
  - **Details:** Run `npx shadcn@latest init` inside `packages/ui` (or inside `apps/extension` — follow Shadcn's monorepo guide). Set base color to neutral, CSS variables enabled. Add the following components: `button`, `input`, `badge`, `tooltip`, `dialog`, `tabs`, `card`, `separator`, `toast`, `progress`, `avatar`, `popover`, `dropdown-menu`, `sheet`.
  - **Verification:** `components/ui/button.tsx` (or equivalent path) exists and exports a `Button` component. Importing and rendering `<Button>Button</Button>` in the popup displays a styled button.

- [x] **Apply VantageUI theme overrides to Shadcn**: Ensure Shadcn uses VantageUI tokens.
  - **Details:** Edit the generated `globals.css` Shadcn CSS variables section. Map: `--primary` → `#053B84`, `--primary-foreground` → `#FFFFFF`, `--background` → `#FFFFFF`, `--foreground` → `#0A0A0A`, `--muted` → `#F4F4F5`, `--muted-foreground` → `#71717A`, `--border` → `#E4E4E7`, `--destructive` → `#DC2626`, `--radius` → `6px`.
  - **Verification:** Rendering `<Button>Primary</Button>` shows a `#053B84` background button. Rendering `<Button variant="destructive">Delete</Button>` shows a `#DC2626` button.

- [x] **Create `packages/ui/src/index.ts`**: Central export barrel.
  - **Details:** Re-export all Shadcn components plus any custom VantageUI primitives (to be added in future phases). Export the Tailwind config as `tailwindConfig`.
  - **Verification:** `import { Button, tailwindConfig } from '@vantage-ui/ui'` resolves without TypeScript errors.

- [x] **Create `CreditBadge` primitive**: A reusable credit balance badge used across popup and side panel.
  - **Details:** Props: `balance: number`, `size?: 'sm' | 'md'`. Renders: Zap icon + balance number. Color: `#053B84` text + `#EFF4FF` background (light blue tint). If `balance < 5`: renders in `#DC2626` red. Add JSDoc. Add a unit test for the `< 5` color logic.
  - **Verification:** Renders correctly at `balance=10` (blue) and `balance=3` (red). Unit test passes.

- [x] **Create `StepperProgress` primitive**: Used in the extraction flow (Phase 8).
  - **Details:** Props: `steps: string[]`, `currentStep: number`. Renders: horizontal stepper with step labels and a connecting progress line. Active step: `#053B84` filled circle. Completed: checkmark. Future: `#E4E4E7` outline. Add JSDoc.
  - **Verification:** Rendering with `currentStep=1` of 3 shows first step as completed, second as active, third as upcoming.
