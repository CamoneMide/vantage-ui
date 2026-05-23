import { Sparkles } from 'lucide-react';

import type { OnboardingStep } from '../../config/onboarding.config';

interface OnboardingTooltipProps {
  step: OnboardingStep
  totalSteps: number
  position: { top: number; left: number }
  onNext: () => void
  onSkip: () => void
  visible: boolean
}

export function OnboardingTooltip({
  step,
  totalSteps,
  position,
  onNext,
  onSkip,
  visible,
}: OnboardingTooltipProps) {
  const isLastStep = step.id === totalSteps;

  return (
    <div
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9999,
        width: '280px',
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 120ms ease-out, transform 120ms ease-out',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          color: 'rgba(10,10,10,0.5)',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {step.id}
        {' '}
        of
        {totalSteps}
      </span>

      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#0A0A0A',
          margin: 0,
          marginBottom: '6px',
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          color: 'rgba(10,10,10,0.7)',
          margin: 0,
          marginBottom: '16px',
          lineHeight: 1.5,
        }}
      >
        {step.description}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background:
                  i === step.id - 1 ? '#053B84' : 'rgba(10,10,10,0.15)',
                transition: 'background 150ms ease',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isLastStep && (
            <button
              type="button"
              onClick={onSkip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(10,10,10,0.4)',
                padding: 0,
                textDecoration: 'none',
              }}
            >
              Skip
            </button>
          )}

          {isLastStep ? (
            <button
              type="button"
              onClick={onNext}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#053B84',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0px 2px 6px rgba(5, 59, 132, 0.2)',
              }}
            >
              Get Started
              <Sparkles size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              style={{
                background: '#053B84',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                boxShadow: '0px 2px 6px rgba(5, 59, 132, 0.2)',
              }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
