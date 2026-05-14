import { Zap } from 'lucide-react';

import { PlaceholderCard } from './placeholder-card';

/**
 * CreditsTab placeholder screen for the side panel.
 * Displays credit balance management (implemented in Phase 13).
 *
 * @returns {JSX.Element} The Credits tab placeholder card.
 */
function CreditsTab() {
  return (
    <PlaceholderCard
      Icon={Zap}
      heading="Credit Balance"
      description="Manage your extraction credits."
    />
  );
}

export { CreditsTab };
