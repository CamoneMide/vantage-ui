import React, { useEffect, useState } from 'react';

import { useCreditsStore } from '../../../store/creditsSlice';
import { LowCreditWarning } from '../../low-credit-warning';
import { CreditBalanceCard } from './credits/credit-balance-card';
import { CreditPackSelector } from './credits/credit-pack-selector';
import { TransactionHistoryTable } from './credits/transaction-history-table';

/**
 * CreditsTab screen for the side panel.
 * Displays credit balance management, active alerts, pack selection,
 * and historical transaction log.
 */
function CreditsTab() {
  const balance = useCreditsStore((s) => s.balance);
  const transactions = useCreditsStore((s) => s.transactions);
  const [mounted, setMounted] = useState(false);

  // Trigger staggered animations after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: 1,
        animation: 'fadeIn 0.3s ease-out forwards',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      {/* 1. Low Credit Banner (if balance < 5) */}
      <div
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <LowCreditWarning balance={balance} variant="full" />
      </div>

      {/* 2. Balance Card */}
      <div
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.05s',
        }}
      >
        <CreditBalanceCard balance={balance} />
      </div>

      {/* 3. Pack Selector */}
      <div
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}
      >
        <CreditPackSelector />
      </div>

      {/* 4. History Log */}
      <div
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(8px)',
          opacity: mounted ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
        }}
      >
        <TransactionHistoryTable transactions={transactions} />
      </div>
    </div>
  );
}

export { CreditsTab };
