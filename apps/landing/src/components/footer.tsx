'use client';

export function Footer() {
  return (
    <footer
      style={{
        background: '#F5F5F6',
        borderTop: '1px solid rgba(10,10,10,0.08)',
        padding: '40px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Left: Logo + tagline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="6" fill="#053B84" />
                <path
                  d="M8 20L14 8L20 20"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M11 15.5H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-display), Outfit, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                }}
              >
                VantageUI
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body), DM Sans, sans-serif',
                fontSize: '14px',
                color: 'rgba(10,10,10,0.6)',
              }}
            >
              Extract any UI. Ship in seconds.
            </span>
          </div>

          {/* Right: Links */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
            }}
          >
            <button
              type="button"
              style={{
                fontFamily: 'var(--font-body), DM Sans, sans-serif',
                fontSize: '14px',
                color: 'rgba(10,10,10,0.5)',
                textDecoration: 'none',
                transition: 'color 150ms',
                background: 'none',
                border: 'none',
                cursor: 'default',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#053B84';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(10,10,10,0.5)';
              }}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              style={{
                fontFamily: 'var(--font-body), DM Sans, sans-serif',
                fontSize: '14px',
                color: 'rgba(10,10,10,0.5)',
                textDecoration: 'none',
                transition: 'color 150ms',
                background: 'none',
                border: 'none',
                cursor: 'default',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = '#053B84';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(10,10,10,0.5)';
              }}
            >
              Terms of Service
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body), DM Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(10,10,10,0.4)',
            borderTop: '1px solid rgba(10,10,10,0.06)',
            paddingTop: '20px',
          }}
        >
          &copy; 2026 VantageUI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
