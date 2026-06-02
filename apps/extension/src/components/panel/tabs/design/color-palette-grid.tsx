import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@vantage-ui/ui';
import { Check } from 'lucide-react';
import { useCallback, useState } from 'react';

interface ColorSwatch {
  hex: string
  role: string
  name: string
}

interface ColorPaletteGridProps {
  colors: ColorSwatch[]
}

function ColorSwatchCard({ color }: { color: ColorSwatch }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(color.hex).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [color.hex]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            padding: '12px 8px',
            border: '1px solid rgba(10,10,10,0.08)',
            borderRadius: '8px',
            background: '#FFFFFF',
            cursor: 'pointer',
            transition: 'box-shadow 150ms ease-out',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: color.hex,
              border:
                color.hex === '#FFFFFF'
                  ? '1px solid rgba(10,10,10,0.08)'
                  : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {copied && (
              <Check
                size={14}
                color={color.hex === '#FFFFFF' ? '#0A0A0A' : '#FFFFFF'}
                strokeWidth={2.5}
              />
            )}
          </div>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              color: '#0A0A0A',
              lineHeight: 1.2,
            }}
          >
            {color.name}
          </span>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: 'rgba(10,10,10,0.6)',
              lineHeight: 1.2,
            }}
          >
            {color.hex}
          </span>
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: 'rgba(10,10,10,0.6)',
              background: '#F5F5F6',
              padding: '2px 8px',
              borderRadius: '4px',
              lineHeight: 1.4,
            }}
          >
            {color.role}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <span style={{ fontSize: '12px' }}>Copy hex</span>
      </TooltipContent>
    </Tooltip>
  );
}

/**
 * ColorPaletteGrid displays extracted color swatches in a 4-column grid.
 * Each swatch shows a colored circle, name, hex value, and role badge.
 * Clicking a swatch copies the hex value to the clipboard.
 *
 * @param {ColorPaletteGridProps} props - Array of color swatches.
 * @returns {JSX.Element} The color palette grid section.
 */
function ColorPaletteGrid({ colors }: ColorPaletteGridProps) {
  return (
    <TooltipProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Colors
        </h3>
        <div
          style={{
            height: '1px',
            background: 'rgba(10,10,10,0.08)',
            width: '100%',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
          }}
        >
          {colors.map((color) => (
            <ColorSwatchCard key={color.name} color={color} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

export { ColorPaletteGrid };
