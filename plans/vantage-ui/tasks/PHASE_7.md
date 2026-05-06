# PHASE 7 — Inspector Content Script Overlay

**Goal:** Build the full Ghost inspector overlay running inside the active tab — hover highlights, ARIA badges, DOM traversal, and selection confirmation.  
**Depends On:** Phase 2, Phase 3  
**Unblocks:** Phase 8

---

- [ ] **Set up content script React root**: Mount a Shadow DOM React root to prevent style conflicts.
  - **Details:** In `src/contents/inspector.tsx`, use Plasmo's `getStyle` export to inject a `<style>` tag with the VantageUI Tailwind base styles. Mount the inspector overlay React component into a Shadow DOM root (`element.attachShadow({ mode: 'open' })`) to fully isolate styles from the host page. The content script root element should be appended to `document.body`. Export `config = { matches: ['<all_urls>'] }`.
  - **Verification:** Loading the extension on any page does NOT visually affect the page's own styles. The inspector overlay renders inside a Shadow DOM (inspect with DevTools → Elements → `#vantageui-root` → shadow-root).

- [ ] **Implement inspector toggle state**: Listen for activation messages and manage active/inactive mode.
  - **Details:** In the content script component, manage a `isActive: boolean` state. Listen for `chrome.runtime.onMessage` with `{ type: 'TOGGLE_INSPECTOR' }` — toggle `isActive`. When `isActive` is false, the component renders `null` and removes all event listeners. When `isActive` is true, add `mousemove` and `click` listeners. Show a fixed bottom-right activation chip (see task below) when active.
  - **Verification:** Pressing `Ctrl+Shift+X` on any page toggles the inspector. No event listeners leak when deactivated (verify with Chrome DevTools Performance monitor → event listener count).

- [ ] **Build "Inspector Active" chip**: Fixed indicator shown on the page when inspector is on.
  - **Details:** A fixed pill in the bottom-right corner of the viewport (not the shadow DOM — inject this as a fixed element): `background: #053B84`, `color: #FFFFFF`, `font-family: 'DM Sans'`, `font-size: 12px`, `padding: 6px 12px`, `border-radius: 20px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.2)`, `z-index: 2147483647`. Text: "⬡ VantageUI Active — Press Esc to exit". Mounts with `animate-fade-up`. Unmounts with fade-out on deactivation.
  - **Verification:** Chip appears on inspector activation. Chip disappears on Escape or `TOGGLE_INSPECTOR` message. Chip is visible on any page background without being obscured by the page's own `z-index` layers.

- [ ] **Build Ghost overlay element**: The highlight overlay that tracks the hovered element.
  - **Details:** On `mousemove`, use `document.elementFromPoint(e.clientX, e.clientY)` to find the target element (skip the inspector chip and shadow root). Get `getBoundingClientRect()` of the target. Position an absolutely-placed `<div>` (inside the shadow DOM, `position: fixed`) matching those bounds: `border: 2px solid #053B84`, `background: rgba(5,59,132,0.08)`, `border-radius: 4px`, `pointer-events: none`, `transition: all 80ms ease-out` (smooth tracking). Update on every `mousemove`.
  - **Verification:** The Ghost overlay accurately tracks hovered elements as the user moves the mouse. Overlay does not block mouse events (pointer-events: none). Transition is smooth, not jumpy.

- [ ] **Build ARIA attribute badge**: Floating chip showing ARIA data of the hovered element.
  - **Details:** Positioned at top-right of the Ghost overlay (inside shadow DOM). Shows detected values from the hovered element: `role`, `aria-expanded`, `aria-label`, `data-state` (only those that are set on the element — skip if null). Rendered as a horizontal row of mini-pills: `background: rgba(10,10,10,0.85)`, `color: #FFFFFF`, `font-family: 'DM Sans'`, `font-size: 11px`, `padding: 3px 7px`, `border-radius: 4px`. If no ARIA attributes are present, badge is hidden. Cap display at 3 attributes max.
  - **Verification:** Hovering over a `<button aria-expanded="true">` shows a badge with `aria-expanded: true`. Hovering a plain `<div>` with no ARIA shows no badge.

- [ ] **Implement arrow-key DOM tree navigation**: Allow users to traverse the DOM tree from a selected node.
  - **Details:** After a user clicks to confirm a selection (see next task), arrow keys navigate the tree: `ArrowUp` → `element.parentElement`, `ArrowDown` → `element.firstElementChild`. Update the Ghost overlay and ARIA badge to reflect the newly navigated element. Prevent default scroll behavior while inspector is active. Show a small "Parent / Child" hint text in the Ghost overlay bottom bar (DM Sans 11px, white on Nero Blue strip at the bottom of the overlay).
  - **Verification:** After selection, `ArrowUp` moves the overlay to the parent element (visually larger selection). `ArrowDown` moves to the first child. Page does not scroll when arrow keys are pressed while inspector is active.

- [ ] **Implement click-to-select confirmation**: Lock the selection and prepare extraction payload.
  - **Details:** On `click` (with `e.preventDefault()` and `e.stopPropagation()`): freeze the Ghost overlay at the current position (remove `mousemove` tracking). Serialize the selected element's: tag name, `id`, `className` (first 3 classes only), bounding rect, detected ARIA attributes, and `innerHTML` (truncated to 500 chars) into a `SelectedElementData` object (Zod-typed). Dispatch a `chrome.runtime.sendMessage({ type: 'ELEMENT_SELECTED', payload: selectedElementData })`. Show a "Selected" confirmation badge (Nero Blue bg, White text, "✓ Component Selected") replacing the ARIA badge.
  - **Verification:** Clicking an element freezes the overlay. "✓ Component Selected" badge replaces the ARIA badge. A Chrome message is sent (visible in background service worker console).

- [ ] **Implement Escape key to deactivate**: Exit inspector cleanly.
  - **Details:** On `keydown` event (document level, not shadow DOM): if `key === 'Escape'` and inspector is active, call the deactivate handler. This removes all listeners, hides the Ghost overlay, removes the activation chip, and sends `{ type: 'INSPECTOR_DEACTIVATED' }` to the background. The popup/side panel should update their inspector toggle state on receiving this message.
  - **Verification:** Pressing Escape deactivates inspector. Ghost overlay and chip disappear. Popup inspector button state updates to "inactive".
