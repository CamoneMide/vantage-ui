import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { useCreditsStore } from './creditsSlice';

export type AuthState = 'unauthenticated' | 'loading' | 'authenticated';

interface PopupStore {
  authState: AuthState
  creditBalance: number
  userEmail: string | null
  user: { email: string } | null
  error: string | null
  inspectorActive: boolean
  setAuthState: (state: AuthState) => void
  setCreditBalance: (balance: number) => void
  setUserEmail: (email: string | null) => void
  toggleAuth: () => void
  mockLogin: (email: string) => Promise<void>
  mockSignup: (email: string) => Promise<void>
  mockLogout: () => void
  toggleInspector: () => void
  setInspectorActive: (active: boolean) => void
}

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

export const usePopupStore = create<PopupStore>()(
  persist(
    (set) => ({
      authState: 'unauthenticated',
      creditBalance: 0,
      userEmail: null,
      user: null,
      error: null,
      inspectorActive: false,

      setAuthState: (authState) => set({ authState }),
      setCreditBalance: (creditBalance) => set({ creditBalance }),
      setUserEmail: (userEmail) => set({ userEmail }),

      toggleAuth: () => set((state) => ({
        authState:
            state.authState === 'authenticated'
              ? 'unauthenticated'
              : 'authenticated',
        userEmail:
            state.authState === 'unauthenticated' ? 'user@example.com' : null,
        user:
            state.authState === 'unauthenticated'
              ? { email: 'user@example.com' }
              : null,
        error: null,
      })),

      mockLogin: async (email: string) => {
        set({ authState: 'loading', error: null });

        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 1500);
        });

        // Simulate occasional auth failure
        if (Math.random() < 0.1) {
          set({
            authState: 'unauthenticated',
            error: 'Invalid credentials. Please try again.',
          });
          return;
        }

        set({
          authState: 'authenticated',
          user: { email },
          userEmail: email,
        });
      },

      mockSignup: async (email: string) => {
        set({ authState: 'loading', error: null });

        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 1500);
        });

        // Simulate occasional auth failure
        if (Math.random() < 0.1) {
          set({
            authState: 'unauthenticated',
            error: 'Signup failed. This email may already be registered.',
          });
          return;
        }

        set({
          authState: 'authenticated',
          user: { email },
          userEmail: email,
        });

        useCreditsStore.getState().initSignupCredits();
      },

      mockLogout: () => set({
        authState: 'unauthenticated',
        user: null,
        userEmail: null,
        error: null,
        inspectorActive: false,
      }),

      toggleInspector: () => set((state) => ({
        inspectorActive: !state.inspectorActive,
      })),

      setInspectorActive: (active) => set({ inspectorActive: active }),
    }),
    {
      name: 'vantageui-auth',
      storage: chromeStorage,
    },
  ),
);
