import { useEffect, useMemo, useState } from 'react';

interface OnboardingBackdropProps {
  targetId: string | null
  stepId: number
}

export function OnboardingBackdrop({
  targetId,
  stepId,
}: OnboardingBackdropProps) {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        return;
      }
    }
    setTargetRect(null);
  }, [targetId]);

  const clipPath = useMemo(() => {
    if (!targetRect) return 'none';
    const padding = 4;
    const x = targetRect.left - padding;
    const y = targetRect.top - padding;
    const w = targetRect.width + padding * 2;
    const h = targetRect.height + padding * 2;

    return `polygon(
      0% 0%,
      0% 100%,
      100% 100%,
      100% 0%,
      ${x}px 0%,
      ${x}px ${y}px,
      ${x + w}px ${y}px,
      ${x + w}px ${y + h}px,
      ${x}px ${y + h}px,
      ${x}px 100%,
      0% 100%,
      0% 0%
    )`;
  }, [targetRect]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'rgba(10,10,10,0.55)',
        clipPath,
        transition: 'clip-path 250ms ease',
      }}
    >
      {targetRect && (
        <div
          style={{
            position: 'absolute',
            left: targetRect.left - 6,
            top: targetRect.top - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            borderRadius: '4px',
            border: '2px solid #053B84',
            opacity: 0,
            animation: 'onboardingPulse 1.5s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      )}
      <style>
        {`
        @keyframes onboardingPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.4; }
        }
      `}
      </style>
    </div>
  );
}
