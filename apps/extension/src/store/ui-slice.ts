import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/** The valid tab identifiers for the side panel navigation. */
export type TabId = 'extract' | 'history' | 'design' | 'credits' | 'settings';

interface UIState {
  /** The currently active tab in the side panel. */
  activeTab: TabId
}

interface UIActions {
  /**
   * Sets the active tab in the side panel.
   * @param tab - The tab identifier to switch to.
   */
  setActiveTab: (tab: TabId) => void
}

type UIStore = UIState & UIActions;

/**
 * Zustand store for side panel UI state.
 * Uses `persist` middleware backed by `localStorage` during development,
 * which mirrors the chrome.storage.local pattern for tab persistence.
 * This ensures the last active tab is restored when the panel re-opens.
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      activeTab: 'extract',

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'vantage-ui-panel-state',
      // During dev we use localStorage. In production, this could be
      // swapped for a chrome.storage.local adapter.
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
