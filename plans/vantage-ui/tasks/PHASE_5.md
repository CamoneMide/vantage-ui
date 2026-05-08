# PHASE 5 — Side Panel Shell & Navigation

**Goal:** Build the full side panel layout shell with tab navigation, header, and content outlet.  
**Depends On:** Phase 3  
**Unblocks:** Phase 6, Phase 8, Phase 11, Phase 12, Phase 13

---

- [ ] **Set up side panel entry point**: Configure `src/sidepanel.tsx` root layout.
  - **Details:** Import `globals.css`. Root `<div>` fills 100% viewport height. Background: `#F5F5F6` (Soft White canvas). Wrap with `StoreProvider` (Zustand). Wrap with a `ToastProvider` from Shadcn for global toasts. Apply `animate-fade-in` on mount.
  - **Verification:** Side panel opens at full browser height. Background is `#F5F5F6`. No overflow or scrollbar on root.

- [ ] **Build `PanelHeader` component**: Top bar with branding, credit balance, and user avatar.
  - **Details:** `background: #FFFFFF`, `border-bottom: 1px solid rgba(10,10,10,0.08)`, `padding: 0 16px`, `height: 56px`, flex row. Left: VantageUI logo SVG + "VantageUI" wordmark (Outfit SemiBold 15px, Deep Black). Right: `<CreditBadge>` + `<Avatar>` (initials-based, 32px, Nero Blue bg + White text). Add JSDoc.
  - **Verification:** Header is exactly 56px tall. Renders logo, credit badge (mocked balance), and avatar initial. No overflow.

- [ ] **Build `PanelNav` tab bar component**: Primary navigation for all 5 main tabs.
  - **Details:** Horizontal tab bar, `background: #FFFFFF`, `border-bottom: 1px solid rgba(10,10,10,0.08)`, `padding: 0 8px`. Five tabs:
    - **Extract** → Sparkles icon
    - **History** → Clock icon
    - **Design** → Palette icon
    - **Credits** → Zap icon
    - **Settings** → Settings icon
      Each tab: icon (20px) + label (DM Sans 12px Medium). Active state: `color: #053B84`, `border-bottom: 2px solid #053B84`. Inactive: `color: rgba(10,10,10,0.6)`. Hover: Soft White `#F5F5F6` background. Tab switch triggers `animate-fade-up` on content area.
  - **Verification:** Clicking each tab updates the active indicator. Active tab shows Nero Blue underline. Inactive tabs show secondary text color. Hover state visible.

- [ ] **Build `PanelContent` outlet**: Scrollable content area below the header and nav.
  - **Details:** `flex: 1`, `overflow-y: auto`, `padding: 16px`. Renders child content based on active tab (controlled by Zustand `uiSlice.activeTab`). On tab change, content mounts with `animate-fade-up` (use a `key={activeTab}` on the content container to force re-mount animation).
  - **Verification:** Content area scrolls independently of the header/nav. Tab switch re-triggers fade-up animation.

- [ ] **Create placeholder screens for all 5 tabs**: Scaffold content pages used in later phases.
  - **Details:** Create the following components, each rendering a simple centered placeholder card (White bg, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 12px`, `padding: 32px`, icon + heading + description):
    - `ExtractTab.tsx` — Sparkles icon, "Extract a Component", "Activate the inspector and click any element on the page."
    - `HistoryTab.tsx` — Clock icon, "No History Yet", "Your extracted components will appear here."
    - `DesignTab.tsx` — Palette icon, "Design System Scanner", "Scan any website's design tokens."
    - `CreditsTab.tsx` — Zap icon, "Credit Balance", "Manage your extraction credits."
    - `SettingsTab.tsx` — Settings icon, "Settings", "Coming soon."
  - **Verification:** Each tab renders its placeholder. Cards are styled correctly (white surface on soft white canvas, correct border/shadow).

- [ ] **Implement auth gate on the side panel**: Show auth screens if user is logged out.
  - **Details:** In `sidepanel.tsx`, read `authState` from Zustand. If `'unauthenticated'`: render `<AuthGate>` component instead of `PanelContent`. `<AuthGate>` shows tabs to switch between Login and Signup forms (built in Phase 6) but hides the main nav. If `'authenticated'`: render the full shell.
  - **Verification:** Toggling auth state via the dev toggle (Phase 4) shows either the auth gate or the full panel shell correctly.

- [ ] **Set up Zustand store for panel UI state**: `uiSlice` for active tab management.
  - **Details:** Create `src/store/uiSlice.ts`. State: `{ activeTab: 'extract' | 'history' | 'design' | 'credits' | 'settings' }`. Actions: `setActiveTab(tab)`. Persist `activeTab` to `chrome.storage.local` so it survives panel re-opens (mock with `localStorage` during dev). Export via `useUIStore` hook. Add JSDoc to the store and all actions.
  - **Verification:** Switching tabs persists correctly. Re-opening the side panel restores the last active tab.
