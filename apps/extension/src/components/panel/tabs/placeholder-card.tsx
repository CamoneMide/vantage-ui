import type { LucideProps } from 'lucide-react';

interface PlaceholderCardProps {
  /** Lucide icon component to display at the center of the card. */
  Icon: React.ComponentType<LucideProps>
  /** Heading text displayed below the icon. */
  heading: string
  /** Descriptive text displayed below the heading. */
  description: string
}

/**
 * Reusable centered placeholder card used across all 5 side panel tab placeholders.
 * Renders a white surface card on the Soft White canvas with an icon, heading,
 * and a short description.
 *
 * @param {PlaceholderCardProps} props - Icon, heading, and description.
 * @returns {JSX.Element} A centered placeholder card.
 */
function PlaceholderCard({ Icon, heading, description }: PlaceholderCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          background: '#FFFFFF',
          border: '1px solid rgba(10,10,10,0.08)',
          borderRadius: '12px',
          padding: '32px',
          gap: '12px',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        <Icon size={28} color="#053B84" strokeWidth={1.5} />
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(10,10,10,0.6)',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export { PlaceholderCard, type PlaceholderCardProps };
