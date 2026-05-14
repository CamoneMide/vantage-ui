import { Sparkles } from 'lucide-react';

import { PlaceholderCard } from './placeholder-card';

/**
 * ExtractTab placeholder screen for the side panel.
 * Prompts the user to activate the inspector to extract a component.
 *
 * @returns {JSX.Element} The Extract tab placeholder card.
 */
function ExtractTab() {
  return (
    <PlaceholderCard
      Icon={Sparkles}
      heading="Extract a Component"
      description="Activate the inspector and click any element on the page."
    />
  );
}

export { ExtractTab };
