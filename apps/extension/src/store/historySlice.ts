import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ExtractionHistoryItem } from '~mocks/history.mock';

const MAX_HISTORY_ITEMS = 100;

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

interface HistoryState {
  items: ExtractionHistoryItem[]
}

interface HistoryActions {
  addItem: (item: ExtractionHistoryItem) => void
  removeItem: (id: string) => void
  clearAll: () => void
}

type HistoryStore = HistoryState & HistoryActions;

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) => set((state) => ({
        items: [item, ...state.items].slice(0, MAX_HISTORY_ITEMS),
      })),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'vantageui-history',
      storage: chromeStorage,
    },
  ),
);
