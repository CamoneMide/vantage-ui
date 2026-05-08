# PHASE 2 — Plasmo Extension Setup

**Goal:** Scaffold a working MV3 Chrome Extension with a popup, side panel, and content script registered.  
**Depends On:** Phase 1  
**Unblocks:** Phase 3, Phase 7

---

- [x] **Scaffold Plasmo app**: Initialize the Plasmo extension inside `apps/extension/`.
  - **Details:** Run `pnpm create plasmo apps/extension --with-src` (or equivalent). Select React + TypeScript. Confirm `manifest.json` is MV3. The entry files should be: `src/popup.tsx`, `src/sidepanel.tsx`, `src/contents/inspector.tsx`.
  - **Verification:** `apps/extension` contains `package.json`, `src/popup.tsx`, and the Plasmo config. `pnpm dev` inside `apps/extension` starts the dev server without errors.

- [x] **Register Side Panel in manifest**: Configure the `manifest.json` override for the Chrome Side Panel.
  - **Details:** In `package.json` Plasmo manifest config, add: `"side_panel": { "default_path": "sidepanel.html" }` and `"permissions": ["activeTab", "storage", "scripting", "sidePanel"]`. Add `"action": {}` so the popup still opens on toolbar click.
  - **Verification:** After loading the extension in Chrome (`chrome://extensions/` → Load Unpacked → `.plasmo/chrome-mv3-dev/`), right-clicking the toolbar icon shows "Open Side Panel". The popup opens on left-click.

- [x] **Register the keyboard shortcut**: Add `Ctrl+Shift+X` for toggling the inspector.
  - **Details:** Add to the manifest config in `package.json`: `"commands": { "toggle-inspector": { "suggested_key": { "default": "Ctrl+Shift+X", "mac": "Command+Shift+X" }, "description": "Toggle VantageUI Inspector" } }`.
  - **Verification:** After loading in Chrome, navigate to `chrome://extensions/shortcuts` and confirm "VantageUI: Toggle VantageUI Inspector" is listed with the correct shortcut.

- [x] **Create popup shell (`src/popup.tsx`)**: Minimal popup with placeholder content.
  - **Details:** Render a `<div>` with `width: 320px`, `height: 480px`, background `#FFFFFF`. Show "VantageUI Popup" heading. Add a `<button>` that calls `chrome.tabs.query` to get the active tab (confirms tab permission is working). Wrap in React `StrictMode`.
  - **Verification:** Opening the popup shows the heading and button. Clicking the button does not throw a permission error in the extension background console.

- [x] **Create side panel shell (`src/sidepanel.tsx`)**: Minimal side panel with placeholder content.
  - **Details:** Render a full-height `<div>` with background `#FFFFFF`. Show "VantageUI Side Panel" heading. The side panel should mount as a standalone React root (Plasmo handles this automatically for `sidepanel.tsx`).
  - **Verification:** Opening the side panel via the toolbar context menu renders the heading at full browser height without overflow.

- [x] **Create content script shell (`src/contents/inspector.tsx`)**: Minimal content script that logs activation.
  - **Details:** Export a `config` object with `matches: ["<all_urls>"]`. In the component, add a `useEffect` that listens for `chrome.runtime.onMessage` for a `{ type: "TOGGLE_INSPECTOR" }` message and logs `"Inspector toggled"` to the page console. Return `null` (no DOM rendering yet).
  - **Verification:** After loading the extension on any page, opening the browser console and sending a test message from the background shows "Inspector toggled" logged correctly.

- [x] **Wire keyboard shortcut to content script**: Connect the `Ctrl+Shift+X` command to the content script.
  - **Details:** Create `src/background.ts` (Plasmo background service worker). Add a `chrome.commands.onCommand` listener that, on `"toggle-inspector"`, sends `{ type: "TOGGLE_INSPECTOR" }` to the active tab via `chrome.tabs.sendMessage`.
  - **Verification:** Pressing `Ctrl+Shift+X` on any page triggers the "Inspector toggled" log in the page console. No console errors in the background service worker.

- [x] **Add `dev` script to workspace**: Add a convenience script in root `package.json`.
  - **Details:** Add `"dev:extension": "pnpm --filter extension dev"` and `"build:extension": "pnpm --filter extension build"` to the root `package.json` scripts.
  - **Verification:** `pnpm dev:extension` from the root starts the Plasmo dev server.
