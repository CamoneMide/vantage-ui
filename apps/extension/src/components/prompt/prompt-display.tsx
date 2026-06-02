import { useEffect, useRef, useState } from 'react';

/* eslint-disable-next-line import/extensions */
import { MarkdownRenderer } from '~lib/markdown-renderer';
import type { Framework } from '~mocks/prompts.mock';

interface PromptDisplayProps {
  framework: Framework
  prompt: string
}

function PromptDisplay({ framework, prompt }: PromptDisplayProps) {
  const [prevFramework, setPrevFramework] = useState<Framework | null>(null);
  const [phase, setPhase] = useState<'idle' | 'fade-out' | 'fade-in'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  const prevPromptRef = useRef<string>(prompt);

  useEffect(() => {
    if (framework === prevFramework) return;
    setPhase('fade-out');
    const timer = setTimeout(() => {
      setPrevFramework(framework);
      setPhase('fade-in');
    }, 150);
    return () => clearTimeout(timer);
  }, [framework, prevFramework]);

  useEffect(() => {
    if (phase === 'fade-in') {
      const timer = setTimeout(() => setPhase('idle'), 150);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'idle') {
      prevPromptRef.current = prompt;
    }
  }, [phase, prompt]);

  const currentOpacity = phase === 'idle' ? 1 : phase === 'fade-out' ? 0 : 1;
  const prevOpacity = phase === 'fade-out' ? 1 : 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '8px',
        maxHeight: '320px',
        overflowY: 'auto',
        minHeight: '100px',
      }}
    >
      <div
        style={{
          padding: '16px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'rgba(10,10,10,0.8)',
          transition: 'opacity 150ms ease-out',
          opacity: currentOpacity,
        }}
      >
        <MarkdownRenderer markdown={prompt} />
      </div>
      {prevFramework && prevFramework !== framework && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            padding: '16px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            lineHeight: 1.6,
            color: 'rgba(10,10,10,0.8)',
            transition: 'opacity 150ms ease-out',
            opacity: prevOpacity,
            pointerEvents: 'none',
          }}
        >
          <MarkdownRenderer markdown={prevPromptRef.current} />
        </div>
      )}
    </div>
  );
}

export { PromptDisplay, type PromptDisplayProps };
