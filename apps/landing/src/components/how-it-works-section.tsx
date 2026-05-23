'use client';

import { useInView } from '@/hooks/use-in-view';

const STEPS = [
  {
    number: 1,
    title: 'Inspect',
    description:
      'Activate the Ghost Inspector on any live website. Hover to highlight semantic component boundaries, then click to select.',
  },
  {
    number: 2,
    title: 'Extract',
    description:
      'VantageUI captures the DOM, computed styles, animations, ARIA states, and assets — then normalizes everything into a clean JSON Blueprint.',
  },
  {
    number: 3,
    title: 'Ship',
    description:
      'Review, edit, and copy the generated React/Tailwind/Shadcn code. Export directly to your IDE or iterate in the Sandpack sandbox.',
  },
];

export function HowItWorksSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: '#F5F5F6',
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display), Outfit, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 600,
            color: '#0A0A0A',
            textAlign: 'center',
            margin: 0,
            marginBottom: '64px',
          }}
        >
          How VantageUI Works
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px',
            position: 'relative',
          }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {/* Connecting line (desktop only) */}
          <div
            style={{
              position: 'absolute',
              top: '24px',
              left: 'calc(16.67% + 24px)',
              width: 'calc(66.66% - 48px)',
              height: '0',
              borderTop: '2px dashed rgba(5, 59, 132, 0.2)',
              pointerEvents: 'none',
            }}
            className="hidden md:block"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '20px',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`,
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#053B84',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display), Outfit, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  flexShrink: 0,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), Outfit, sans-serif',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), DM Sans, sans-serif',
                  fontSize: '16px',
                  color: 'rgba(10,10,10,0.6)',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '280px',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
