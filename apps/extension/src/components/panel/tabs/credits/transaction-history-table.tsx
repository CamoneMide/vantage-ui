import React from 'react';

import type { CreditTransaction } from '~mocks/credits.mock';

interface TransactionHistoryTableProps {
  /** The transaction logs from state. */
  transactions: CreditTransaction[]
}

export function TransactionHistoryTable({
  transactions,
}: TransactionHistoryTableProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  const renderTypeBadge = (type: CreditTransaction['type']) => {
    let bg = 'rgba(107, 114, 128, 0.08)';
    let color = '#4B5563';
    let label = 'Spent';

    if (type === 'granted') {
      bg = 'rgba(34, 197, 94, 0.1)';
      color = '#16A34A';
      label = 'Granted';
    } else if (type === 'purchased') {
      bg = 'rgba(5, 59, 132, 0.08)';
      color = '#053B84';
      label = 'Purchased';
    }

    return (
      <span
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.03em',
          padding: '2px 8px',
          borderRadius: '20px',
          background: bg,
          color,
          display: 'inline-block',
        }}
      >
        {label}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '14px',
          fontWeight: 600,
          color: '#0A0A0A',
          margin: 0,
        }}
      >
        Transaction History
      </h3>

      <div
        style={{
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '8px',
          background: '#FFFFFF',
          overflow: 'hidden',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Table Container */}
        <div
          style={{
            maxHeight: '240px',
            overflowY: 'auto',
          }}
          className="thin-scrollbar"
        >
          {transactions.length === 0 ? (
            <div
              style={{
                padding: '24px',
                textAlign: 'center',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: 'rgba(10,10,10,0.4)',
              }}
            >
              No transactions recorded.
            </div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr
                  style={{
                    background: '#F9F9FA',
                    borderBottom: '1px solid rgba(10,10,10,0.06)',
                  }}
                >
                  <th
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.4)',
                      padding: '10px 14px',
                      width: '25%',
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.4)',
                      padding: '10px 14px',
                      width: '20%',
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.4)',
                      padding: '10px 14px',
                      width: '40%',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(10,10,10,0.4)',
                      padding: '10px 14px',
                      textAlign: 'right',
                      width: '15%',
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => {
                  const isPositive = tx.amount > 0;
                  const amtColor = isPositive ? '#16A34A' : '#EF4444';
                  const amtPrefix = isPositive ? '+' : '';

                  return (
                    <tr
                      key={tx.id}
                      style={{
                        background: idx % 2 === 1 ? '#F9F9FA' : '#FFFFFF',
                        borderBottom:
                          idx === transactions.length - 1
                            ? 'none'
                            : '1px solid rgba(10,10,10,0.04)',
                        transition: 'background 0.15s ease',
                      }}
                    >
                      <td
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '12px',
                          color: 'rgba(10,10,10,0.6)',
                          padding: '12px 14px',
                        }}
                      >
                        {formatDate(tx.createdAt)}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {renderTypeBadge(tx.type)}
                      </td>
                      <td
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#0A0A0A',
                          padding: '12px 14px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '120px',
                        }}
                        title={tx.description}
                      >
                        {tx.description}
                      </td>
                      <td
                        style={{
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: amtColor,
                          padding: '12px 14px',
                          textAlign: 'right',
                        }}
                      >
                        {amtPrefix}
                        {tx.amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
