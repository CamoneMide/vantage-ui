import vantageUiPreset from '@vantage-ui/ui/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [vantageUiPreset],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        overlay: 'rgba(5,59,132,0.12)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Outfit', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 600ms ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
