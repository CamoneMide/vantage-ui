import {
  beforeEach, describe, expect, it,
} from 'vitest';

import type { SelectedElementData } from '~schemas/inspector.schema';

import { useExtractionStore } from '../extraction-store';

const mockElement: SelectedElementData = {
  tagName: 'div',
  id: null,
  className: 'test-class',
  boundingRect: {
    top: 0,
    left: 0,
    width: 100,
    height: 100,
  },
  ariaAttributes: {},
  innerHTML: 'hello',
};

describe('ExtractionStore', () => {
  beforeEach(() => {
    useExtractionStore.getState().reset();
  });

  it('starts in idle state with null fields', () => {
    const state = useExtractionStore.getState();
    expect(state.status).toBe('idle');
    expect(state.selectedElement).toBeNull();
    expect(state.jsonBlueprint).toBeNull();
    expect(state.generatedCode).toBeNull();
    expect(state.currentStep).toBeNull();
    expect(state.error).toBeNull();
  });

  it('transitions to element-selected on setSelectedElement', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    const state = useExtractionStore.getState();
    expect(state.status).toBe('element-selected');
    expect(state.selectedElement).toEqual(mockElement);
  });

  it('clears error when a new element is selected', () => {
    useExtractionStore.getState().setError('llm-timeout', 'timed out');
    useExtractionStore.getState().setSelectedElement(mockElement);
    expect(useExtractionStore.getState().error).toBeNull();
  });

  it('transitions to extracting with capturing step on startExtraction', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction();
    const state = useExtractionStore.getState();
    expect(state.status).toBe('extracting');
    expect(state.currentStep).toBe('capturing');
  });

  it('accepts optional sourceUrl on startExtraction', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction('https://example.com');
    expect(useExtractionStore.getState().sourceUrl).toBe('https://example.com');
  });

  it('advances through steps via setStep', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction();

    useExtractionStore.getState().setStep('normalizing');
    expect(useExtractionStore.getState().currentStep).toBe('normalizing');

    useExtractionStore.getState().setStep('synthesizing');
    expect(useExtractionStore.getState().currentStep).toBe('synthesizing');
  });

  it('transitions to success with blueprint and code', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction();
    useExtractionStore.getState().setSuccess(
      {
        element: 'div',
        attributes: {},
        styles: {},
        animations: [],
        assets: [],
        ariaAttributes: {},
        childElements: [],
      },
      '<div>code</div>',
    );

    const state = useExtractionStore.getState();
    expect(state.status).toBe('success');
    expect(state.jsonBlueprint?.element).toBe('div');
    expect(state.generatedCode).toBe('<div>code</div>');
    expect(state.currentStep).toBeNull();
  });

  it('transitions to error with type and message', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction();
    useExtractionStore
      .getState()
      .setError('llm-timeout', 'The AI model timed out');

    const state = useExtractionStore.getState();
    expect(state.status).toBe('error');
    expect(state.error).toEqual({
      type: 'llm-timeout',
      message: 'The AI model timed out',
    });
    expect(state.currentStep).toBeNull();
  });

  it('resets to initial state from success', () => {
    useExtractionStore.getState().setSelectedElement(mockElement);
    useExtractionStore.getState().startExtraction();
    useExtractionStore.getState().setSuccess(
      {
        element: 'div',
        attributes: {},
        styles: {},
        animations: [],
        assets: [],
        ariaAttributes: {},
        childElements: [],
      },
      '',
    );
    useExtractionStore.getState().reset();

    const state = useExtractionStore.getState();
    expect(state.status).toBe('idle');
    expect(state.selectedElement).toBeNull();
    expect(state.jsonBlueprint).toBeNull();
    expect(state.generatedCode).toBeNull();
    expect(state.sourceUrl).toBeNull();
    expect(state.error).toBeNull();
  });

  it('resets to initial state from error', () => {
    useExtractionStore.getState().setError('cors', 'blocked');
    useExtractionStore.getState().reset();

    expect(useExtractionStore.getState().status).toBe('idle');
    expect(useExtractionStore.getState().error).toBeNull();
  });

  it('supports resetting directly from idle', () => {
    useExtractionStore.getState().reset();
    expect(useExtractionStore.getState().status).toBe('idle');
  });
});
