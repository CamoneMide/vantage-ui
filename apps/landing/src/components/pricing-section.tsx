'use client';

import { useInView } from '@/hooks/use-in-view';

const PACKS = [
  {
    credits: 50,
    price: '$4.99',
    description: 'Best for individuals',
    badge: null,
  },
  {
    credits: 100,
    price: '$8.99',
    description: 'Most popular',
    badge: 'Popular',
  },
  {
    credits: 200,
    price: '$15.99',
    description: 'Best value',
    badge: null,
  },
];

export function PricingSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: '#F5F5F6',
        padding: '96px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '48px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display), Outfit, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 600,
              color: '#0A0A0A',
              margin: 0,
              marginBottom: '12px',
            }}
          >
            Simple, Pay-As-You-Go Pricing
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '20px',
              color: 'rgba(10,10,10,0.6)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Start free, no card required. Purchase credits when you need them.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            width: '100%',
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {PACKS.map((pack, i) => {
            const isPopular = pack.badge === 'Popular';
            return (
              <div
                key={pack.credits}
                style={{
                  background: '#FFFFFF',
                  border: isPopular ? '2px solid #053B84' : '1px solid rgba(10,10,10,0.08)',
                  borderRadius: '12px',
                  padding: '24px 20px',
                  position: 'relative',
                  boxShadow: isPopular
                    ? '0px 4px 16px rgba(5, 59, 132, 0.12)'
                    : '0px 2px 8px rgba(0,0,0,0.04)',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 600ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
                }}
              >
                {pack.badge && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '16px',
                      background: '#053B84',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-display), Outfit, sans-serif',
                      fontWeight: 600,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '3px 10px',
                      borderRadius: '10px',
                      boxShadow: '0px 2px 6px rgba(5, 59, 132, 0.2)',
                    }}
                  >
                    {pack.badge}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--font-display), Outfit, sans-serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#0A0A0A',
                    marginBottom: '4px',
                  }}
                >
                  {pack.credits}
                  {' '}
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'rgba(10,10,10,0.5)',
                    }}
                  >
                    credits
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display), Outfit, sans-serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: isPopular ? '#053B84' : '#0A0A0A',
                    marginBottom: '12px',
                  }}
                >
                  {pack.price}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body), DM Sans, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(10,10,10,0.55)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {pack.description}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '14px',
              color: 'rgba(10,10,10,0.6)',
              margin: 0,
              marginBottom: '16px',
            }}
          >
            Free to start — 5 credits included on sign-up
          </p>
          <a
            href="#waitlist"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-display), Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#FFFFFF',
              background: '#053B84',
              padding: '14px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0px 4px 12px rgba(5,59,132,0.3)',
              transition: 'background 150ms, transform 150ms',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#042D66';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#053B84';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
}
