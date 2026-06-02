import { RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable-next-line import/extensions */
import { useDesignSystemStore } from '~store/designSystemSlice';

import { ColorPaletteGrid } from './design/color-palette-grid';
import { DesignMdViewer } from './design/design-md-viewer';
import { DesignTabIdleState } from './design/design-tab-idle-state';
import { DesignTabScanningState } from './design/design-tab-scanning-state';
import { DownloadButtons } from './design/download-buttons';
import { SpacingSystem } from './design/spacing-system';
import { TypographyScaleTable } from './design/typography-scale-table';

function DesignTab() {
  const scanStatus = useDesignSystemStore((s) => s.scanStatus);
  const colorPalette = useDesignSystemStore((s) => s.colorPalette);
  const typographyScale = useDesignSystemStore((s) => s.typographyScale);
  const spacingSystem = useDesignSystemStore((s) => s.spacingSystem);
  const designMd = useDesignSystemStore((s) => s.designMd);
  const tailwindConfig = useDesignSystemStore((s) => s.tailwindConfig);
  const startScan = useDesignSystemStore((s) => s.startScan);
  const setScanResults = useDesignSystemStore((s) => s.setScanResults);
  const resetScan = useDesignSystemStore((s) => s.resetScan);

  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reScanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (scanTimerRef.current) {
      clearTimeout(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    if (reScanTimerRef.current) {
      clearTimeout(reScanTimerRef.current);
      reScanTimerRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const handleStartScan = useCallback(() => {
    clearTimers();
    startScan();
    scanTimerRef.current = setTimeout(() => {
      setScanResults();
    }, 2500);
  }, [startScan, setScanResults, clearTimers]);

  const handleReScan = useCallback(() => {
    clearTimers();
    resetScan();
    // small delay to let the idle state mount, then start
    reScanTimerRef.current = setTimeout(() => {
      handleStartScan();
    }, 50);
  }, [resetScan, handleStartScan, clearTimers]);

  if (scanStatus === 'idle') {
    return <DesignTabIdleState onStartScan={handleStartScan} />;
  }

  if (scanStatus === 'scanning') {
    return <DesignTabScanningState />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        animation: 'fadeInUp 300ms ease-out forwards',
      }}
    >
      {/* Results header with Re-scan button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#0A0A0A',
              margin: 0,
            }}
          >
            Design System Scanner
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: 'rgba(10,10,10,0.6)',
              margin: 0,
            }}
          >
            Scanned design tokens from the current tab.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReScan}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '6px',
            background: 'transparent',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: '#053B84',
            whiteSpace: 'nowrap',
            transition: 'background 150ms ease-out',
          }}
        >
          <RotateCcw size={14} strokeWidth={1.5} />
          Re-scan
        </button>
      </div>

      {/* Color Palette */}
      <ColorPaletteGrid colors={colorPalette} />

      {/* Typography */}
      <TypographyScaleTable rows={typographyScale} />

      {/* Spacing */}
      <SpacingSystem spacing={spacingSystem} />

      {/* Design Docs */}
      <DesignMdViewer markdown={designMd} />

      {/* Download Buttons */}
      <DownloadButtons designMd={designMd} tailwindConfig={tailwindConfig} />
    </div>
  );
}

export { DesignTab };
