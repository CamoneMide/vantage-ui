import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';

import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = 'https://vantageui.com';

export const metadata: Metadata = {
  title: 'VantageUI — Extract Any UI Component in Seconds',
  description:
    'VantageUI is a Chrome extension that extracts any live website component and synthesizes it into production-ready React/Tailwind/Shadcn code.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VantageUI — Extract Any UI. Ship in Seconds.',
    description:
      'Extract any live website component and get production-ready React/Tailwind/Shadcn code in seconds.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VantageUI',
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VantageUI — Extract Any UI. Ship in Seconds.',
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 28 28%22%3E%3Crect width=%2228%22 height=%2228%22 rx=%226%22 fill=%22%23053B84%22/%3E%3Cpath d=%22M8 20L14 8L20 20%22 stroke=%22white%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/%3E%3Cpath d=%22M11 15.5H17%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22/%3E%3C/svg%3E',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: 'var(--font-body), DM Sans, sans-serif' }}>{children}</body>
    </html>
  );
}
