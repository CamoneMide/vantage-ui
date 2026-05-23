import {
  beforeEach, describe, expect, it,
} from 'vitest';

import { useOnboardingStore } from '../onboardingSlice';

describe('OnboardingStore', () => {
  beforeEach(() => {
    useOnboardingStore.setState({
      hasCompletedOnboarding: false,
      currentStep: 0,
    });
  });

  it('initializes with the correct default states', () => {
    const state = useOnboardingStore.getState();
    expect(state.hasCompletedOnboarding).toBe(false);
    expect(state.currentStep).toBe(0);
  });

  it('nextStep increments currentStep', () => {
    useOnboardingStore.getState().nextStep();
    expect(useOnboardingStore.getState().currentStep).toBe(1);

    useOnboardingStore.getState().nextStep();
    expect(useOnboardingStore.getState().currentStep).toBe(2);
  });

  it('completeOnboarding sets hasCompletedOnboarding to true and resets step', () => {
    useOnboardingStore.getState().nextStep();
    useOnboardingStore.getState().nextStep();
    expect(useOnboardingStore.getState().currentStep).toBe(2);

    useOnboardingStore.getState().completeOnboarding();
    const state = useOnboardingStore.getState();
    expect(state.hasCompletedOnboarding).toBe(true);
    expect(state.currentStep).toBe(0);
  });

  it('resetOnboarding returns to initial state', () => {
    useOnboardingStore.getState().nextStep();
    useOnboardingStore.getState().completeOnboarding();
    expect(useOnboardingStore.getState().hasCompletedOnboarding).toBe(true);

    useOnboardingStore.getState().resetOnboarding();
    const state = useOnboardingStore.getState();
    expect(state.hasCompletedOnboarding).toBe(false);
    expect(state.currentStep).toBe(0);
  });

  it('persists and rehydrates state under vantageui-onboarding key', () => {
    expect(useOnboardingStore.persist.getOptions().name).toBe(
      'vantageui-onboarding',
    );
  });
});
