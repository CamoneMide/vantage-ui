import { usePopupStore } from '../store/popup-store';

function UnauthenticatedView() {
  const mockLogin = usePopupStore((s) => s.mockLogin);
  const mockSignup = usePopupStore((s) => s.mockSignup);

  const handleSignIn = async () => {
    await mockLogin('user@example.com');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.windowId) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
      }
    });
  };

  const handleCreateAccount = async () => {
    await mockSignup('user@example.com');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.windowId) {
        chrome.sidePanel.open({ windowId: tabs[0].windowId });
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        flex: 1,
        minHeight: 0,
        animation: 'fadeUp 150ms ease-out forwards',
      }}
    >
      <div style={{ marginBottom: '24px' }}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="20" rx="4" fill="#053B84" />
          <path
            d="M5 14L10 5L15 14"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 500,
          fontSize: '18px',
          color: '#0A0A0A',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        Extract any UI.
        <br />
        Ship in seconds.
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          marginTop: '32px',
        }}
      >
        <button
          type="button"
          onClick={handleSignIn}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#053B84',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0px 2px 4px rgba(5,59,132,0.20)',
          }}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={handleCreateAccount}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            color: '#0A0A0A',
            border: '1px solid rgba(10,10,10,0.1)',
            borderRadius: '8px',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export { UnauthenticatedView };
