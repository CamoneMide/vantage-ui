import { Palette, ScanLine } from 'lucide-react';

interface DesignTabIdleStateProps {
  onStartScan: () => void
}

function DesignTabIdleState({ onStartScan }: DesignTabIdleStateProps) {
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
          padding: '32px',
          gap: '12px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <Palette size={32} color="#053B84" strokeWidth={1.5} />
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Design System Scanner
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
          Analyze any website&apos;s colors, typography, and spacing tokens in
          one click.
        </p>
        <button
          type="button"
          onClick={onStartScan}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '4px',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            background: '#053B84',
            color: '#FFFFFF',
            transition: 'background 200ms ease-out',
          }}
        >
          <ScanLine size={16} strokeWidth={1.5} />
          Run Theme Scan
        </button>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
          }}
        >
          Scans the current tab&apos;s computed styles.
        </p>
      </div>
    </div>
  );
}

export { DesignTabIdleState };
