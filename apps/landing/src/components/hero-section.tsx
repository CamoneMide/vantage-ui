'use client';

import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';

import { WaitlistForm } from './waitlist-form';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="waitlist"
      style={{
        minHeight: '100vh',
        background: '#F5F5F6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '120%',
          background:
            'radial-gradient(ellipse 600px 400px at 30% 30%, rgba(5,59,132,0.06) 0%, transparent 70%), radial-gradient(ellipse 400px 300px at 80% 20%, rgba(5,59,132,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Beta badge */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 0ms',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#FFFFFF',
              background: '#053B84',
              borderRadius: '20px',
              padding: '4px 12px',
              display: 'inline-block',
            }}
          >
            Now in Beta
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display), Outfit, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 600,
            color: '#0A0A0A',
            lineHeight: 1.1,
            textAlign: 'center',
            margin: 0,
            maxWidth: '700px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 100ms',
          }}
        >
          Extract Any UI.
          <br />
          Ship in Seconds.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: 'var(--font-body), DM Sans, sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(10,10,10,0.6)',
            lineHeight: 1.6,
            textAlign: 'center',
            maxWidth: '600px',
            margin: 0,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
          }}
        >
          VantageUI inspects any live website component and synthesizes it into production-ready
          React/Tailwind/Shadcn code — in 8 seconds.
        </p>

        {/* Waitlist form */}
        <div
          style={{
            width: '100%',
            maxWidth: '520px',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 300ms',
          }}
        >
          <WaitlistForm />
        </div>

        {/* Micro-text */}
        <p
          style={{
            fontFamily: 'var(--font-body), DM Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(10,10,10,0.5)',
            textAlign: 'center',
            margin: 0,
            opacity: mounted ? 1 : 0,
            transition: 'opacity 600ms ease-out 400ms',
          }}
        >
          No credit card required &middot; 5 free credits on sign-up &middot; Used by 1,200+
          engineers
        </p>
      </div>

      {/* Demo video placeholder */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          marginTop: '48px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms',
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid rgba(10,10,10,0.08)',
          boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <video
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect width='1600' height='900' fill='%23F0F0F2'/%3E%3Ccircle cx='24' cy='24' r='1' fill='rgba(10,10,10,0.04)'/%3E%3Ccircle cx='48' cy='24' r='1' fill='rgba(10,10,10,0.04)'/%3E%3Ccircle cx='72' cy='24' r='1' fill='rgba(10,10,10,0.04)'/%3E%3C/svg%3E"
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            display: 'block',
            background: '#F0F0F2',
          }}
          aria-label="Demo video"
          muted
          playsInline
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(5, 59, 132, 0.1)',
              color: '#053B84',
              transition: 'background 200ms, transform 200ms',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = '#053B84';
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
              const icon = (e.currentTarget as HTMLDivElement).querySelector('.play-icon');
              if (icon) (icon as SVGElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(5, 59, 132, 0.1)';
              (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
              const icon = (e.currentTarget as HTMLDivElement).querySelector('.play-icon');
              if (icon) (icon as SVGElement).style.color = '#053B84';
            }}
          >
            <Play size={28} fill="#053B84" strokeWidth={1.5} className="play-icon" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(10,10,10,0.4)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Demo coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
