import { Clock } from 'lucide-react';

import { PlaceholderCard } from './placeholder-card';

/**
 * HistoryTab placeholder screen for the side panel.
 * Displays an empty state until extractions have been made.
 *
 * @returns {JSX.Element} The History tab placeholder card.
 */
function HistoryTab() {
  return (
    <PlaceholderCard
      Icon={Clock}
      heading="No History Yet"
      description="Your extracted components will appear here."
    />
  );
}

export { HistoryTab };
