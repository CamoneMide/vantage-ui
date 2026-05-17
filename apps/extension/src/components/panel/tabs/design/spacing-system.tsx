interface SpacingSystemProps {
  spacing: number[]
}

/**
 * SpacingSystem displays the spacing scale visually as horizontal bars.
 * Each bar width equals the spacing value multiplied by 2 for readability.
 *
 * @param {SpacingSystemProps} props - Array of spacing values in pixels.
 * @returns {JSX.Element} The spacing system visual section.
 */
function SpacingSystem({ spacing }: SpacingSystemProps) {
  return (
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
        Spacing
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
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end',
          overflowX: 'auto',
          paddingBottom: '4px',
        }}
      >
        {spacing.map((value) => (
          <div
            key={value}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: '8px',
                width: `${value * 2}px`,
                minWidth: '8px',
                background: '#053B84',
                borderRadius: '2px',
              }}
            />
            <span
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                color: 'rgba(10,10,10,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              {`${value}px`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { SpacingSystem };
