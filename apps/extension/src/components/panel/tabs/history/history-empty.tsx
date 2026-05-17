import { Clock } from 'lucide-react';
import { useCallback } from 'react';

/**
 * HistoryEmpty renders the empty state when no extractions exist.
 * Shows an abstract dashed-border square with a Clock icon,
 * descriptive text, and an "Activate Inspector" link that sends
 * a TOGGLE_INSPECTOR message via Chrome runtime.
 *
 * @returns {JSX.Element} The empty state component.
 */
function HistoryEmpty() {
  const handleActivateInspector = useCallback(() => {
    chrome.runtime.sendMessage({ type: 'TOGGLE_INSPECTOR' }).catch(() => {});
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '12px',
          padding: '48px 32px',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            border: '2px dashed rgba(10,10,10,0.15)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Clock size={24} color="rgba(10,10,10,0.3)" strokeWidth={1.5} />
        </div>
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          No extractions yet.
        </h2>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Activate the inspector and click any component to extract your first
          one.
        </p>
        <button
          type="button"
          onClick={handleActivateInspector}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#053B84',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Activate Inspector
        </button>
      </div>
    </div>
  );
}

export { HistoryEmpty };
