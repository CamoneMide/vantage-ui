import { Settings } from 'lucide-react';

import { PlaceholderCard } from './placeholder-card';

/**
 * SettingsTab placeholder screen for the side panel.
 *
 * @returns {JSX.Element} The Settings tab placeholder card.
 */
function SettingsTab() {
  return (
    <PlaceholderCard
      Icon={Settings}
      heading="Settings"
      description="Coming soon."
    />
  );
}

export { SettingsTab };
