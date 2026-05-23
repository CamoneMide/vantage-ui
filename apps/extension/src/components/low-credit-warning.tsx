import { AlertTriangle } from 'lucide-react';
import React from 'react';

import { useUIStore } from '../store/ui-slice';

interface LowCreditWarningProps {
  /** The current numeric credit balance. */
  balance: number
  /** Visual variation: 'full' for the Credits tab, 'compact' for layout header insertion. */
  variant?: 'full' | 'compact'
}

/**
 * A beautiful, premium warning banner rendered when user's credits fall below 5.
 * Features red tones, sub-animations, and a call-to-action button in compact mode.
 */
export function LowCreditWarning({
  balance,
  variant = 'full',
}: LowCreditWarningProps) {
  const setActiveTab = useUIStore((s) => s.setActiveTab);

  if (balance >= 5) return null;

  if (variant === 'compact') {
    return (
      <div
        style={{
          background: 'rgba(220, 38, 38, 0.05)',
          borderBottom: '1px solid rgba(220, 38, 38, 0.15)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          animation: 'slideDown 0.2s ease-out forwards',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertTriangle size={13} color="#DC2626" />
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#DC2626',
            }}
          >
            Running low on credits (
            {balance}
            {' '}
            remaining)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab('credits')}
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#053B84',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textDecoration: 'underline',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          Top Up
          {' '}
          <span style={{ transition: 'transform 0.15s' }}>&rarr;</span>
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'rgba(220, 38, 38, 0.05)',
        border: '1px solid rgba(220, 38, 38, 0.15)',
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'fadeIn 0.25s ease-out forwards',
      }}
    >
      <div
        style={{
          marginTop: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#DC2626',
        }}
      >
        <AlertTriangle size={16} strokeWidth={2.5} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: '#DC2626',
          }}
        >
          Low Credits Warning
        </span>
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(220, 38, 38, 0.85)',
            lineHeight: 1.4,
          }}
        >
          You&rsquo;re running low on credits (
          {balance}
          {' '}
          remaining). Purchase
          more credits to continue extracting premium React and HTML blueprints
          without interruption.
        </span>
      </div>
    </div>
  );
}
