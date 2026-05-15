import {
  Check,
  Code,
  ExternalLink,
  FileCode,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';

import type { JsonBlueprint } from '~store/extraction-store';

interface ExtractionSuccessStateProps {
  jsonBlueprint: JsonBlueprint
  generatedCode: string | null
  sourceUrl: string | null
  onOpenSandbox?: () => void
}

function ExtractionSuccessState({
  jsonBlueprint,
  generatedCode,
  sourceUrl,
  onOpenSandbox = () => {},
}: ExtractionSuccessStateProps) {
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [showCode, setShowCode] = useState(false);

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#0A0A0A',
              margin: 0,
            }}
          >
            Extraction Complete
          </h2>
          {sourceUrl && (
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: 'rgba(10,10,10,0.4)',
              }}
            >
              from
              {' '}
              {sourceUrl}
            </span>
          )}
        </div>
      </div>

      {/* Blueprint Preview */}
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <button
          type="button"
          onClick={() => setShowBlueprint(!showBlueprint)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '14px 16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#0A0A0A',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={16} color="#053B84" strokeWidth={1.5} />
            JSON Blueprint
          </span>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: 'rgba(10,10,10,0.4)',
              transition: 'transform 0.15s',
              transform: showBlueprint ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </span>
        </button>
        {showBlueprint && (
          <pre
            style={{
              margin: 0,
              padding: '16px',
              background: 'rgba(10,10,10,0.03)',
              borderTop: '1px solid rgba(10,10,10,0.08)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              lineHeight: 1.6,
              color: 'rgba(10,10,10,0.8)',
              overflow: 'auto',
              maxHeight: '240px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {JSON.stringify(jsonBlueprint, null, 2)}
          </pre>
        )}
      </div>

      {/* Generated Code */}
      {generatedCode && (
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(10,10,10,0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <button
            type="button"
            onClick={() => setShowCode(!showCode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0A0A0A',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCode size={16} color="#053B84" strokeWidth={1.5} />
              Generated Code
            </span>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: 'rgba(10,10,10,0.4)',
                transition: 'transform 0.15s',
                transform: showCode ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </button>
          {showCode && (
            <pre
              style={{
                margin: 0,
                padding: '16px',
                background: 'rgba(10,10,10,0.03)',
                borderTop: '1px solid rgba(10,10,10,0.08)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'rgba(10,10,10,0.8)',
                overflow: 'auto',
                maxHeight: '240px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {generatedCode}
            </pre>
          )}
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: 'auto',
        }}
      >
        <button
          type="button"
          onClick={onOpenSandbox}
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
          <ExternalLink size={16} strokeWidth={1.5} />
          Open in Sandbox
        </button>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
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
          }}
        >
          <MessageSquare size={14} strokeWidth={1.5} />
          Generate Prompt
        </button>
      </div>
    </div>
  );
}

export { ExtractionSuccessState };
