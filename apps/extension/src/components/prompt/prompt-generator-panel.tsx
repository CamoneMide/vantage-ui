import { Check, Clipboard } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

import { generatePrompt } from '~mocks/generate-prompt';
import type { Framework } from '~mocks/prompts.mock';
import { useExtractionStore } from '~store/extraction-store';

import { FrameworkSelector } from './framework-selector';
import { PromptDisplay } from './prompt-display';

/**
 * PromptGeneratorPanel assembles the full Prompt Generator view within the
 * Extract tab. It provides a framework selector, a Markdown prompt display,
 * and a "Copy Prompt" button with a 2-second confirmation state.
 *
 * @returns {JSX.Element} The complete prompt generator panel.
 */
function PromptGeneratorPanel() {
  const [framework, setFramework] = useState<Framework>('shadcn');
  const [copied, setCopied] = useState(false);
  const selectedElement = useExtractionStore((s) => s.selectedElement);
  const jsonBlueprint = useExtractionStore((s) => s.jsonBlueprint);
  const generatedCode = useExtractionStore((s) => s.generatedCode);
  const sourceUrl = useExtractionStore((s) => s.sourceUrl);

  const prompt = useMemo(
    () => generatePrompt(framework, selectedElement, jsonBlueprint, generatedCode, sourceUrl),
    [framework, selectedElement, jsonBlueprint, generatedCode, sourceUrl],
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [prompt]);

  const handleFrameworkChange = useCallback((value: Framework) => {
    setFramework(value);
    setCopied(false);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid rgba(10,10,10,0.08)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Prompt Generator
        </h2>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
          }}
        >
          Copy this prompt into Claude, GPT-4o, or v0.dev.
        </p>
      </div>

      {/* Framework Selector */}
      <FrameworkSelector value={framework} onChange={handleFrameworkChange} />

      {/* Prompt Display */}
      <PromptDisplay framework={framework} prompt={prompt} />

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'Outfit, sans-serif',
          fontSize: '15px',
          fontWeight: 600,
          background: copied ? '#16A34A' : '#053B84',
          color: '#FFFFFF',
          transition: 'background 200ms ease-out',
        }}
      >
        {copied ? (
          <Check size={16} strokeWidth={2.5} />
        ) : (
          <Clipboard size={16} strokeWidth={1.5} />
        )}
        {copied ? 'Prompt Copied!' : 'Copy Prompt'}
      </button>
    </div>
  );
}

export { PromptGeneratorPanel };
