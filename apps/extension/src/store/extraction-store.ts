import { create } from 'zustand';

import type { SelectedElementData } from '~schemas/inspector.schema';

export type ExtractionStatus =
  | 'idle'
  | 'element-selected'
  | 'extracting'
  | 'success'
  | 'error';
export type ExtractionStep = 'capturing' | 'normalizing' | 'synthesizing';
export type ExtractionErrorType =
  | 'shadow-dom'
  | 'cors'
  | 'llm-timeout'
  | 'insufficient-credits'
  | 'unknown';

export interface JsonBlueprint {
  element: string
  attributes: Record<string, string>
  styles: Record<string, string>
  animations: string[]
  assets: string[]
  ariaAttributes: Record<string, string>
  childElements: Array<{
    element: string
    attributes: Record<string, string>
    content: string
  }>
}

export const MAX_RETRIES = 3;

interface ExtractionState {
  status: ExtractionStatus
  currentStep: ExtractionStep | null
  selectedElement: SelectedElementData | null
  jsonBlueprint: JsonBlueprint | null
  generatedCode: string | null
  sourceUrl: string | null
  error: { type: ExtractionErrorType; message: string } | null
  retryCount: number
  sandboxView: boolean
  promptView: boolean
}

const initialState: ExtractionState = {
  status: 'idle',
  currentStep: null,
  selectedElement: null,
  jsonBlueprint: null,
  generatedCode: null,
  sourceUrl: null,
  error: null,
  retryCount: 0,
  sandboxView: false,
  promptView: false,
};

interface ExtractionActions {
  setSelectedElement: (element: SelectedElementData) => void
  startExtraction: (sourceUrl?: string) => void
  setStep: (step: ExtractionStep) => void
  setSuccess: (blueprint: JsonBlueprint, code: string) => void
  setError: (type: ExtractionErrorType, message: string) => void
  setSandboxView: (view: boolean) => void
  setPromptView: (view: boolean) => void
  reset: () => void
}

export type ExtractionStore = ExtractionState & ExtractionActions;

export const useExtractionStore = create<ExtractionStore>((set) => ({
  ...initialState,

  setSelectedElement: (element) => set({
    status: 'element-selected',
    selectedElement: element,
    error: null,
  }),

  startExtraction: (sourceUrl) => {
    const { selectedElement, status } = useExtractionStore.getState();

    // Guard: prevent concurrent extractions
    if (status === 'extracting') return;

    if (!selectedElement) {
      set({
        status: 'error',
        currentStep: null,
        error: { type: 'unknown', message: 'No element selected. Please select an element first.' },
      });
      return;
    }
    set({
      status: 'extracting',
      currentStep: 'capturing',
      sourceUrl: sourceUrl ?? null,
    });
  },

  setStep: (step) => set({ currentStep: step }),

  setSuccess: (blueprint, code) => {
    set({
      status: 'success',
      currentStep: null,
      jsonBlueprint: blueprint,
      generatedCode: code,
    });
  },

  setError: (type, message) => set((state) => ({
    status: 'error',
    currentStep: null,
    error: { type, message },
    retryCount: state.retryCount + 1,
  })),

  setSandboxView: (view) => set({ sandboxView: view, promptView: false }),

  setPromptView: (view) => set({ promptView: view, sandboxView: false }),

  reset: () => set(initialState),
}));
