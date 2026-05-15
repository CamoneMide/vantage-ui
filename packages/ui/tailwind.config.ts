import type { Config } from 'tailwindcss';

const vantageUiConfig = {
  theme: {
    extend: {
      colors: {
        canvas: '#F5F5F6',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#053B84',
          foreground: '#FFFFFF',
        },
        foreground: '#0A0A0A',
        muted: {
          DEFAULT: '#F4F4F5',
          foreground: '#71717A',
        },
        border: '#E4E4E7',
        success: '#16A34A',
        destructive: '#DC2626',
        overlay: 'rgba(5,59,132,0.12)',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.10', fontWeight: '600' }],
        section: ['3.25rem', { lineHeight: '1.20', fontWeight: '600' }],
        sub: ['2rem', { lineHeight: '1.20', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.60' }],
        body: ['1rem', { lineHeight: '1.50' }],
        'body-sm': ['0.875rem', { lineHeight: '1.50' }],
        label: ['0.75rem', { lineHeight: '1.25', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'level-1': 'none',
        'level-2': '0px 4px 12px rgba(0,0,0,0.05)',
        'level-3': '0px 8px 24px rgba(0,0,0,0.10)',
        cta: '0px 2px 4px rgba(5,59,132,0.20)',
      },
      animation: {
        'fade-up': 'fadeUp 150ms ease-out forwards',
        'fade-in': 'fadeIn 120ms ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  content: [],
} satisfies Config;

export default vantageUiConfig;
