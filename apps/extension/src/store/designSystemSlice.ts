import { create } from 'zustand';

import {
  mockColorPalette,
  mockDesignMd,
  mockSpacingSystem,
  mockTailwindConfig,
  mockTypographyScale,
} from '~mocks/design-system.mock';

export type ScanStatus = 'idle' | 'scanning' | 'complete' | 'error';

interface DesignSystemState {
  scanStatus: ScanStatus
  colorPalette: { hex: string; role: string; name: string }[]
  typographyScale: {
    role: string
    family: string
    size: string
    weight: string
    lineHeight: string
  }[]
  spacingSystem: number[]
  designMd: string
  tailwindConfig: string
}

interface DesignSystemActions {
  /**
   * Transitions scan status to 'scanning'.
   * The actual scan simulation with delay is handled by the consumer.
   */
  startScan: () => void

  /**
   * Populates all result fields and transitions status to 'complete'.
   */
  setScanResults: () => void

  /**
   * Resets the store back to initial idle state.
   */
  resetScan: () => void
}

type DesignSystemStore = DesignSystemState & DesignSystemActions;

const initialState: DesignSystemState = {
  scanStatus: 'idle',
  colorPalette: [],
  typographyScale: [],
  spacingSystem: [],
  designMd: '',
  tailwindConfig: '',
};

export const useDesignSystemStore = create<DesignSystemStore>((set) => ({
  ...initialState,

  startScan: () => set({ scanStatus: 'scanning' }),

  setScanResults: () => set({
    scanStatus: 'complete',
    colorPalette: mockColorPalette,
    typographyScale: mockTypographyScale,
    spacingSystem: mockSpacingSystem,
    designMd: mockDesignMd,
    tailwindConfig: mockTailwindConfig,
  }),

  resetScan: () => set(initialState),
}));
