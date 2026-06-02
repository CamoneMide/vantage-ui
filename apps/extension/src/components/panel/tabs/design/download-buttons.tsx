import { Download } from 'lucide-react';
import { useCallback, useState } from 'react';

interface DownloadButtonsProps {
  designMd: string
  tailwindConfig: string
}

/**
 * DownloadButtons renders two secondary buttons for downloading
 * DESIGN.md and tailwind.config.js as files.
 * Each button shows a brief loading indicator on click.
 *
 * @param {DownloadButtonsProps} props - The Markdown and Tailwind config content.
 * @returns {JSX.Element} The download action buttons.
 */
function DownloadButtons({ designMd, tailwindConfig }: DownloadButtonsProps) {
  const [downloadingMd, setDownloadingMd] = useState(false);
  const [downloadingTw, setDownloadingTw] = useState(false);

  const handleDownloadMd = useCallback(() => {
    setDownloadingMd(true);
    const blob = new Blob([designMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DESIGN.md';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadingMd(false), 300);
  }, [designMd]);

  const handleDownloadTw = useCallback(() => {
    setDownloadingTw(true);
    const blob = new Blob([tailwindConfig], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind.config.js';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloadingTw(false), 300);
  }, [tailwindConfig]);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button
        type="button"
        onClick={handleDownloadMd}
        disabled={downloadingMd}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          flex: 1,
          padding: '10px 16px',
          border: '1px solid rgba(10,10,10,0.1)',
          borderRadius: '8px',
          background: '#FFFFFF',
          cursor: downloadingMd ? 'default' : 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#0A0A0A',
          transition: 'background 150ms ease-out',
        }}
      >
        <Download
          size={14}
          strokeWidth={1.5}
          style={
            downloadingMd ? { animation: 'spin 1s linear infinite' } : undefined
          }
        />
        ↓ DESIGN.md
      </button>
      <button
        type="button"
        onClick={handleDownloadTw}
        disabled={downloadingTw}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          flex: 1,
          padding: '10px 16px',
          border: '1px solid rgba(10,10,10,0.1)',
          borderRadius: '8px',
          background: '#FFFFFF',
          cursor: downloadingTw ? 'default' : 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: '#0A0A0A',
          transition: 'background 150ms ease-out',
        }}
      >
        <Download
          size={14}
          strokeWidth={1.5}
          style={
            downloadingTw ? { animation: 'spin 1s linear infinite' } : undefined
          }
        />
        ↓ tailwind.config.js
      </button>
    </div>
  );
}

export { DownloadButtons };
