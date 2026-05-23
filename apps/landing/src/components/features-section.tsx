'use client';

import { Code2, Cpu, FileText, Palette, Sparkles, Timer } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const FEATURES = [
  {
    Icon: Cpu,
    title: 'Ghost Inspector',
    description:
      'Hover-to-highlight component boundaries with ARIA detection, arrow-key DOM traversal, and one-click selection.',
  },
  {
    Icon: Code2,
    title: 'Sandpack Sandbox',
    description:
      'Live-editable code playground with Tailwind and Shadcn pre-configured. See changes instantly in the preview pane.',
  },
  {
    Icon: FileText,
    title: 'Prompt Generator',
    description:
      'Generate structured Markdown prompts from extracted blueprints. Copy-paste into Claude, GPT-4o, or v0.dev.',
  },
  {
    Icon: Palette,
    title: 'Design System Scanner',
    description:
      'Scan any site and extract its color palette, typography scale, and spacing system as DESIGN.md and Tailwind config.',
  },
  {
    Icon: Timer,
    title: 'Framer Motion Output',
    description:
      'CSS transitions and keyframe animations are automatically translated into idiomatic framer-motion variants.',
  },
  {
    Icon: Sparkles,
    title: 'Extraction History',
    description:
      'All extractions saved with thumbnails and timestamps. Re-open any past extraction in the sandbox with one click.',
  },
];

export function FeaturesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="features"
      ref={ref}
      style={{
        background: '#FFFFFF',
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
          Everything You Need to Ship Faster
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(10,10,10,0.08)',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 200ms ease, box-shadow 200ms ease, opacity 600ms ease',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 8px 24px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0px 4px 12px rgba(0,0,0,0.05)';
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(5, 59, 132, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#053B84',
                  marginBottom: '16px',
                }}
              >
                <feature.Icon size={20} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display), Outfit, sans-serif',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#0A0A0A',
                  margin: 0,
                  marginBottom: '8px',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body), DM Sans, sans-serif',
                  fontSize: '15px',
                  color: 'rgba(10,10,10,0.65)',
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
