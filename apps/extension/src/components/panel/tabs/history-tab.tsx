import { toast } from '@vantage-ui/ui';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

/* eslint-disable-next-line import/extensions */
import { useHistoryStore } from '~store/historySlice';

import { HistoryEmpty } from './history/history-empty';
import { HistoryItem } from './history/history-item';

function HistoryTab() {
  const items = useHistoryStore((s) => s.items);
  const clearAll = useHistoryStore((s) => s.clearAll);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    clearAll();
    setShowClearConfirm(false);
    toast({
      title: 'All extractions cleared.',
    });
  };

  if (items.length === 0) {
    return <HistoryEmpty />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#0A0A0A',
              margin: 0,
            }}
          >
            History
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: 'rgba(10,10,10,0.6)',
              margin: 0,
            }}
          >
            {items.length}
            {' '}
            extraction
            {items.length === 1 ? '' : 's'}
          </p>
        </div>
        {showClearConfirm ? (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: 'rgba(10,10,10,0.6)',
              }}
            >
              Clear all?
            </span>
            <button
              type="button"
              onClick={handleClearAll}
              style={{
                padding: '4px 10px',
                border: 'none',
                borderRadius: '6px',
                background: '#DC2626',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                color: '#FFFFFF',
              }}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              style={{
                padding: '4px 10px',
                border: 'none',
                borderRadius: '6px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                color: 'rgba(10,10,10,0.6)',
              }}
            >
              No
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              border: 'none',
              borderRadius: '6px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(10,10,10,0.6)',
              transition: 'color 150ms ease-out',
            }}
          >
            <Trash2 size={13} strokeWidth={1.5} />
            Clear All
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => (
          <HistoryItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export { HistoryTab };
