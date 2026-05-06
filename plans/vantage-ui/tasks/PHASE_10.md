# PHASE 10 — Prompt Generator UI

**Goal:** Build the Prompt Generator panel as a secondary view within the Extract tab — framework selector, formatted prompt display, and clipboard copy.  
**Depends On:** Phase 8  
**Unblocks:** Phase 14 (onboarding references this panel)

---

- [ ] **Create mock prompt fixtures**: Define typed prompt content for all three framework targets.
  - **Details:** Create `src/mocks/prompts.mock.ts`. Export `mockPrompts: Record<'shadcn' | 'tailwind' | 'html', string>`. Each value is a realistic multi-section Markdown string (~30 lines) that includes: a Component Overview section, Visual States section, Extracted Styles section (with example values from `mockJsonBlueprint`), ARIA Attributes section, Animations section, and a "Generate this component" instruction tailored to the target framework.
  - **Verification:** `import { mockPrompts } from '@/mocks/prompts.mock'` resolves. Each mock string is a valid multi-line Markdown string containing all required sections.

- [ ] **Build `FrameworkSelector` component**: Segmented control for selecting the target framework.
  - **Details:** A 3-segment pill control (not Shadcn `<Tabs>` — custom segmented control for a tighter look): `background: #F5F5F6`, `border-radius: 8px`, `padding: 4px`. Each segment: "React / Shadcn" | "React / Tailwind" | "Raw HTML". Selected segment: `background: #FFFFFF`, `box-shadow: 0px 1px 3px rgba(0,0,0,0.08)`, `border-radius: 6px`, `color: #053B84`, DM Sans Medium 13px. Unselected: `color: rgba(10,10,10,0.6)`, DM Sans Regular 13px. Smooth transition on segment switch (100ms). Props: `value`, `onChange`. Add JSDoc.
  - **Verification:** Clicking each segment visually updates the active selection. Transition is smooth. Component is reusable (accepts `value` and `onChange` as controlled props).

- [ ] **Build `PromptDisplay` component**: Formatted, scrollable Markdown prompt panel.
  - **Details:** Install `react-markdown` and `rehype-highlight` (for syntax highlighting). White card (`background: #FFFFFF`, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`). Render the active framework's mock prompt as formatted Markdown inside `<ReactMarkdown>` with `rehype-highlight`. Styling inside the card:
    - Headings: Outfit SemiBold, Deep Black.
    - Body: DM Sans 14px, `rgba(10,10,10,0.8)`.
    - Code blocks: `background: #F5F5F6`, `font-family: JetBrains Mono`, `font-size: 12px`, `border-radius: 6px`, `padding: 12px`.
    Max height: 320px with `overflow-y: auto`. Custom scrollbar styling (thin, Nero Blue thumb).
    Animate content change on framework switch: `opacity: 0 → 1` over 150ms.
  - **Verification:** Prompt renders as formatted Markdown. Code blocks are styled correctly. Switching frameworks animates the content change. Scrollbar appears and is styled when content overflows.

- [ ] **Build `PromptGeneratorPanel` composite component**: Assembles the full Prompt Generator view.
  - **Details:** Layout: White card container, `padding: 20px`. Top section:
    - "Prompt Generator" heading (Outfit SemiBold 16px, Deep Black) + description "Copy this prompt into Claude, GPT-4o, or v0.dev." (DM Sans 13px, `rgba(10,10,10,0.6)`).
    - `<FrameworkSelector>` below.
  - Middle: `<PromptDisplay>` with the prompt for the selected framework.
  - Bottom: "Copy Prompt" primary button (Nero Blue, full-width, Clipboard icon). On click: copies the raw Markdown string (not the rendered HTML) to clipboard. Shows "Prompt Copied!" confirmation for 2 seconds (swap icon to CheckCircle, text turns `#16A34A`).
  - Add JSDoc.
  - **Verification:** All three sections render correctly. "Copy Prompt" copies the correct framework-specific Markdown. Confirmation state reverts after 2 seconds.

- [ ] **Wire Prompt Generator into Extract tab**: Add it as a switchable view after extraction.
  - **Details:** In `ExtractionSuccessState` (Phase 8), the "Generate Prompt" button sets `promptView: true` in the extraction slice. In `ExtractTab.tsx`: when `promptView` is true, render `<PromptGeneratorPanel>` below (or replacing) the success card. Add a "← Back to Results" ghost link above the generator. Both "Open in Sandbox" and "Generate Prompt" can be active simultaneously (Sandbox and Prompt views are sub-panels under the success state, not mutually exclusive) — add a local `view: 'results' | 'sandbox' | 'prompt'` state to manage which sub-view is shown.
  - **Verification:** After mock extraction, clicking "Generate Prompt" shows the `PromptGeneratorPanel`. Clicking "Open in Sandbox" shows the Sandpack. "← Back to Results" always returns to the extraction success card.

- [ ] **Add unit test for `FrameworkSelector`**: Ensure controlled component behavior.
  - **Details:** In `src/components/prompt/__tests__/FrameworkSelector.test.tsx`: Render `<FrameworkSelector value="shadcn" onChange={mockFn} />`. Assert: "React / Shadcn" has the active class. Click "React / Tailwind" segment → assert `onChange` was called with `'tailwind'`. Assert that `value` alone controls the active state (controlled component contract). `pnpm test` → green.
  - **Verification:** All 3 assertions pass without warnings.
