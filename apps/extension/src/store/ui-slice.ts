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

const isChromeStorageAvailable = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

const chromeStorage = {
  getItem: async (name: string) => {
    if (isChromeStorageAvailable) {
      const result = await chrome.storage.local.get(name);
      const raw = result[name];
      if (raw === undefined || raw === null) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    try {
      const val = localStorage.getItem(name);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: unknown) => {
    if (isChromeStorageAvailable) {
      await chrome.storage.local.set({ [name]: JSON.stringify(value) });
      return;
    }
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
      // noop
    }
  },
  removeItem: async (name: string) => {
    if (isChromeStorageAvailable) {
      await chrome.storage.local.remove(name);
      return;
    }
    try {
      localStorage.removeItem(name);
    } catch {
      // noop
    }
  },
};

/**
 * Zustand store for side panel UI state.
 * Uses `persist` middleware backed by `chrome.storage.local` with
 * `localStorage` fallback for dev environments.
 * This ensures the last active tab is restored when the panel re-opens.
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      activeTab: 'extract',

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'vantageui-panel-state',
      storage: chromeStorage,
    },
  ),
);
