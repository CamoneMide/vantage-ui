import { CreditBadge } from '@vantage-ui/ui';

import { usePopupStore } from '../store/popup-store';
import { LowCreditWarning } from './low-credit-warning';

function AuthenticatedView() {
  const creditBalance = usePopupStore((s) => s.creditBalance);
  const userEmail = usePopupStore((s) => s.userEmail);
  const inspectorActive = usePopupStore((s) => s.inspectorActive);
  const mockLogout = usePopupStore((s) => s.mockLogout);

  const handleToggleInspector = async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0 && tabs[0].id) {
        await chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_INSPECTOR' });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error sending TOGGLE_INSPECTOR:', error);
    }
  };

  const handleOpenSidePanel = async () => {
    try {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (tabs.length > 0 && tabs[0].id) {
        await chrome.sidePanel.open({ tabId: tabs[0].id });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error opening side panel:', error);
    }
  };

  return (
    <div
      style={{
        margin: '12px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      {userEmail && (
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            marginBottom: '12px',
          }}
        >
          {userEmail}
        </p>
      )}

      <LowCreditWarning balance={creditBalance} />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <CreditBadge balance={creditBalance} size="md" />
      </div>

      <button
        type="button"
        onClick={handleToggleInspector}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: inspectorActive ? '#DC2626' : '#053B84',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '8px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '15px',
          fontWeight: 500,
          cursor: 'pointer',
          boxShadow: inspectorActive
            ? '0px 2px 4px rgba(220,38,38,0.20)'
            : '0px 2px 4px rgba(5,59,132,0.20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '12px',
          transition: 'background-color 150ms ease-out',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
        {inspectorActive ? 'Deactivate Inspector' : 'Activate Inspector'}
      </button>

      <button
        type="button"
        onClick={handleOpenSidePanel}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: 'transparent',
          color: '#0A0A0A',
          border: '1px solid rgba(10,10,10,0.1)',
          borderRadius: '8px',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '15px',
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9z" />
          <path d="M12 7v4l3 3" />
        </svg>
        Open Side Panel
      </button>

      <button
        type="button"
        onClick={mockLogout}
        style={{
          alignSelf: 'flex-end',
          background: 'none',
          border: 'none',
          padding: '4px 0',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          color: '#053B84',
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export { AuthenticatedView };
