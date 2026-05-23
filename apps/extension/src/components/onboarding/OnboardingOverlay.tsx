import { useEffect, useState } from 'react';

import { ONBOARDING_STEPS } from '../../config/onboarding.config';
import { useTooltipPosition } from '../../hooks/useTooltipPosition';
import { useOnboardingStore } from '../../store/onboardingSlice';
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
  const { position, currentPlacement } = useTooltipPosition(
    visible ? step.targetId : null,
    step.placement,
  );

  return (
    <>
      <OnboardingBackdrop targetId={step.targetId} stepId={step.id} />
      <OnboardingTooltip
        step={{ ...step, placement: currentPlacement }}
        totalSteps={totalSteps}
        position={position}
        onNext={onNext}
        onSkip={onSkip}
        visible={visible}
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

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (hasCompletedOnboarding) return null;

  const step = ONBOARDING_STEPS[currentStep];
  if (!step) return null;

  return (
    <OnboardingOverlayInner
      step={step}
      totalSteps={ONBOARDING_STEPS.length}
      onNext={() => {
        if (currentStep >= ONBOARDING_STEPS.length - 1) {
          completeOnboarding();
        } else {
          nextStep();
        }
      }}
      onSkip={completeOnboarding}
      visible={visible}
    />
  );
}
