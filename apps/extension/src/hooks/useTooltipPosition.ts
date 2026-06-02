import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import type { TooltipPlacement } from '../config/onboarding.config';

interface Position {
  top: number
  left: number
}

const GAP = 8;
const TOOLTIP_WIDTH = 280;

function calculatePosition(
  targetRect: DOMRect,
  placement: TooltipPlacement,
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
      left: targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2,
    },
    {
      placement: 'top',
      top: targetRect.top - tooltipHeight - GAP,
      left: targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2,
    },
    {
      placement: 'left',
      top: targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
      left: targetRect.left - TOOLTIP_WIDTH - GAP,
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
      && pos.left + TOOLTIP_WIDTH <= viewportWidth
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
        viewportWidth - TOOLTIP_WIDTH - 8,
        targetRect.left + targetRect.width / 2 - TOOLTIP_WIDTH / 2,
      ),
    ),
  };
}

interface TooltipPositionResult {
  position: Position
  currentPlacement: TooltipPlacement
  tooltipRef: React.RefObject<HTMLDivElement | null>
}

export function useTooltipPosition(
  targetId: string | null,
  placement: TooltipPlacement,
): TooltipPositionResult {
  const defaultPosition = { top: 0, left: 0 };
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [currentPlacement, setCurrentPlacement] = useState<TooltipPlacement>(placement);

  const recalculate = useCallback(() => {
    if (!targetId) {
      return undefined;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      return undefined;
    }

    const targetRect = target.getBoundingClientRect();
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const result = calculatePosition(
      targetRect,
      placement,
      tooltipHeight,
      viewportWidth,
      viewportHeight,
    );

    setPosition({ top: result.top, left: result.left });
    setCurrentPlacement(result.placement);

    return undefined;
  }, [targetId, placement]);

  useLayoutEffect(() => {
    recalculate();
  }, [recalculate]);

  // Recalculate on resize or scroll
  useLayoutEffect(() => {
    if (!targetId) {
      return undefined;
    }

    const handleChange = () => recalculate();
    window.addEventListener('resize', handleChange);
    window.addEventListener('scroll', handleChange, true);
    return () => {
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('scroll', handleChange, true);
    };
  }, [targetId, recalculate]);

  return { position, currentPlacement, tooltipRef };
}
