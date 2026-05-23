import { RotateCcw, Settings } from 'lucide-react';

import { useOnboardingStore } from '../../../store/onboardingSlice';
import { PlaceholderCard } from './placeholder-card';

function SettingsTab() {
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <PlaceholderCard
        Icon={Settings}
        heading="Settings"
        description="Coming soon."
      />
      <button
        type="button"
        onClick={resetOnboarding}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 20px',
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(10,10,10,0.6)',
          transition: 'background 150ms',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#F5F5F6';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = '#FFFFFF';
        }}
      >
        <RotateCcw size={14} />
        Reset Onboarding
      </button>
    </div>
  );
}

export { SettingsTab };
