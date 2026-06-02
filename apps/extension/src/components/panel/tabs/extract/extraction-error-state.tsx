import { AlertTriangle } from 'lucide-react';

import type { ExtractionErrorType } from '~store/extraction-store';
import { MAX_RETRIES, useExtractionStore } from '~store/extraction-store';
import { useUIStore } from '~store/ui-slice';

interface ExtractionErrorStateProps {
  errorType: ExtractionErrorType
  errorMessage: string
  onRetry: () => void
}

const ERROR_LABELS: Record<ExtractionErrorType, string> = {
  'shadow-dom': 'Shadow DOM Boundary',
  cors: 'Cross-Origin Restriction',
  'llm-timeout': 'AI Timeout',
  'insufficient-credits': 'Insufficient Credits',
  unknown: 'Unexpected Error',
};

function ExtractionErrorState({
  errorType,
  errorMessage,
  onRetry,
}: ExtractionErrorStateProps) {
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const retryCount = useExtractionStore((s) => s.retryCount);
  const canRetry = errorType !== 'insufficient-credits' && retryCount < MAX_RETRIES;
  const isCreditError = errorType === 'insufficient-credits';
  const isExhausted = retryCount >= MAX_RETRIES;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(239,68,68,0.25)',
          borderLeft: '4px solid #EF4444',
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <AlertTriangle size={22} color="#EF4444" strokeWidth={1.5} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0A0A0A',
              }}
            >
              {ERROR_LABELS[errorType]}
            </span>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: 'rgba(10,10,10,0.5)',
                lineHeight: 1.4,
              }}
            >
              {errorMessage}
            </span>
          </div>
        </div>
        {isExhausted && !isCreditError && (
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#EF4444',
              margin: 0,
            }}
          >
            Maximum retry attempts reached. Contact support if this persists.
          </p>
        )}
      </div>

      {isCreditError ? (
        <button
          type="button"
          onClick={() => setActiveTab('credits')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px 24px',
            background: '#053B84',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Purchase Credits
        </button>
      ) : canRetry ? (
        <button
          type="button"
          onClick={onRetry}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            padding: '12px 24px',
            background: '#053B84',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      ) : null}

      {canRetry && !isCreditError && (
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: 'rgba(10,10,10,0.4)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          If the issue persists, try selecting a different element.
        </p>
      )}
    </div>
  );
}

export { ExtractionErrorState };
