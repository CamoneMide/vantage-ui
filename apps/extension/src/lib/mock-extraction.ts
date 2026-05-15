/* eslint-disable import/extensions */
import { mockGeneratedCode, mockJsonBlueprint } from '~mocks/extractions.mock';
import { useExtractionStore } from '~store/extraction-store';
/* eslint-enable import/extensions */
import type { ExtractionErrorType } from '~store/extraction-store';

interface MockExtractionOptions {
  shouldFail?: { type: ExtractionErrorType; message: string }
}

export const STEP_DURATIONS = {
  capturing: 1200,
  normalizing: 1000,
  synthesizing: 1500,
} as const;

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export async function runMockExtraction(
  options?: MockExtractionOptions,
): Promise<void> {
  useExtractionStore.getState().startExtraction();

  await delay(STEP_DURATIONS.capturing);
  useExtractionStore.getState().setStep('normalizing');

  await delay(STEP_DURATIONS.normalizing);
  useExtractionStore.getState().setStep('synthesizing');

  await delay(STEP_DURATIONS.synthesizing);

  if (options?.shouldFail) {
    useExtractionStore
      .getState()
      .setError(options.shouldFail.type, options.shouldFail.message);
    return;
  }

  useExtractionStore.getState().setSuccess(mockJsonBlueprint, mockGeneratedCode);
}
