import '@vantage-ui/ui/src/globals.css';

import { Toaster } from '@vantage-ui/ui';

import { AuthGate } from './components/panel/auth-gate';
import { PanelContent } from './components/panel/panel-content';
import { PanelHeader } from './components/panel/panel-header';
import { PanelNav } from './components/panel/panel-nav';
import { usePopupStore } from './store/popup-store';
import { StoreProvider } from './store/store-provider';

/**
 * SidePanelShell renders the authenticated layout:
 * header + tab nav + scrollable content outlet.
 * The `animate-fade-in` class triggers the CSS animation defined in globals.css.
 */
function SidePanelShell() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        animation: 'fadeIn 120ms ease-out forwards',
      }}
    >
      <PanelHeader />
      <PanelNav />
      <PanelContent />
    </div>
  );
}

/**
 * SidePanelInner reads auth state and conditionally renders either the
 * full authenticated shell or the unauthenticated AuthGate.
 */
function SidePanelInner() {
  const authState = usePopupStore((s) => s.authState);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: '#F5F5F6',
        overflow: 'hidden',
        fontFamily: 'DM Sans, sans-serif',
      }}
    >
      {authState === 'authenticated' ? <SidePanelShell /> : <AuthGate />}
      {/* Global toast notifications */}
      <Toaster />
    </div>
  );
}

/**
 * SidePanel — root entry point for the Chrome Side Panel.
 * Wraps the entire panel in the Zustand StoreProvider.
 *
 * @returns {JSX.Element} The fully composed side panel.
 */
export default function SidePanel() {
  return (
    <StoreProvider>
      <SidePanelInner />
    </StoreProvider>
  );
}
