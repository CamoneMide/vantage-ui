/* eslint-disable-next-line import/extensions */
import { mockGeneratedCode, mockJsonBlueprint } from '~mocks/extractions.mock';
/* eslint-disable-next-line import/extensions */
import { useExtractionStore } from '~store/extraction-store';
/* eslint-disable-next-line import/extensions */
import type { ExtractionErrorType } from '~store/extraction-store';
/* eslint-disable-next-line import/extensions */
import { useCreditsStore } from '~store/creditsSlice';
/* eslint-disable-next-line import/extensions */
import { useHistoryStore } from '~store/historySlice';

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
  const store = useExtractionStore.getState();

  // Guard: prevent concurrent extractions
  if (store.status === 'extracting') return;

  // Guard: must have a selected element
  if (!store.selectedElement) {
    useExtractionStore.getState().setError('unknown', 'No element selected. Please select an element first.');
    return;
  }

  // Pre-authorize: deduct credit at extraction start
  const tagName = store.selectedElement?.tagName
    ? `<${store.selectedElement.tagName.toLowerCase()}>`
    : 'Component';
  useCreditsStore.getState().deductCredit(`${tagName} Extraction`);

  useExtractionStore.getState().startExtraction();

  await delay(STEP_DURATIONS.capturing);
  if (useExtractionStore.getState().error) return;

  useExtractionStore.getState().setStep('normalizing');

  await delay(STEP_DURATIONS.normalizing);
  if (useExtractionStore.getState().error) return;

  useExtractionStore.getState().setStep('synthesizing');

  await delay(STEP_DURATIONS.synthesizing);
  if (useExtractionStore.getState().error) return;

  if (options?.shouldFail) {
    useExtractionStore
      .getState()
      .setError(options.shouldFail.type, options.shouldFail.message);
    return;
  }

  useExtractionStore.getState().setSuccess(mockJsonBlueprint, mockGeneratedCode);

  const state = useExtractionStore.getState();
  let domain = 'unknown';
  try {
    domain = state.sourceUrl
      ? new URL(state.sourceUrl).hostname.replace('www.', '')
      : 'unknown';
  } catch {
    domain = 'unknown';
  }
  const elementTag = state.selectedElement?.tagName ?? 'unknown';

  const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="80" viewBox="0 0 112 80"><rect width="112" height="80" fill="#F5F5F6"/><text x="56" y="44" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="13" font-weight="500" fill="#A1A1AA">${elementTag.replace(/[<>]/g, '')}</text></svg>`;
  useHistoryStore.getState().addItem({
    id: `ext-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sourceUrl: state.sourceUrl ?? '',
    sourceDomain: domain,
    elementTag: `${elementTag}${state.selectedElement?.className ? `.${state.selectedElement.className.split(/\s+/)[0]}` : ''}`,
    capturedAt: new Date().toISOString(),
    thumbnailUrl: `data:image/svg+xml;base64,${btoa(placeholderSvg)}`,
    generatedCode: state.generatedCode ?? '',
    jsonBlueprint: state.jsonBlueprint ?? {
      element: elementTag,
      attributes: {},
      styles: {},
      animations: [],
      assets: [],
      ariaAttributes: {},
      childElements: [],
    },
  });
}
