import { usePopupStore } from '../store/popup-store';

function DevAuthToggle() {
  const authState = usePopupStore((s) => s.authState);
  const toggleAuth = usePopupStore((s) => s.toggleAuth);

  const isDev = process.env.NODE_ENV === 'development'
    && typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('dev') === '1';

  if (!isDev) return null;

  return (
    <div
      style={{
        padding: '8px 16px',
        borderTop: '1px solid rgba(10,10,10,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: '#F4F4F5',
        fontSize: '12px',
        fontFamily: 'DM Sans, sans-serif',
        color: '#71717A',
      }}
    >
      <span>
        Dev: Auth
        {authState === 'authenticated' ? 'On' : 'Off'}
      </span>
      <button
        type="button"
        aria-label="Toggle authentication state"
        onClick={toggleAuth}
        style={{
          width: '36px',
          height: '18px',
          borderRadius: '9px',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          background: authState === 'authenticated' ? '#053B84' : '#E4E4E7',
          transition: 'background 150ms',
          padding: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: authState === 'authenticated' ? '18px' : '2px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: '#FFFFFF',
            transition: 'left 150ms',
            display: 'block',
          }}
        />
      </button>
    </div>
  );
}

export { DevAuthToggle };
