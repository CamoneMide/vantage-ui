import { useUIStore } from '../../store/ui-slice';
import { CreditsTab } from './tabs/credits-tab';
import { DesignTab } from './tabs/design-tab';
import { ExtractTab } from './tabs/extract-tab';
import { HistoryTab } from './tabs/history-tab';
import { SettingsTab } from './tabs/settings-tab';

/** Maps each TabId to its corresponding tab component. */
const TAB_COMPONENTS = {
  extract: ExtractTab,
  history: HistoryTab,
  design: DesignTab,
  credits: CreditsTab,
  settings: SettingsTab,
} as const;

/**
 * PanelContent scrollable content outlet.
 * Renders the active tab component. A `key={activeTab}` forces a re-mount
 * on tab switch, which re-triggers the fade-up CSS animation each time.
 *
 * @returns {JSX.Element} The scrollable content area for the side panel.
 */
function PanelContent() {
  const activeTab = useUIStore((s) => s.activeTab);
  const ActiveComponent = TAB_COMPONENTS[activeTab];

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* key forces re-mount on tab change to re-trigger fade-up animation */}
      <div
        key={activeTab}
        id={`panel-tab-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`panel-nav-${activeTab}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          animation: 'fadeUp 150ms ease-out forwards',
        }}
      >
        <ActiveComponent />
      </div>
    </div>
  );
}

export { PanelContent };
