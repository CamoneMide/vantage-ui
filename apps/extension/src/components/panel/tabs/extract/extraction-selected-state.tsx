import { Check, RefreshCw, Sparkles } from 'lucide-react';

import type { SelectedElementData } from '~schemas/inspector.schema';

interface ExtractionSelectedStateProps {
  selectedElement: SelectedElementData
  creditBalance: number
  onExtract: () => void
  onReselect: () => void
}

function ExtractionSelectedState({
  selectedElement,
  creditBalance,
  onExtract,
  onReselect,
}: ExtractionSelectedStateProps) {
  const hasSufficientCredits = creditBalance >= 1;
  const classes = selectedElement.className?.split(/\s+/).slice(0, 3) ?? [];
  const ariaEntries = Object.entries(selectedElement.ariaAttributes);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        flex: 1,
      }}
    >
      {/* Heading */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={16} color="#22C55E" strokeWidth={2.5} />
        </div>
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Component Selected
        </h2>
      </div>

      {/* Element Info Card */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(10,10,10,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Element
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <code
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                color: '#053B84',
                background: 'rgba(5,59,132,0.08)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {'<'}
              {selectedElement.tagName}
              {'>'}
            </code>
            {classes.map((cls) => (
              <code
                key={cls}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: 'rgba(10,10,10,0.6)',
                  background: 'rgba(10,10,10,0.05)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                .
                {cls}
              </code>
            ))}
          </div>
        </div>

        {ariaEntries.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(10,10,10,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Attributes
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {ariaEntries.map(([key, value]) => (
                <span
                  key={key}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '11px',
                    color: '#6B7280',
                    background: 'rgba(107,114,128,0.1)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid rgba(107,114,128,0.15)',
                  }}
                >
                  {`${key}="${value.length > 20 ? `${value.slice(0, 20)}...` : value}"`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <button
        type="button"
        onClick={onExtract}
        disabled={!hasSufficientCredits}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 24px',
          background: hasSufficientCredits ? '#053B84' : 'rgba(10,10,10,0.15)',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '15px',
          fontWeight: 600,
          cursor: hasSufficientCredits ? 'pointer' : 'not-allowed',
          transition: 'opacity 0.15s',
        }}
      >
        <Sparkles size={18} strokeWidth={1.5} />
        Extract Component
        {!hasSufficientCredits && (
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
            }}
          >
            — 0 credits
          </span>
        )}
        {hasSufficientCredits && (
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              opacity: 0.8,
            }}
          >
            — 1 credit
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onReselect}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          width: '100%',
          padding: '10px 24px',
          background: 'transparent',
          color: 'rgba(10,10,10,0.6)',
          border: '1px solid rgba(10,10,10,0.15)',
          borderRadius: '8px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'opacity 0.15s',
        }}
      >
        <RefreshCw size={14} strokeWidth={1.5} />
        Re-select element
      </button>

      {!hasSufficientCredits && (
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: '#EF4444',
            margin: 0,
            textAlign: 'center',
          }}
        >
          Not enough credits. Purchase credits to extract.
        </p>
      )}
    </div>
  );
}

export { ExtractionSelectedState };
