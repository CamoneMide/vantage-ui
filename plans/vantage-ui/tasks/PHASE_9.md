# PHASE 9 — Sandpack Sandbox Integration

**Goal:** Embed a fully functional live code sandbox in the side panel — live editor, preview pane, copy/download actions.  
**Depends On:** Phase 8  
**Unblocks:** Phase 10

---

- [ ] **Install Sandpack**: Add the `@codesandbox/sandpack-react` dependency.
  - **Details:** Inside `apps/extension`: `pnpm add @codesandbox/sandpack-react`. After install, run `pnpm audit` and report any high-severity vulnerabilities before proceeding. Add to `package.json` as a direct dependency.
  - **Verification:** `pnpm audit` reports 0 high vulnerabilities. `import { SandpackProvider } from '@codesandbox/sandpack-react'` resolves without TypeScript errors.

- [ ] **Build `SandpackContainer` component**: Core Sandpack integration wrapper.
  - **Details:** Wrap with `<SandpackProvider>` configured as:
    - `template: 'react-ts'`
    - `customSetup.dependencies`: `{ "tailwindcss": "latest", "clsx": "latest", "tailwind-merge": "latest", "framer-motion": "latest", "class-variance-authority": "latest" }`
    - `files`: Dynamically populated from `extractionSlice.generatedCode`. File path: `/App.tsx`. Add a minimal `index.css` with Tailwind directives. Add a `tailwind.config.js` with the VantageUI token set.
    - `options.autorun: true`
      Props: `code: string` (the generated component TSX). On `code` prop change, update the Sandpack files via `useSandpack()` hook `updateFile()`. Add JSDoc.
  - **Verification:** Sandpack renders with the mock generated component. The preview pane shows the component rendered visually. Changing the `code` prop updates the editor and preview.

- [ ] **Configure Sandpack editor styling**: Apply DESIGN.md aesthetics to the editor and preview panes.
  - **Details:** Use `<SandpackCodeEditor>` with:
    - `theme`: Use `'light'` theme (Sandpack built-in). Customize the editor wrapper to have: `background: #FFFFFF`, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`, `font-family: 'JetBrains Mono'`, `font-size: 13px`.
    - `showLineNumbers: true`
    - `showInlineErrors: true`
      Use `<SandpackPreview>` with `showNavigator: false`, `showRefreshButton: true`. Preview wrapper: `background: #F5F5F6`, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`.
      Use `<SandpackLayout>` to place editor (60% height) above preview (40% height) in a vertical stack within the side panel's available space.
  - **Verification:** Editor and preview are both visible in the side panel without overflow. Editor uses JetBrains Mono. Preview pane has Soft White background.

- [ ] **Build `SandpackToolbar` component**: Action bar above the sandbox.
  - **Details:** Horizontal bar: `background: #FFFFFF`, `border-bottom: 1px solid rgba(10,10,10,0.08)`, `padding: 10px 16px`, flex row, space-between. Left: "Sandbox" label in Outfit SemiBold 14px, Deep Black. Right: two action buttons:
    - **Copy Code** button: secondary style (White bg, `rgba(10,10,10,0.1)` border, 8px radius). Copy icon + "Copy Code" text. On click: reads current editor content from `useSandpack().sandpack.files['/App.tsx'].code`, copies to clipboard via `navigator.clipboard.writeText()`. Shows "Copied!" text for 2 seconds (swap label, green color), then reverts.
    - **Download .tsx** button: secondary style. Download icon + ".tsx" text. On click: creates a `Blob` with the editor content, triggers a download as `VantageUI-Component.tsx`. Includes the legal attribution comment at the top of the file: `// Component extracted from: [sourceUrl] on [date] using VantageUI.`
  - **Verification:** Copy button correctly copies current editor content (verify by pasting). "Copied!" label shows for 2 seconds. Download button triggers a `.tsx` file download. Downloaded file contains the attribution comment at the top.

- [ ] **Implement live-edit-to-preview updates**: Ensure Sandpack preview updates as user edits.
  - **Details:** This is handled natively by Sandpack's `autorun` feature. Verify the default configuration allows real-time updates. Add a 300ms debounce to the `updateFile()` call when the parent `code` prop changes (avoid UI jank on large component updates). Use `useMemo` on the `files` object passed to `SandpackProvider` to prevent unnecessary re-mounts.
  - **Verification:** Editing the component code in the editor (e.g., changing a button label) updates the preview within ~500ms without a full sandbox reload.

- [ ] **Connect Sandpack to extraction result**: Wire the generated code into the sandbox.
  - **Details:** In `ExtractionSuccessState` (Phase 8), the "Open in Sandbox" button should set a `sandpackView: true` flag in the extraction slice. `ExtractTab.tsx` reads this flag and renders `<SandpackContainer code={extractionSlice.generatedCode} />` below (or instead of) the success state card. Implement a "← Back to Results" ghost link above the sandbox to return to the extraction success view.
  - **Verification:** After mock extraction, clicking "Open in Sandbox" renders the Sandpack container with the mock component. "← Back to Results" returns to the extraction success card.

- [ ] **Add loading state for Sandpack initialization**: Sandpack takes a moment to initialize the sandbox iframe.
  - **Details:** Use the `useSandpack()` hook's `sandpack.status` (check for `'running'` vs `'initial'` / `'loading'`). While loading: show a skeleton placeholder matching the sandbox dimensions — two rounded rectangles (editor + preview) with a shimmer animation (`background: linear-gradient(90deg, #F5F5F6 25%, #EBEBED 50%, #F5F5F6 75%)`, animated 1.5s). Show "Initializing sandbox…" DM Sans 13px `rgba(10,10,10,0.6)` below the skeleton.
  - **Verification:** When `SandpackContainer` first mounts, the skeleton is visible. Once Sandpack's status reaches `'running'`, the skeleton is replaced by the actual editor/preview.
