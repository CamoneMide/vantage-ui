# PHASE 8 — Extraction Flow UI

**Goal:** Build the complete extraction workflow in the Extract tab — idle, selected, extracting, success, and all error states.  
**Depends On:** Phase 5, Phase 6  
**Unblocks:** Phase 9, Phase 10

---

- [x] **Create mock extraction fixtures**: Define typed mock data for all extraction states.
  - **Details:** Create `src/mocks/extractions.mock.ts`. Export:
    - `mockSelectedElement`: A `SelectedElementData` object (tag: 'div', classes: ['card', 'feature-card'], ARIA: `{ role: 'article' }`, sourceUrl: 'https://linear.app').
    - `mockJsonBlueprint`: A realistic-looking nested JSON object with keys: `element`, `styles`, `animations`, `assets`, `ariaAttributes`.
    - `mockGeneratedCode`: A full TSX string of a plausible Shadcn React component (Card with heading, body, and a button).
    - `mockExtractionError`: An object with `type: 'shadow-dom' | 'cors' | 'llm-timeout' | 'insufficient-credits'` and `message: string`.
  - **Verification:** `import { mockGeneratedCode } from '@/mocks/extractions.mock'` resolves. Zod schema for `SelectedElementData` validates `mockSelectedElement` without errors (`pnpm test`).

- [x] **Create Zustand extraction slice**: State machine for the extraction pipeline.
  - **Details:** Create `src/store/extractionSlice.ts`. State:
    ```
    type ExtractionStatus = 'idle' | 'element-selected' | 'extracting' | 'success' | 'error'
    type ExtractionStep = 'capturing' | 'normalizing' | 'synthesizing'
    ```
    State fields: `status`, `currentStep`, `selectedElement`, `jsonBlueprint`, `generatedCode`, `error`. Actions: `setSelectedElement(data)`, `startExtraction()`, `setStep(step)`, `setSuccess(blueprint, code)`, `setError(error)`, `reset()`. Add JSDoc to all actions. Export via `useExtractionStore`.
  - **Verification:** Unit test: `startExtraction()` from `element-selected` transitions to `extracting`. `setError()` from `extracting` transitions to `error`. `reset()` returns to `idle`. `pnpm test` → green.

- [x] **Build mock extraction simulator**: Simulates the 3-step pipeline with timed delays.
  - **Details:** Create `src/lib/mockExtraction.ts`. Export `runMockExtraction(store: ExtractionStore): Promise<void>`. Internally:
    1. `store.setStep('capturing')` → await 1200ms
    2. `store.setStep('normalizing')` → await 1000ms
    3. `store.setStep('synthesizing')` → await 1500ms
    4. `store.setSuccess(mockJsonBlueprint, mockGeneratedCode)`
       Add a `shouldFail?: ExtractionError` param — if provided, calls `store.setError(error)` at step 3 instead of success. Export with JSDoc. Write a unit test.
  - **Verification:** Unit test with mocked `setTimeout`: correct actions are called in order with correct delays. `pnpm test` → green.

- [x] **Build `ExtractionIdleState` component**: Shown when no element is selected.
  - **Details:** White card, `border-radius: 12px`, `padding: 32px`, centered content. Illustration area: a dashed Nero Blue border box (`border: 2px dashed rgba(5,59,132,0.3)`, `border-radius: 8px`, `padding: 24px`) containing: a Sparkles icon (32px, Nero Blue) + "No component selected" in Outfit Medium 16px + "Use the inspector to select a component on any page." in DM Sans 14px `rgba(10,10,10,0.6)`. Below the box: keyboard shortcut hint chip "⌘⇧X" (or `Ctrl+Shift+X` on Windows) in a `<kbd>` style.
  - **Verification:** Renders correctly when `status === 'idle'`. Keyboard hint chip visible and styled correctly.

- [x] **Build `ExtractionSelectedState` component**: Shown after an element is selected via the inspector.
  - **Details:** White card, `padding: 20px`. Top: "✓ Component Selected" heading (Outfit SemiBold 16px, Nero Blue) + selected element summary (tag + classes in DM Sans 13px `<code>` style, `background: #F5F5F6`, `padding: 2px 6px`, `border-radius: 4px`). Middle: ARIA attributes list (if any) as small gray chips. Bottom: Two actions: "Extract Component" (primary Nero Blue button, full-width, credit cost shown "— 1 credit") + "Re-select" (ghost button, re-activates inspector). Credit balance displayed below the button: "You have {balance} credits remaining." in DM Sans 12px `rgba(10,10,10,0.6)`.
  - **Verification:** Component summary, ARIA chips, and both buttons render correctly. "Extract Component" button click calls `runMockExtraction()`.

- [x] **Build `ExtractionProgressState` component**: 3-step animated stepper.
  - **Details:** White card, `padding: 24px 20px`. Uses the `<StepperProgress>` primitive from `@vantage-ui/ui`. Steps: `['Capturing DOM', 'Normalizing Blueprint', 'Synthesizing Code']`. `currentStep` mapped from `extractionSlice.currentStep`. Below the stepper: pulsing loading text in DM Sans 14px `rgba(10,10,10,0.6)` — e.g., "Capturing computed styles and animations…". Text changes to match the current step. An indeterminate `<Progress>` bar (Nero Blue, animated) sits below the stepper.
  - **Verification:** All three steps animate in sequence (timed correctly per mock). Descriptive text changes per step. Progress bar animates continuously.

- [x] **Build `ExtractionSuccessState` component**: Shows the Blueprint viewer and transitions to Sandpack.
  - **Details:** White card, `padding: 20px`. Top: "✓ Extraction Complete" (Outfit SemiBold 16px, success green `#16A34A`) + source URL in DM Sans 13px `rgba(10,10,10,0.6)`. Below: collapsible `<details>` section titled "JSON Blueprint" — contains the JSON blueprint rendered in a syntax-highlighted `<pre>` block (JetBrains Mono 12px, Soft White `#F5F5F6` background). Below blueprint: two action buttons:
    - "Open in Sandbox" (primary, full-width) → switches side panel active tab to a Sandbox sub-view within Extract.
    - "Generate Prompt" (secondary) → switches to Prompt Generator sub-view.
  - **Verification:** Blueprint `<details>` collapses and expands. JSON is readable and syntax-highlighted. Both action buttons switch views.

- [x] **Build `ExtractionErrorState` component**: Specific error messages for each failure type.
  - **Details:** White card, `padding: 20px`, `border-left: 3px solid #DC2626`. Icon: AlertTriangle (Destructive red, 24px). Error messages by type:
    - `shadow-dom`: "This component uses Shadow DOM. Try selecting a parent element outside the shadow boundary."
    - `cors`: "This element's resources are cross-origin restricted. Extraction was partially complete."
    - `llm-timeout`: "Synthesis timed out. This can happen with complex components. Please try again."
    - `insufficient-credits`: "You're out of credits. Purchase more to continue extracting."
      Button: "Try Again" (secondary) or "Purchase Credits" (primary Nero Blue) for `insufficient-credits` type.
  - **Verification:** Each error type renders the correct icon, message, and correct action button. "Purchase Credits" navigates to the Credits tab.

- [x] **Wire all states into `ExtractTab`**: Replace the placeholder from Phase 5.
  - **Details:** In `ExtractTab.tsx`, read `status` from `useExtractionStore`. Render the correct sub-component based on `status`. Add a listener for `chrome.runtime.onMessage` with `{ type: 'ELEMENT_SELECTED' }` — on receive, call `store.setSelectedElement(payload)` and switch status to `element-selected`. Handle the `INSPECTOR_DEACTIVATED` message to reset to idle if status was `element-selected`.
  - **Verification:** Full flow works end-to-end: idle → select element (via simulated message) → extract (mock pipeline) → success → open Sandpack.
