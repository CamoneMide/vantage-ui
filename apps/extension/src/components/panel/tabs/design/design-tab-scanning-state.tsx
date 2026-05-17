import { Progress } from '@vantage-ui/ui';
import { ScanLine } from 'lucide-react';

function DesignTabScanningState() {
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
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <ScanLine
          size={28}
          color="#053B84"
          strokeWidth={1.5}
          style={{ animation: 'spin 2s linear infinite' }}
        />
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Scanning design tokens…
        </p>
        <div style={{ width: '100%' }}>
          <Progress
            style={{
              height: '4px',
              borderRadius: '4px',
              background: 'rgba(10,10,10,0.08)',
            }}
            className="[&>div]:bg-[#053B84]"
          />
        </div>
      </div>
    </div>
  );
}

export { DesignTabScanningState };
