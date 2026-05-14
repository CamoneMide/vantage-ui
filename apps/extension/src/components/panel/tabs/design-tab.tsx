import { Palette } from 'lucide-react';

import { PlaceholderCard } from './placeholder-card';

/**
 * DesignTab placeholder screen for the side panel.
 * Surfaces the design system scanner feature (implemented in Phase 12).
 *
 * @returns {JSX.Element} The Design tab placeholder card.
 */
function DesignTab() {
  return (
    <PlaceholderCard
      Icon={Palette}
      heading="Design System Scanner"
      description="Scan any website's design tokens."
    />
  );
}

export { DesignTab };
