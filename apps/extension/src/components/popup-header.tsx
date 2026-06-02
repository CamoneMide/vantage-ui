import { CreditBadge } from '@vantage-ui/ui';

import { usePopupStore } from '../store/popup-store';

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

function PopupHeader() {
  const creditBalance = usePopupStore((s) => s.creditBalance);
  const authState = usePopupStore((s) => s.authState);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <VantageUiLogo />
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '16px',
            color: '#0A0A0A',
          }}
        >
          VantageUI
        </span>
      </div>
      {authState === 'authenticated' && <CreditBadge balance={creditBalance} size="sm" />}
    </div>
  );
}

export { PopupHeader };
