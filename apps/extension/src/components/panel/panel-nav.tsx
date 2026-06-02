import { useUIStore } from '../../store/ui-slice';
import type { TabId } from '../../store/ui-slice';
import { NAV_ITEMS } from './nav-items';

function PanelNav() {
  const activeTab = useUIStore((s) => s.activeTab);
  const setActiveTab = useUIStore((s) => s.setActiveTab);

  return (
    <nav
      style={{
        display: 'flex',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
        padding: '0 8px',
        flexShrink: 0,
      }}
      aria-label="Side panel navigation"
    >
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = id === activeTab;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-tab-${id}`}
            id={`panel-nav-${id}`}
            onClick={() => setActiveTab(id as TabId)}
            className="panel-nav-item"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flex: 1,
              padding: '10px 4px',
              border: 'none',
              borderBottom: isActive
                ? '2px solid #053B84'
                : '2px solid transparent',
              background: isActive ? '#F5F5F6' : 'none',
              cursor: 'pointer',
              color: isActive ? '#053B84' : 'rgba(10,10,10,0.6)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              transition: 'background 150ms, color 150ms',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F6';
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLButtonElement).style.background = 'none';
              }
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { PanelNav };
