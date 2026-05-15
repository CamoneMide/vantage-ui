import { StepperProgress } from '@vantage-ui/ui';
import { Loader2 } from 'lucide-react';

import type { ExtractionStep } from '~store/extraction-store';

interface ExtractionProgressStateProps {
  currentStep: ExtractionStep
}

const STEPS = [
  'Capturing DOM',
  'Normalizing Blueprint',
  'Synthesizing Code',
] as const;

const STEP_DESCRIPTIONS: Record<
ExtractionStep,
{ title: string; description: string }
> = {
  capturing: {
    title: 'Capturing the DOM subtree',
    description:
      'Reading the selected element and its children to build a raw snapshot.',
  },
  normalizing: {
    title: 'Normalizing into a blueprint',
    description:
      'Stripping noise, resolving computed styles, and inferring intent.',
  },
  synthesizing: {
    title: 'Synthesizing component code',
    description:
      'Generating clean, typed components from the normalized blueprint.',
  },
};

const STEP_INDEX: Record<ExtractionStep, number> = {
  capturing: 0,
  normalizing: 1,
  synthesizing: 2,
};

function ExtractionProgressState({
  currentStep,
}: ExtractionProgressStateProps) {
  const stepInfo = STEP_DESCRIPTIONS[currentStep];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1,
        padding: '8px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '12px',
          padding: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Loader2
            size={20}
            color="#053B84"
            strokeWidth={2}
            style={{ animation: 'spin 1s linear infinite' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                color: '#0A0A0A',
              }}
            >
              {stepInfo.title}
            </span>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: 'rgba(10,10,10,0.5)',
              }}
            >
              {stepInfo.description}
            </span>
          </div>
        </div>

        <StepperProgress
          steps={[...STEPS]}
          currentStep={STEP_INDEX[currentStep]}
        />
      </div>
    </div>
  );
}

export { ExtractionProgressState };
