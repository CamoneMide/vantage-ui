import { useCallback, useEffect, useRef, useState } from 'react';

import { ONBOARDING_STEPS } from '../../config/onboarding.config';
import { useTooltipPosition } from '../../hooks/useTooltipPosition';
import { useOnboardingStore } from '../../store/onboardingSlice';
import { useUIStore } from '../../store/ui-slice';
import { OnboardingBackdrop } from './OnboardingBackdrop';
import { OnboardingTooltip } from './OnboardingTooltip';

interface OnboardingOverlayInnerProps {
  step: (typeof ONBOARDING_STEPS)[number]
  totalSteps: number
  onNext: () => void
  onSkip: () => void
  visible: boolean
}

function OnboardingOverlayInner({
  step,
  totalSteps,
  onNext,
  onSkip,
  visible,
}: OnboardingOverlayInnerProps) {
  const { position, currentPlacement, tooltipRef } = useTooltipPosition(
    visible ? step.targetId : null,
    step.placement,
  );

  // Focus trap: focus the first focusable element when tooltip becomes visible
  useEffect(() => {
    if (visible && tooltipRef.current) {
      const firstFocusable = tooltipRef.current.querySelector('button');
      firstFocusable?.focus();
    }
  }, [visible, step.id, tooltipRef]);

  // Trap Tab key within the tooltip
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab' && tooltipRef.current) {
      const focusable = tooltipRef.current.querySelectorAll('button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          (last as HTMLButtonElement).focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          (first as HTMLButtonElement).focus();
        }
      }
    }
  }, [tooltipRef]);

  useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, handleKeyDown]);

  return (
    <>
      {/* aria-hidden background to prevent focus leaking behind overlay */}
      <div aria-hidden="true" style={{ display: 'contents' }}>
        <OnboardingBackdrop targetId={step.targetId} stepId={step.id} />
      </div>
      <OnboardingTooltip
        step={{ ...step, placement: currentPlacement }}
        totalSteps={totalSteps}
        position={position}
        onNext={onNext}
        onSkip={onSkip}
        visible={visible}
        tooltipRef={tooltipRef}
      />
    </>
  );
}

export function OnboardingOverlay() {
  const hasCompletedOnboarding = useOnboardingStore(
    (s) => s.hasCompletedOnboarding,
  );
  const currentStep = useOnboardingStore((s) => s.currentStep);
  const nextStep = useOnboardingStore((s) => s.nextStep);
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const setActiveTab = useUIStore((s) => s.setActiveTab);

  const [visible, setVisible] = useState(false);
  const prevStepRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // When entering step 3, ensure the extract tab is active so the target element exists
  const step = ONBOARDING_STEPS[currentStep];
  useEffect(() => {
    if (!step) return;
    if (step.targetId === 'panel-tab-extract') {
      setActiveTab('extract');
    }
  }, [step, setActiveTab]);

  const handleNext = useCallback(() => {
    if (currentStep >= ONBOARDING_STEPS.length - 1) {
      completeOnboarding();
    } else {
      nextStep();
    }
  }, [currentStep, nextStep, completeOnboarding]);

  if (hasCompletedOnboarding) return null;
  if (!step) return null;

  return (
    <OnboardingOverlayInner
      step={step}
      totalSteps={ONBOARDING_STEPS.length}
      onNext={handleNext}
      onSkip={completeOnboarding}
      visible={visible}
    />
  );
}
