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
import { SandpackContainer } from './extract/sandpack-container';

function ExtractTab() {
  const status = useExtractionStore((s) => s.status);
  const selectedElement = useExtractionStore((s) => s.selectedElement);
  const currentStep = useExtractionStore((s) => s.currentStep);
  const jsonBlueprint = useExtractionStore((s) => s.jsonBlueprint);
  const generatedCode = useExtractionStore((s) => s.generatedCode);
  const sourceUrl = useExtractionStore((s) => s.sourceUrl);
  const error = useExtractionStore((s) => s.error);
  const sandboxView = useExtractionStore((s) => s.sandboxView);
  const setSelectedElement = useExtractionStore((s) => s.setSelectedElement);
  const setSandboxView = useExtractionStore((s) => s.setSandboxView);
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

  const handleOpenSandbox = useCallback(() => {
    setSandboxView(true);
  }, [setSandboxView]);

  const handleBackToResults = useCallback(() => {
    setSandboxView(false);
  }, [setSandboxView]);

  if (status === 'success' && sandboxView && generatedCode) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <button
          type="button"
          onClick={handleBackToResults}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(10,10,10,0.6)',
            alignSelf: 'flex-start',
          }}
        >
          ← Back to Results
        </button>
        <SandpackContainer code={generatedCode} sourceUrl={sourceUrl} />
      </div>
    );
  }

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
        onOpenSandbox={handleOpenSandbox}
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
