import '@vantage-ui/ui/src/globals.css';

import { useCallback, useEffect, useState } from 'react';

import { AuthenticatedView } from './components/authenticated-view';
import { DevAuthToggle } from './components/dev-auth-toggle';
import { PopupHeader } from './components/popup-header';
import { UnauthenticatedView } from './components/unauthenticated-view';
import { usePopupStore } from './store/popup-store';
import { StoreProvider } from './store/store-provider';

function PopupContent() {
  const [hydrated, setHydrated] = useState(usePopupStore.persist.hasHydrated());
  const authState = usePopupStore((s) => s.authState);

  const rehydrate = useCallback(() => {
    usePopupStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const unsub = usePopupStore.persist.onFinishHydration(() => setHydrated(true));
    return () => unsub();
  }, []);

  // Cross-context auth sync: when another extension context (e.g. side panel)
  // modifies auth state in chrome.storage.local, re-hydrate immediately.
  useEffect(() => {
    function handleStorageChange(
      changes: Record<string, chrome.storage.StorageChange>,
      areaName: string,
    ) {
      if (areaName === 'local' && changes['vantageui-auth']) {
        rehydrate();
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, [rehydrate]);

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
      {hydrated && authState === 'authenticated' && <AuthenticatedView />}
      {hydrated && authState !== 'authenticated' && <UnauthenticatedView />}
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
