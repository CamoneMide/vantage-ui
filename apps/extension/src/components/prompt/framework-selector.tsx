import type { Framework } from '~mocks/prompts.mock';

interface FrameworkSelectorProps {
  /** Currently selected framework key. */
  value: Framework
  /** Called when the user clicks a different framework segment. */
  onChange: (value: Framework) => void
}

const SEGMENTS: { value: Framework; label: string }[] = [
  { value: 'shadcn', label: 'React / Shadcn' },
  { value: 'tailwind', label: 'React / Tailwind' },
  { value: 'html', label: 'Raw HTML' },
];

/**
 * FrameworkSelector is a 3-segment pill control for choosing the target
 * framework output. It is a controlled component — the parent manages
 * `value` and `onChange`.
 *
 * @param {FrameworkSelectorProps} props - Value and onChange callback.
 * @returns {JSX.Element} The segmented control UI.
 */
function FrameworkSelector({ value, onChange }: FrameworkSelectorProps) {
  return (
    <div
      style={{
        display: 'flex',
        background: '#F5F5F6',
        borderRadius: '8px',
        padding: '4px',
        gap: '2px',
      }}
    >
      {SEGMENTS.map((segment) => {
        const isActive = value === segment.value;
        return (
          <button
            key={segment.value}
            type="button"
            onClick={() => onChange(segment.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? '#053B84' : 'rgba(10,10,10,0.6)',
              background: isActive ? '#FFFFFF' : 'transparent',
              boxShadow: isActive ? '0px 1px 3px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 100ms ease-out',
              whiteSpace: 'nowrap',
            }}
          >
            {segment.label}
          </button>
        );
      })}
    </div>
  );
}

export { FrameworkSelector, type FrameworkSelectorProps };
