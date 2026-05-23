import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import {
  mockCreditBalance,
  mockTransactionHistory,
  type CreditTransaction,
} from '~mocks/credits.mock';

import { usePopupStore } from './popup-store';

interface CreditsState {
  /** The current numeric credit balance. */
  balance: number
  /** The list of all transactions (spent, purchased, granted). */
  transactions: CreditTransaction[]
}

interface CreditsActions {
  /**
   * Sets the credit balance to a specific number and synchronizes the popup store.
   * @param n - The new credit balance.
   */
  setCreditBalance: (n: number) => void

  /**
   * Deducts exactly 1 credit, appends a 'spent' transaction, and syncs the popup store.
   * @param description - Custom description for the extraction transaction.
   */
  deductCredit: (description?: string) => void

  /**
   * Immutably adds a pack of credits, appends a 'purchased' transaction, and syncs the popup store.
   * @param amount - The number of credits purchased (e.g. 50, 100, 200).
   * @param packName - The pricing package identifier.
   */
  addCredits: (amount: number, packName: string) => void

  /**
   * Initializes sign-up bonus credits (5 credits), appends a 'granted' transaction.
   */
  initSignupCredits: () => void
}

export type CreditsStore = CreditsState & CreditsActions;

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
    const val = localStorage.getItem(name);
    return val ? JSON.parse(val) : null;
  },
  setItem: async (name: string, value: unknown) => {
    if (isChromeStorageAvailable) {
      await chrome.storage.local.set({ [name]: JSON.stringify(value) });
      return;
    }
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    if (isChromeStorageAvailable) {
      await chrome.storage.local.remove(name);
      return;
    }
    localStorage.removeItem(name);
  },
};

export const useCreditsStore = create<CreditsStore>()(
  persist(
    (set) => ({
      balance: mockCreditBalance,
      transactions: mockTransactionHistory,

      setCreditBalance: (n) => {
        set({ balance: n });
        // Sync with usePopupStore
        usePopupStore.getState().setCreditBalance(n);
      },

      deductCredit: (description = 'Component Extraction') => {
        set((state) => {
          const newBalance = Math.max(0, state.balance - 1);
          const newTransaction: CreditTransaction = {
            id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'spent',
            amount: -1,
            description,
            createdAt: new Date().toISOString(),
          };

          // Sync with usePopupStore
          usePopupStore.getState().setCreditBalance(newBalance);

          return {
            balance: newBalance,
            transactions: [newTransaction, ...state.transactions],
          };
        });
      },

      addCredits: (amount, packName) => {
        set((state) => {
          const newBalance = state.balance + amount;
          const newTransaction: CreditTransaction = {
            id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'purchased',
            amount,
            description: `${packName} Purchase`,
            createdAt: new Date().toISOString(),
          };

          // Sync with usePopupStore
          usePopupStore.getState().setCreditBalance(newBalance);

          return {
            balance: newBalance,
            transactions: [newTransaction, ...state.transactions],
          };
        });
      },

      initSignupCredits: () => {
        set((state) => {
          const newBalance = 5;
          const newTransaction: CreditTransaction = {
            id: `tx-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type: 'granted',
            amount: 5,
            description: 'Sign-up Welcome Bonus',
            createdAt: new Date().toISOString(),
          };

          // Sync with usePopupStore
          usePopupStore.getState().setCreditBalance(newBalance);

          return {
            balance: newBalance,
            transactions: [newTransaction, ...state.transactions],
          };
        });
      },
    }),
    {
      name: 'vantageui-credits',
      storage: chromeStorage,
    },
  ),
);

// Subscribe to usePopupStore to keep balance in sync when auth states or signup bonus change
usePopupStore.subscribe((popupState) => {
  const currentCreditsState = useCreditsStore.getState();
  if (currentCreditsState.balance !== popupState.creditBalance) {
    useCreditsStore.setState({ balance: popupState.creditBalance });
  }
});
