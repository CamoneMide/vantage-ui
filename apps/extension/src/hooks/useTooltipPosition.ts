import { useLayoutEffect, useState } from 'react';

import type { TooltipPlacement } from '../config/onboarding.config';

interface Position {
  top: number
  left: number
}

const GAP = 8;

function calculatePosition(
  targetRect: DOMRect,
  placement: TooltipPlacement,
  tooltipWidth: number,
  tooltipHeight: number,
  viewportWidth: number,
  viewportHeight: number,
): { top: number; left: number; placement: TooltipPlacement } {
  const positions: {
    top: number
    left: number
    placement: TooltipPlacement
  }[] = [
    {
      placement: 'bottom',
      top: targetRect.bottom + GAP,
      left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
    },
    {
      placement: 'top',
      top: targetRect.top - tooltipHeight - GAP,
      left: targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
    },
    {
      placement: 'left',
      top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
      left: targetRect.left - tooltipWidth - GAP,
    },
    {
      placement: 'right',
      top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
      left: targetRect.right + GAP,
    },
  ];

  const preferredIndex = positions.findIndex((p) => p.placement === placement);

  const sorted = [...positions];
  if (preferredIndex > 0) {
    const [pref] = sorted.splice(preferredIndex, 1);
    sorted.unshift(pref);
  }

  const best = sorted.find(
    (pos) => pos.left >= 0
      && pos.left + tooltipWidth <= viewportWidth
      && pos.top >= 0
      && pos.top + tooltipHeight <= viewportHeight,
  );

  if (best) return best;

  return {
    placement: 'bottom',
    top: targetRect.bottom + GAP,
    left: Math.max(
      8,
      Math.min(
        viewportWidth - tooltipWidth - 8,
        targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
      ),
    ),
  };
}

export function useTooltipPosition(
  targetId: string | null,
  placement: TooltipPlacement,
): { position: Position; currentPlacement: TooltipPlacement } {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [currentPlacement, setCurrentPlacement] = useState<TooltipPlacement>(placement);

  useLayoutEffect(() => {
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    const targetRect = target.getBoundingClientRect();
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const result = calculatePosition(
      targetRect,
      placement,
      tooltipWidth,
      tooltipHeight,
      viewportWidth,
      viewportHeight,
    );

    setPosition({ top: result.top, left: result.left });
    setCurrentPlacement(result.placement);
  }, [targetId, placement]);

  return { position, currentPlacement };
}
