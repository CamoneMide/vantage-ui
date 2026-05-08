# PHASE 12 — Extraction History

**Goal:** Build the History tab — scrollable extraction list with thumbnails, timestamps, re-open and delete actions, and a polished empty state.  
**Depends On:** Phase 5, Phase 8  
**Unblocks:** Phase 14

---

- [ ] **Create mock history fixtures**: Define typed history data with realistic entries.
  - **Details:** Create `src/mocks/history.mock.ts`. Export `mockHistory: ExtractionHistoryItem[]` (5 items). Each item:
    ```typescript
    type ExtractionHistoryItem = {
      id: string; // UUID
      sourceUrl: string;
      sourceDomain: string; // e.g. "linear.app"
      elementTag: string; // e.g. "div.card"
      capturedAt: string; // ISO datetime
      thumbnailUrl: string; // Use a placeholder image URL (via picsum.photos)
      generatedCode: string; // TSX string (reuse mockGeneratedCode)
    };
    ```
    Use real-looking URLs (linear.app, stripe.com, vercel.com, shadcn/ui.com, tailwindui.com). Timestamps should be spread across the last 7 days.
  - **Verification:** All 5 items are importable. Zod schema validation passes for all items in a unit test. `pnpm test` → green.

- [ ] **Create Zustand history slice**: State management for extraction history.
  - **Details:** Create `src/store/historySlice.ts`. State: `{ items: ExtractionHistoryItem[] }` — seeded with `mockHistory`. Actions: `addItem(item)`, `removeItem(id)`, `clearAll()`. Also wire into the extraction slice: when `setSuccess()` is called in Phase 8, automatically call `historySlice.addItem()` with the new extraction data. `removeItem` is immutable (uses `.filter()`). Add JSDoc.
  - **Verification:** Unit test: `removeItem(id)` removes only the correct item and does not mutate the original array. `addItem()` prepends the new item (most recent first). `pnpm test` → green.

- [ ] **Build `HistoryEmpty` component**: Empty state for when no extractions exist.
  - **Details:** White card, `border-radius: 12px`, `padding: 48px 32px`, centered content. An abstract dashed-border square (2px dashed `rgba(10,10,10,0.15)`, 80×80px, `border-radius: 12px`) with a Clock icon (24px, `rgba(10,10,10,0.3)`) centered inside. Below: "No extractions yet." in Outfit Medium 16px, Deep Black. Subtext: "Activate the inspector and click any component to extract your first one." in DM Sans 14px `rgba(10,10,10,0.6)`. Below subtext: ghost link "Activate Inspector" that sends `TOGGLE_INSPECTOR` message via Chrome runtime.
  - **Verification:** Renders when `items.length === 0`. "Activate Inspector" link sends the correct Chrome message (logged in background console).

- [ ] **Build `HistoryItem` component**: Single row card in the history list.
  - **Details:** White card, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`, `padding: 12px`, flex row, `gap: 12px`. Layout:
    - Left: Thumbnail image (`56×40px`, `border-radius: 4px`, `object-fit: cover`, `background: #F5F5F6` as placeholder). Use `<img loading="lazy">`.
    - Center (flex-grow): Source domain in DM Sans Medium 13px, Deep Black (e.g., "linear.app"). Element tag in DM Sans 12px `rgba(10,10,10,0.6)` (e.g., "div.card"). Timestamp in DM Sans 11px `rgba(10,10,10,0.4)` (e.g., "2 hours ago" — use `date-fns formatDistanceToNow`).
    - Right: Two icon buttons (no text, 32×32px, ghost style):
      - Re-open: Sparkles icon, Nero Blue on hover.
      - Delete: Trash2 icon, `#DC2626` on hover.
        Add JSDoc. Animate entrance with `animate-fade-up` and a staggered `animation-delay` based on item index (0ms, 50ms, 100ms…).
  - **Verification:** Item renders with all 3 zones. Thumbnail loads from picsum URL. Timestamp shows relative time. Hover states on action icons are correct colors.

- [ ] **Install `date-fns` for timestamp formatting**: Required for `formatDistanceToNow`.
  - **Details:** `pnpm add date-fns` inside `apps/extension`. Run `pnpm audit` and report any high-severity vulnerabilities. Use `formatDistanceToNow(new Date(item.capturedAt), { addSuffix: true })` to produce e.g. "3 hours ago".
  - **Verification:** `pnpm audit` reports 0 high vulnerabilities. "3 hours ago" format appears correctly on history items.

- [ ] **Build delete confirmation popover**: Prevents accidental deletion.
  - **Details:** Use Shadcn `<Popover>`. On clicking the Trash2 icon, open a small confirmation popover (positioned above the icon, `background: #FFFFFF`, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`, `padding: 16px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.1)`). Popover contains: "Delete this extraction?" in DM Sans 14px + two buttons: "Cancel" (ghost) and "Delete" (destructive: `#DC2626` background, White text). "Delete" calls `historySlice.removeItem(id)` and shows a Shadcn success `<Toast>`: "Extraction deleted." "Cancel" closes the popover.
  - **Verification:** Clicking Delete icon opens popover. "Cancel" closes without deleting. "Delete" removes the item from the list and shows the toast. Deleting the last item shows `HistoryEmpty`.

- [ ] **Build re-open extraction action**: Re-populates Sandpack with a saved extraction.
  - **Details:** On clicking the Sparkles icon on a `HistoryItem`: call `extractionSlice.setSuccess(item.jsonBlueprint ?? {}, item.generatedCode)`. Then navigate to the Extract tab (`uiSlice.setActiveTab('extract')`). The Extract tab should detect the success state and render `ExtractionSuccessState` → clicking "Open in Sandbox" renders the Sandpack pre-populated with the historical code.
  - **Verification:** Clicking Sparkles on a history item navigates to the Extract tab. The success state is shown with the historical component's code. Opening the Sandbox renders the correct component.

- [ ] **Assemble `HistoryTab` and wire into side panel**: Replace placeholder from Phase 5.
  - **Details:** `HistoryTab.tsx` reads `historySlice.items` from Zustand. If empty: renders `HistoryEmpty`. If populated: renders a scrollable list of `HistoryItem` components with staggered entrance animation. Add a "Clear All" ghost button in the tab header (right-aligned, DM Sans 13px, `rgba(10,10,10,0.6)`) — confirmation dialog required before clearing.
  - **Verification:** Full flow: History tab shows mocked items. Delete works with confirmation. Clear All works with confirmation. Re-open navigates correctly. Empty state shows after all items are deleted.
