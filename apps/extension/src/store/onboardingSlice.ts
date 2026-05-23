import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
  hasCompletedOnboarding: boolean
  currentStep: number
}

interface OnboardingActions {
  nextStep: () => void
  completeOnboarding: () => void
  resetOnboarding: () => void
}

export type OnboardingStore = OnboardingState & OnboardingActions;

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

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      currentStep: 0,

      nextStep: () => set((state) => ({
        currentStep: state.currentStep + 1,
      })),

      completeOnboarding: () => set({
        hasCompletedOnboarding: true,
        currentStep: 0,
      }),

      resetOnboarding: () => set({
        hasCompletedOnboarding: false,
        currentStep: 0,
      }),
    }),
    {
      name: 'vantageui-onboarding',
      storage: chromeStorage,
    },
  ),
);
