import { useEffect, useState } from 'react';

/* eslint-disable-next-line import/extensions */
import { MarkdownRenderer } from '~lib/markdown-renderer';
import type { Framework } from '~mocks/prompts.mock';
import { mockPrompts } from '~mocks/prompts.mock';

interface PromptDisplayProps {
  framework: Framework
}

function PromptDisplay({ framework }: PromptDisplayProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, [framework]);

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '8px',
        maxHeight: '320px',
        overflowY: 'auto',
        transition: 'opacity 150ms ease-out',
        opacity: visible ? 1 : 0,
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
        <MarkdownRenderer markdown={mockPrompts[framework]} />
      </div>
    </div>
  );
}

export { PromptDisplay, type PromptDisplayProps };
