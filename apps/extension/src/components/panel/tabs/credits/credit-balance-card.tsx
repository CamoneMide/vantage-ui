import { Card, CardContent } from '@vantage-ui/ui';
import { Zap } from 'lucide-react';
import React from 'react';

import { useCountUp } from './use-count-up';

interface CreditBalanceCardProps {
  /** The actual active credit balance from state. */
  balance: number
}

/**
 * CreditBalanceCard displays a beautiful, premium overview of the user's
 * current credit balance with a smooth count-up animation and visual usage bar.
 */
export function CreditBalanceCard({ balance }: CreditBalanceCardProps) {
  const animatedBalance = useCountUp(balance, 400);

  // Consumption progress percentage: max representation at 50 credits
  const progressPercent = Math.min((balance / 50) * 100, 100);

  return (
    <Card
      style={{
        borderRadius: '12px',
        border: '1px solid rgba(10,10,10,0.08)',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)',
        background: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      <CardContent style={{ padding: '20px 24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: 'rgba(10,10,10,0.5)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Credit Balance
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(5, 59, 132, 0.08)',
              color: '#053B84',
            }}
          >
            <Zap size={15} fill="#053B84" strokeWidth={1} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '48px',
              fontWeight: 700,
              color: '#0A0A0A',
              lineHeight: 1,
            }}
          >
            {animatedBalance}
          </span>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: 'rgba(10,10,10,0.5)',
              fontWeight: 500,
            }}
          >
            credits remaining
          </span>
        </div>

        {/* Progress track */}
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              height: '6px',
              width: '100%',
              background: '#F0F0F2',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: '#053B84',
                borderRadius: '3px',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '6px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: 'rgba(10,10,10,0.4)',
            }}
          >
            <span>0 credits</span>
            <span>50 max capacity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
