'use client';

import { useInView } from '@/hooks/use-in-view';

const TECH_LOGOS = [
  { name: 'React' },
  { name: 'Tailwind CSS' },
  { name: 'Shadcn/ui' },
  { name: 'Framer Motion' },
];

export function SocialProofSection() {
  const { ref, inView } = useInView(0.3);

  return (
    <section
      ref={ref}
      style={{
        background: '#FFFFFF',
        padding: '64px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display), Outfit, sans-serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 600,
            color: '#0A0A0A',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Join 1,200+ engineers already on the waitlist
        </h3>

        {/* Tech logos row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {TECH_LOGOS.map((logo) => (
            <div
              key={logo.name}
              title={logo.name}
              style={{
                fontFamily: 'var(--font-display), Outfit, sans-serif',
                fontSize: '18px',
                fontWeight: 600,
                color: 'rgba(10,10,10,0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 200ms',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = '#0A0A0A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = 'rgba(10,10,10,0.35)';
              }}
            >
              {logo.name === 'React' && (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <ellipse
                    cx="24"
                    cy="24"
                    rx="20.5"
                    ry="7.7"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <ellipse
                    cx="24"
                    cy="24"
                    rx="7.7"
                    ry="20.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <ellipse
                    cx="24"
                    cy="24"
                    rx="19"
                    ry="19"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle cx="24" cy="24" r="3.5" fill="currentColor" />
                </svg>
              )}
              {logo.name === 'Tailwind CSS' && (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M12 29C12 22 16.3 19 24 19C20.6 26 24.9 29 24.9 29C24.9 29 20.6 33 24 38C16.3 38 12 34 12 29Z"
                    fill="currentColor"
                    opacity="0.6"
                  />
                  <path
                    d="M24 19C28.3 15.5 36 17 36 24C36 19 31.7 15.5 24 19Z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle cx="24" cy="29" r="2.5" fill="currentColor" />
                </svg>
              )}
              {logo.name === 'Shadcn/ui' && (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <rect
                    x="4"
                    y="4"
                    width="40"
                    height="40"
                    rx="8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M16 32L32 16"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="16" cy="16" r="3" fill="currentColor" />
                  <circle cx="32" cy="32" r="3" fill="currentColor" />
                </svg>
              )}
              {logo.name === 'Framer Motion' && (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <rect
                    x="4"
                    y="4"
                    width="40"
                    height="40"
                    rx="8"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M16 32L24 16L32 32"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 27H28"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
