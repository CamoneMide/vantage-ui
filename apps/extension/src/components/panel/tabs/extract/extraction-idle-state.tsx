import { Sparkles } from 'lucide-react';

function ExtractionIdleState() {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
          border: '2px dashed rgba(5,59,132,0.3)',
          borderRadius: '12px',
          padding: '32px',
          gap: '12px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(5,59,132,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkles size={24} color="#053B84" strokeWidth={1.5} />
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
          No component selected
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
          Activate the inspector tool and click any element on the page to
          extract it.
        </p>
        <kbd
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            background: 'rgba(10,10,10,0.05)',
            border: '1px solid rgba(10,10,10,0.1)',
            borderRadius: '6px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: 'rgba(10,10,10,0.5)',
            marginTop: '4px',
          }}
        >
          <span style={{ fontSize: '13px' }}>⌘</span>
          {' '}
          <span>⇧</span>
          {' '}
          <span>X</span>
        </kbd>
      </div>
    </div>
  );
}

export { ExtractionIdleState };
