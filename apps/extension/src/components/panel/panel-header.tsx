import { Avatar, AvatarFallback, CreditBadge } from '@vantage-ui/ui';

import { usePopupStore } from '../../store/popup-store';

function VantageUiLogo() {
  return (
    <svg
      width="20"
      height="20"
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
  );
}

/**
 * PanelHeader component for the side panel.
 * Displays VantageUI branding on the left and the user's credit balance
 * + avatar initial on the right.
 *
 * @returns {JSX.Element} The side panel header bar.
 */
function PanelHeader() {
  const creditBalance = usePopupStore((s) => s.creditBalance);
  const userEmail = usePopupStore((s) => s.userEmail);

  /** Derive avatar initials from email address or fall back to "V". */
  const initials = userEmail ? userEmail.charAt(0).toUpperCase() : 'V';

  return (
    <div
      id="panel-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: '56px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
        flexShrink: 0,
      }}
    >
      {/* Left: Logo + Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <VantageUiLogo />
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            color: '#0A0A0A',
          }}
        >
          VantageUI
        </span>
      </div>

      {/* Right: Credit Badge + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CreditBadge balance={creditBalance} size="sm" />
        <Avatar style={{ width: '32px', height: '32px' }}>
          <AvatarFallback
            style={{
              background: '#053B84',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export { PanelHeader };
