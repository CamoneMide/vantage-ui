import { useCallback, useEffect } from 'react';

/* eslint-disable-next-line import/extensions */
import { runMockExtraction } from '~lib/mock-extraction';
/* eslint-disable-next-line import/extensions */
import { useExtractionStore } from '~store/extraction-store';
/* eslint-disable-next-line import/extensions */
import { usePopupStore } from '~store/popup-store';

import { ExtractionErrorState } from './extract/extraction-error-state';
import { ExtractionIdleState } from './extract/extraction-idle-state';
import { ExtractionProgressState } from './extract/extraction-progress-state';
import { ExtractionSelectedState } from './extract/extraction-selected-state';
import { ExtractionSuccessState } from './extract/extraction-success-state';

function ExtractTab() {
  const status = useExtractionStore((s) => s.status);
  const selectedElement = useExtractionStore((s) => s.selectedElement);
  const currentStep = useExtractionStore((s) => s.currentStep);
  const jsonBlueprint = useExtractionStore((s) => s.jsonBlueprint);
  const generatedCode = useExtractionStore((s) => s.generatedCode);
  const sourceUrl = useExtractionStore((s) => s.sourceUrl);
  const error = useExtractionStore((s) => s.error);
  const setSelectedElement = useExtractionStore((s) => s.setSelectedElement);
  const reset = useExtractionStore((s) => s.reset);
  const creditBalance = usePopupStore((s) => s.creditBalance);

  useEffect(() => {
    function handleMessage(msg: { type: string; payload?: unknown }) {
      if (msg.type === 'ELEMENT_SELECTED') {
        setSelectedElement(
          msg.payload as Parameters<typeof setSelectedElement>[0],
        );
      } else if (msg.type === 'INSPECTOR_DEACTIVATED') {
        reset();
      }
    }

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [setSelectedElement, reset]);

  const handleExtract = useCallback(() => {
    runMockExtraction();
  }, []);

  const handleReselect = useCallback(() => {
    reset();
  }, [reset]);

  const handleRetry = useCallback(() => {
    runMockExtraction();
  }, []);

  if (status === 'idle') {
    return <ExtractionIdleState />;
  }

  if (status === 'element-selected' && selectedElement) {
    return (
      <ExtractionSelectedState
        selectedElement={selectedElement}
        creditBalance={creditBalance}
        onExtract={handleExtract}
        onReselect={handleReselect}
      />
    );
  }

  if (status === 'extracting' && currentStep) {
    return <ExtractionProgressState currentStep={currentStep} />;
  }

  if (status === 'success' && jsonBlueprint) {
    return (
      <ExtractionSuccessState
        jsonBlueprint={jsonBlueprint}
        generatedCode={generatedCode}
        sourceUrl={sourceUrl}
      />
    );
  }

  if (status === 'error' && error) {
    return (
      <ExtractionErrorState
        errorType={error.type}
        errorMessage={error.message}
        onRetry={handleRetry}
      />
    );
  }

  return <ExtractionIdleState />;
}

export { ExtractTab };
