/* eslint-disable-next-line import/extensions */
import { MarkdownRenderer } from '~lib/markdown-renderer';

interface DesignMdViewerProps {
  markdown: string
}

/**
 * DesignMdViewer renders the generated DESIGN.md content as formatted Markdown
 * inside a scrollable container with a custom thin scrollbar.
 *
 * @param {DesignMdViewerProps} props - The Markdown string to render.
 * @returns {JSX.Element} The DESIGN.md viewer.
 */
function DesignMdViewer({ markdown }: DesignMdViewerProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          color: '#0A0A0A',
          margin: 0,
        }}
      >
        Design Docs
      </h3>
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '8px',
          maxHeight: '280px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            padding: '16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'rgba(10,10,10,0.8)',
          }}
        >
          <MarkdownRenderer markdown={markdown} />
        </div>
      </div>
    </div>
  );
}

export { DesignMdViewer };
