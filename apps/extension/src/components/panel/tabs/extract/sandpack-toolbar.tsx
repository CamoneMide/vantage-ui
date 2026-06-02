import { useSandpack } from '@codesandbox/sandpack-react';
import { Clipboard, ClipboardCheck, Download } from 'lucide-react';
import { useCallback, useState } from 'react';

interface SandpackToolbarProps {
  sourceUrl: string | null
}

function SandpackToolbar({ sourceUrl }: SandpackToolbarProps) {
  const { sandpack } = useSandpack();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const code = sandpack.files['/App.tsx']?.code;
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [sandpack.files]);

  const handleDownload = useCallback(() => {
    const code = sandpack.files['/App.tsx']?.code;
    if (!code) return;
    const date = new Date().toISOString().split('T')[0];
    const domain = sourceUrl
      ? sourceUrl.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-')
      : 'unknown';
    const attrib = `// Component extracted from: ${sourceUrl ?? 'unknown source'} on ${date} using VantageUI.\n\n`;
    const blob = new Blob([attrib + code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VantageUI-${domain}-${date}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [sandpack.files, sourceUrl]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}
    >
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#0A0A0A',
        }}
      >
        Sandbox
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#FFFFFF',
            border: '1px solid rgba(10,10,10,0.1)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: copied ? '#16A34A' : 'rgba(10,10,10,0.6)',
            transition: 'color 0.15s',
          }}
        >
          {copied ? <ClipboardCheck size={14} /> : <Clipboard size={14} />}
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            background: '#FFFFFF',
            border: '1px solid rgba(10,10,10,0.1)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 500,
            color: 'rgba(10,10,10,0.6)',
          }}
        >
          <Download size={14} />
          .tsx
        </button>
      </div>
    </div>
  );
}

export { SandpackToolbar };
