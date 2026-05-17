import {
  Popover, PopoverContent, PopoverTrigger, toast,
} from '@vantage-ui/ui';
import { formatDistanceToNow } from 'date-fns';
import { Sparkles, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';

import type { ExtractionHistoryItem } from '~mocks/history.mock';
/* eslint-disable-next-line import/extensions */
import { useExtractionStore } from '~store/extraction-store';
/* eslint-disable-next-line import/extensions */
import { useHistoryStore } from '~store/historySlice';
/* eslint-disable-next-line import/extensions */
import { useUIStore } from '~store/ui-slice';

interface HistoryItemProps {
  item: ExtractionHistoryItem
  index: number
}

/**
 * HistoryItem renders a single extraction row in the history list.
 * Shows a thumbnail, source domain, element tag, relative timestamp,
 * and action buttons for re-opening or deleting the extraction.
 *
 * @param {HistoryItemProps} props - The history item data and its index.
 * @returns {JSX.Element} A single history item card.
 */
function HistoryItem({ item, index }: HistoryItemProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const removeItem = useHistoryStore((s) => s.removeItem);
  const setSuccess = useExtractionStore((s) => s.setSuccess);
  const setActiveTab = useUIStore((s) => s.setActiveTab);

  const handleReopen = useCallback(() => {
    setSuccess(item.jsonBlueprint, item.generatedCode);
    setActiveTab('extract');
  }, [item, setSuccess, setActiveTab]);

  const handleDelete = useCallback(() => {
    removeItem(item.id);
    setPopoverOpen(false);
    toast({
      title: 'Extraction deleted.',
    });
  }, [item.id, removeItem]);

  const relativeTime = formatDistanceToNow(new Date(item.capturedAt), {
    addSuffix: true,
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px',
        background: '#FFFFFF',
        border: '1px solid rgba(10,10,10,0.08)',
        borderRadius: '8px',
        animation: 'fadeUp 200ms ease-out forwards',
        animationDelay: `${index * 50}ms`,
        opacity: 0,
      }}
    >
      {/* Thumbnail */}
      <img
        src={item.thumbnailUrl}
        alt=""
        loading="lazy"
        style={{
          width: '56px',
          height: '40px',
          borderRadius: '4px',
          objectFit: 'cover',
          background: '#F5F5F6',
          flexShrink: 0,
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            color: '#0A0A0A',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.sourceDomain}
        </div>
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: 'rgba(10,10,10,0.6)',
            marginTop: '2px',
          }}
        >
          {item.elementTag}
        </div>
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '11px',
            color: 'rgba(10,10,10,0.4)',
            marginTop: '2px',
          }}
        >
          {relativeTime}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-start' }}>
        <button
          type="button"
          onClick={handleReopen}
          aria-label="Re-open extraction"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            borderRadius: '6px',
            background: 'transparent',
            cursor: 'pointer',
            color: 'rgba(10,10,10,0.4)',
            transition: 'color 150ms ease-out, background 150ms ease-out',
            flexShrink: 0,
          }}
        >
          <Sparkles size={14} strokeWidth={1.5} />
        </button>

        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Delete extraction"
              style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                borderRadius: '6px',
                background: 'transparent',
                cursor: 'pointer',
                color: 'rgba(10,10,10,0.4)',
                transition: 'color 150ms ease-out, background 150ms ease-out',
                flexShrink: 0,
              }}
            >
              <Trash2 size={14} strokeWidth={1.5} />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(10,10,10,0.08)',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
              width: '220px',
            }}
          >
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: '#0A0A0A',
                margin: '0 0 12px',
              }}
            >
              Delete this extraction?
            </p>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                onClick={() => setPopoverOpen(false)}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  background: 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(10,10,10,0.6)',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#DC2626',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#FFFFFF',
                }}
              >
                Delete
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export { HistoryItem };
