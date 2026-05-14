/**
 * AuthGate component for the side panel.
 * Shown when the user is unauthenticated. Hides the main nav and presents
 * a sign-in / create account prompt. Login/Signup forms are built in Phase 6.
 *
 * @returns {JSX.Element} The authentication gate screen.
 */
function AuthGate() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '24px',
        background: '#F5F5F6',
        animation: 'fadeUp 150ms ease-out forwards',
      }}
    >
      {/* VantageUI logo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: '24px' }}
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

      <h1
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 500,
          fontSize: '18px',
          color: '#0A0A0A',
          textAlign: 'center',
          margin: '0 0 8px',
        }}
      >
        Extract any UI.
        <br />
        Ship in seconds.
      </h1>

      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          color: 'rgba(10,10,10,0.6)',
          textAlign: 'center',
          margin: '0 0 32px',
        }}
      >
        Sign in to start extracting components.
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '280px',
        }}
      >
        <button
          type="button"
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

export { AuthGate };
