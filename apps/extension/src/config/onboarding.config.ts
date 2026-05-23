export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface OnboardingStep {
  id: number
  title: string
  description: string
  targetId: string
  placement: TooltipPlacement
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to VantageUI',
    description: 'Your credits and profile live here.',
    targetId: 'panel-header',
    placement: 'bottom',
  },
  {
    id: 2,
    title: 'Start Extracting',
    description: 'Inspect any live website component with one click.',
    targetId: 'panel-nav-extract',
    placement: 'top',
  },
  {
    id: 3,
    title: 'Activate the Inspector',
    description:
      'Toggle the Ghost Inspector directly on any webpage using Ctrl+Shift+X.',
    targetId: 'panel-tab-extract',
    placement: 'top',
  },
  {
    id: 4,
    title: 'Your Extraction Library',
    description: 'Every component you extract is saved here.',
    targetId: 'panel-nav-history',
    placement: 'top',
  },
  {
    id: 5,
    title: 'Design System Scanner',
    description: "Scan any site's full design system in 2 seconds.",
    targetId: 'panel-nav-design',
    placement: 'top',
  },
];
