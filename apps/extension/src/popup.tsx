import '@vantage-ui/ui/src/globals.css';

import { AuthenticatedView } from './components/authenticated-view';
import { DevAuthToggle } from './components/dev-auth-toggle';
import { PopupHeader } from './components/popup-header';
import { UnauthenticatedView } from './components/unauthenticated-view';
import { usePopupStore } from './store/popup-store';
import { StoreProvider } from './store/store-provider';

function PopupContent() {
  const authState = usePopupStore((s) => s.authState);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '320px',
        minHeight: '480px',
        background: '#F5F5F6',
        fontFamily: 'DM Sans, sans-serif',
        overflow: 'hidden',
      }}
    >
      <PopupHeader />
      {authState === 'authenticated' ? (
        <AuthenticatedView />
      ) : (
        <UnauthenticatedView />
      )}
      <DevAuthToggle />
    </div>
  );
}

export default function Popup() {
  return (
    <StoreProvider>
      <div style={{ width: '320px', minHeight: '480px' }}>
        <PopupContent />
      </div>
    </StoreProvider>
  );
}
