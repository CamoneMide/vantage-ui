'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="28" height="28" rx="6" fill="#053B84" />
            <path
              d="M8 20L14 8L20 20"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M11 15.5H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-display), Outfit, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#0A0A0A',
            }}
          >
            VantageUI
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ display: 'none', gap: '28px' }} className="md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body), DM Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'rgba(10,10,10,0.65)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#053B84';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(10,10,10,0.65)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#waitlist"
            style={{
              display: 'none',
              fontFamily: 'var(--font-display), Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: '#FFFFFF',
              background: '#053B84',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              boxShadow: '0px 2px 4px rgba(5,59,132,0.2)',
              transition: 'background 150ms, transform 150ms',
            }}
            className="md:inline-block"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#042D66';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#053B84';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Get Started Free
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              display: 'flex',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: '#0A0A0A',
            }}
            className="md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: '1px solid rgba(10,10,10,0.08)',
            background: '#FFFFFF',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-body), DM Sans, sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                color: 'rgba(10,10,10,0.65)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: 'var(--font-display), Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: '#FFFFFF',
              background: '#053B84',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Get Started Free
          </a>
        </div>
      )}
    </nav>
  );
}
