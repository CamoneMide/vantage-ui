import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';

/* eslint-disable import/extensions */
import { useExtractionStore } from '~store/extraction-store';

/* eslint-enable import/extensions */
import { runMockExtraction, STEP_DURATIONS } from '../mock-extraction';

describe('runMockExtraction', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useExtractionStore.getState().reset();
    useExtractionStore.getState().setSelectedElement({
      tagName: 'div',
      id: null,
      className: 'test',
      boundingRect: {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      },
      ariaAttributes: {},
      innerHTML: 'hello',
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts extraction on call', () => {
    runMockExtraction();
    expect(useExtractionStore.getState().status).toBe('extracting');
    expect(useExtractionStore.getState().currentStep).toBe('capturing');
  });

  it('advances to normalizing after capturing duration', async () => {
    runMockExtraction();

    await vi.advanceTimersByTimeAsync(STEP_DURATIONS.capturing);
    expect(useExtractionStore.getState().currentStep).toBe('normalizing');
  });

  it('advances to synthesizing after normalizing duration', async () => {
    runMockExtraction();

    await vi.advanceTimersByTimeAsync(
      STEP_DURATIONS.capturing + STEP_DURATIONS.normalizing,
    );
    expect(useExtractionStore.getState().currentStep).toBe('synthesizing');
  });

  it('reaches success after all three steps', async () => {
    runMockExtraction();

    await vi.advanceTimersByTimeAsync(
      STEP_DURATIONS.capturing
        + STEP_DURATIONS.normalizing
        + STEP_DURATIONS.synthesizing,
    );

    expect(useExtractionStore.getState().status).toBe('success');
  });

  it('sets jsonBlueprint and generatedCode on success', async () => {
    runMockExtraction();

    await vi.advanceTimersByTimeAsync(
      STEP_DURATIONS.capturing
        + STEP_DURATIONS.normalizing
        + STEP_DURATIONS.synthesizing,
    );

    const state = useExtractionStore.getState();
    expect(state.jsonBlueprint).not.toBeNull();
    expect(state.jsonBlueprint?.element).toBe('button');
    expect(state.generatedCode).toContain('SubmitButton');
  });

  it('transitions to error when shouldFail is set', async () => {
    runMockExtraction({
      shouldFail: { type: 'llm-timeout', message: 'timed out' },
    });

    await vi.advanceTimersByTimeAsync(
      STEP_DURATIONS.capturing
        + STEP_DURATIONS.normalizing
        + STEP_DURATIONS.synthesizing,
    );

    const state = useExtractionStore.getState();
    expect(state.status).toBe('error');
    expect(state.error).toEqual({ type: 'llm-timeout', message: 'timed out' });
  });

  it('does not set success after error', async () => {
    runMockExtraction({
      shouldFail: { type: 'shadow-dom', message: 'shadow root' },
    });

    await vi.advanceTimersByTimeAsync(
      STEP_DURATIONS.capturing
        + STEP_DURATIONS.normalizing
        + STEP_DURATIONS.synthesizing,
    );

    const state = useExtractionStore.getState();
    expect(state.status).toBe('error');
    expect(state.jsonBlueprint).toBeNull();
    expect(state.generatedCode).toBeNull();
  });
});
