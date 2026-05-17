import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const chromeStorage = {
  getItem: async (name: string) => {
    const result = await chrome.storage.local.get(name);
    const raw = result[name];
    if (raw === undefined || raw === null) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  },
  setItem: async (name: string, value: unknown) => {
    await chrome.storage.local.set({ [name]: JSON.stringify(value) });
  },
  removeItem: async (name: string) => {
    await chrome.storage.local.remove(name);
  },
};

export const usePopupStore = create<PopupStore>()(
  persist(
    (set) => ({
      authState: 'unauthenticated',
      creditBalance: 10,
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
        creditBalance: state.authState === 'unauthenticated' ? 10 : 10,
        error: null,
      })),

      mockLogin: async (email: string) => {
        set({ authState: 'loading', error: null });

        await new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 1500);
        });

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

        set({
          authState: 'authenticated',
          user: { email },
          userEmail: email,
          creditBalance: 5,
        });
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
