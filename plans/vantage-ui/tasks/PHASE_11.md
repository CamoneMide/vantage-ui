# PHASE 11 — Design System Viewer

**Goal:** Build the Design tab — Theme Scan trigger, animated results (colors, typography, spacing), inline DESIGN.md viewer, and download actions.  
**Depends On:** Phase 5  
**Unblocks:** Phase 14

---

- [x] **Create mock design system fixtures**: Typed mock data for the Theme Scan results.
  - **Details:** Create `src/mocks/design-system.mock.ts`. Export:
    - `mockColorPalette: { hex: string; role: string; name: string }[]` — 8 colors: Primary, Background, Surface, Text Primary, Text Secondary, Border, Success, Destructive.
    - `mockTypographyScale: { role: string; family: string; size: string; weight: string; lineHeight: string }[]` — 7 rows matching the DESIGN.md type table.
    - `mockSpacingSystem: number[]` — `[4, 8, 12, 16, 24, 32, 48, 64]`
    - `mockDesignMd: string` — a multi-section Markdown string that simulates a generated `DESIGN.md` (can reuse content from the actual `DESIGN.md` file in this repo).
    - `mockTailwindConfig: string` — a JS string of the `tailwind.config.js` generated from the scanned tokens.
  - **Verification:** All exports are importable. `mockColorPalette` has exactly 8 items. `mockSpacingSystem` has 8 values. Zod schemas for each shape pass validation in a unit test.

- [x] **Create Zustand design system slice**: State management for Theme Scan.
  - **Details:** Create `src/store/designSystemSlice.ts`. State: `{ scanStatus: 'idle' | 'scanning' | 'complete', colorPalette, typographyScale, spacingSystem, designMd, tailwindConfig }`. Actions: `startScan()`, `setScanResults(results)`, `resetScan()`. `startScan()` transitions to `'scanning'`, then after a simulated 2500ms delay (in the mock scan function, not the action), calls `setScanResults()`. Add JSDoc.
  - **Verification:** Unit test: `startScan()` sets status to `'scanning'`. `setScanResults()` sets status to `'complete'` and populates all result fields. `pnpm test` → green.

- [x] **Build `DesignTabIdleState` component**: Shown before a scan is triggered.
  - **Details:** White card, `border-radius: 12px`, `padding: 32px`. Centered: a Palette icon (32px, Nero Blue) + "Design System Scanner" heading (Outfit SemiBold 18px) + description "Analyze any website's colors, typography, and spacing tokens in one click." (DM Sans 14px, `rgba(10,10,10,0.6)`). Below: "Run Theme Scan" primary button (Nero Blue, icon: ScanLine). Below button: a note in DM Sans 12px `rgba(10,10,10,0.6)`: "Scans the current tab's computed styles."
  - **Verification:** Renders correctly when `scanStatus === 'idle'`. Button is centered. Description text is secondary color.

- [x] **Build `DesignTabScanningState` component**: Animated progress indicator while scanning.
  - **Details:** White card, same padding. Centered: ScanLine icon animating with a `spin` animation (360° every 2s). Below: "Scanning design tokens…" in DM Sans 14px `rgba(10,10,10,0.6)`. Below: an indeterminate `<Progress>` bar (Nero Blue, `border-radius: 4px`, `height: 4px`) animating continuously. Scanning state lasts ~2500ms (mock delay).
  - **Verification:** Scanning state renders with spinning icon and progress bar. Automatically transitions to results state after ~2500ms.

- [x] **Build `ColorPaletteGrid` component**: Displays extracted color swatches.
  - **Details:** Section heading: "Colors" (Outfit SemiBold 14px, Deep Black) + section separator. 4-column grid. Each swatch card: colored circle (32px diameter) + `name` in DM Sans 13px Medium + `hex` in DM Sans 11px `rgba(10,10,10,0.6)` + `role` badge (small pill, Soft White bg, 12px, `rgba(10,10,10,0.6)` text). On hover: show a "Copy hex" tooltip (Shadcn `<Tooltip>`). On click: copy hex to clipboard. Add JSDoc.
  - **Verification:** Grid renders 8 color swatches from mock data. Hover shows tooltip. Clicking a swatch copies the hex value to clipboard.

- [x] **Build `TypographyScaleTable` component**: Displays extracted typography rules.
  - **Details:** Section heading: "Typography". A responsive table (Shadcn `<Table>` or plain `<table>` with DESIGN.md styling): columns: Role | Family | Size | Weight | Line Height. Rows styled in DM Sans 13px. Header row: `background: #F5F5F6`, DM Sans 12px Medium `rgba(10,10,10,0.6)`. Alternating row background (white / soft white). Font family values shown in `JetBrains Mono` 12px.
  - **Verification:** Table renders all 7 mock rows. Headers are styled correctly. Font family column uses monospace.

- [x] **Build `SpacingSystem` component**: Displays spacing scale visually.
  - **Details:** Section heading: "Spacing". A horizontal scrollable row. Each spacing swatch: a Nero Blue rectangle (`height: 8px`, `border-radius: 2px`) with width equal to the spacing value (e.g., 4px spacing → 4px wide bar), scaled for visibility (multiply by 2 for readability). Below each bar: the pixel value in DM Sans 11px `rgba(10,10,10,0.6)`. Show all 8 values from `mockSpacingSystem`.
  - **Verification:** 8 spacing swatches render. Bar widths are visually distinct and proportional. Labels show correct pixel values.

- [x] **Build `DesignMdViewer` component**: Inline Markdown viewer for the generated DESIGN.md.
  - **Details:** Section heading: "Design Docs". White card, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`, `max-height: 280px`, `overflow-y: auto`. Use `react-markdown` (already installed from Phase 10) to render `mockDesignMd`. Apply the same Markdown styling as `PromptDisplay` (Phase 10). Custom thin scrollbar (Nero Blue thumb).
  - **Verification:** DESIGN.md content renders as formatted Markdown. Section is scrollable. Headings and code blocks are styled correctly.

- [x] **Build download action buttons**: File downloads for DESIGN.md and tailwind.config.js.
  - **Details:** Two secondary buttons side by side: "↓ DESIGN.md" and "↓ tailwind.config.js". On "↓ DESIGN.md" click: create a `Blob` from `mockDesignMd` (type `text/markdown`), trigger download as `DESIGN.md`. On "↓ tailwind.config.js" click: create a `Blob` from `mockTailwindConfig` (type `text/javascript`), trigger download as `tailwind.config.js`. Both show a brief "Downloading…" loading indicator (spinner on button icon) for 300ms.
  - **Verification:** Clicking each download button triggers the browser download prompt with the correct filename. Downloaded files contain the expected content.

- [x] **Assemble `DesignTab` and wire into `DesignTab.tsx`**: Replace placeholder from Phase 5.
  - **Details:** Conditionally render: idle state, scanning state, or results state (ColorPaletteGrid + TypographyScaleTable + SpacingSystem + DesignMdViewer + download buttons) based on `scanStatus`. Animate transition from scanning to results: `animate-fade-up`. Add a "Re-scan" ghost button in the results header.
  - **Verification:** Full Design tab flow works: idle → scan button → scanning animation → results with all 3 sections + viewer + downloads. Re-scan button resets to scanning state.
