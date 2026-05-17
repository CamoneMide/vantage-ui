import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

import { useDesignSystemStore } from '../designSystemSlice';

describe('DesignSystemStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    useDesignSystemStore.getState().resetScan();
  });

  it('starts in idle state with empty result fields', () => {
    const state = useDesignSystemStore.getState();
    expect(state.scanStatus).toBe('idle');
    expect(state.colorPalette).toEqual([]);
    expect(state.typographyScale).toEqual([]);
    expect(state.spacingSystem).toEqual([]);
    expect(state.designMd).toBe('');
    expect(state.tailwindConfig).toBe('');
  });

  it('startScan sets status to scanning', () => {
    useDesignSystemStore.getState().startScan();
    expect(useDesignSystemStore.getState().scanStatus).toBe('scanning');
  });

  it('setScanResults sets status to complete and populates results', () => {
    useDesignSystemStore.getState().startScan();
    useDesignSystemStore.getState().setScanResults();

    const state = useDesignSystemStore.getState();
    expect(state.scanStatus).toBe('complete');
    expect(state.colorPalette).toHaveLength(8);
    expect(state.typographyScale).toHaveLength(7);
    expect(state.spacingSystem).toHaveLength(8);
    expect(state.spacingSystem).toEqual([4, 8, 12, 16, 24, 32, 48, 64]);
    expect(state.designMd).toBeTruthy();
    expect(state.tailwindConfig).toBeTruthy();
  });

  it('resetScan returns to initial idle state', () => {
    useDesignSystemStore.getState().startScan();
    useDesignSystemStore.getState().setScanResults();
    useDesignSystemStore.getState().resetScan();

    const state = useDesignSystemStore.getState();
    expect(state.scanStatus).toBe('idle');
    expect(state.colorPalette).toEqual([]);
    expect(state.typographyScale).toEqual([]);
    expect(state.spacingSystem).toEqual([]);
    expect(state.designMd).toBe('');
    expect(state.tailwindConfig).toBe('');
  });
});
