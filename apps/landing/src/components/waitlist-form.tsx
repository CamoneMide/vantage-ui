'use client';

import { Loader2 } from 'lucide-react';
import { useState } from 'react';

import { waitlistSchema } from '@/schemas/waitlist.schema';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = waitlistSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Invalid email.');
      return;
    }

    setStatus('loading');

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1500);
    });

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 20px',
          background: 'rgba(22, 163, 74, 0.06)',
          borderRadius: '8px',
          border: '1px solid rgba(22, 163, 74, 0.2)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#16A34A" />
          <path
            d="M6 10.5L8.5 13L14 7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontFamily: 'var(--font-body), DM Sans, sans-serif',
            fontSize: '15px',
            fontWeight: 500,
            color: '#16A34A',
          }}
        >
          You&rsquo;re on the list! We&rsquo;ll email you when we launch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexDirection: 'row',
        }}
        className="flex-col sm:flex-row"
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            style={{
              width: '100%',
              fontFamily: 'var(--font-body), DM Sans, sans-serif',
              fontSize: '15px',
              color: '#0A0A0A',
              background: '#FFFFFF',
              border: `1px solid ${error ? '#DC2626' : 'rgba(10,10,10,0.15)'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              outline: 'none',
              transition: 'border-color 150ms',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = '#053B84';
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = 'rgba(10,10,10,0.15)';
            }}
          />
          {error && (
            <span
              style={{
                fontFamily: 'var(--font-body), DM Sans, sans-serif',
                fontSize: '13px',
                color: '#DC2626',
              }}
            >
              {error}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontFamily: 'var(--font-display), Outfit, sans-serif',
            fontWeight: 600,
            fontSize: '15px',
            color: '#FFFFFF',
            background: status === 'loading' ? '#476B9E' : '#053B84',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            whiteSpace: 'nowrap',
            boxShadow: '0px 2px 4px rgba(5,59,132,0.2)',
            transition: 'background 150ms',
          }}
        >
          {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
          {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
        </button>
      </div>
    </form>
  );
}
