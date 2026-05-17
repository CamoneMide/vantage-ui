import { create } from 'zustand';

import type { ExtractionHistoryItem } from '~mocks/history.mock';
import { mockHistory } from '~mocks/history.mock';

interface HistoryState {
  items: ExtractionHistoryItem[]
}

interface HistoryActions {
  /**
   * Adds a new extraction to the history, prepending it to the list.
   * @param item - The extraction history item to add.
   */
  addItem: (item: ExtractionHistoryItem) => void

  /**
   * Removes an extraction from history by its id.
   * Uses immutable .filter() — does not mutate the original array.
   * @param id - The id of the item to remove.
   */
  removeItem: (id: string) => void

  /**
   * Clears all extraction history items.
   */
  clearAll: () => void
}

type HistoryStore = HistoryState & HistoryActions;

export const useHistoryStore = create<HistoryStore>((set) => ({
  items: mockHistory,

  addItem: (item) => set((state) => ({
    items: [item, ...state.items],
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),

  clearAll: () => set({ items: [] }),
}));
