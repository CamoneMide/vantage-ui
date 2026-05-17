export const mockColorPalette: {
  hex: string
  role: string
  name: string
}[] = [
  { hex: '#053B84', role: 'Primary', name: 'Nero Blue' },
  { hex: '#F5F5F6', role: 'Background', name: 'Soft White' },
  { hex: '#FFFFFF', role: 'Surface', name: 'White' },
  { hex: '#0A0A0A', role: 'Text Primary', name: 'Deep Black' },
  {
    hex: 'rgba(10,10,10,0.6)',
    role: 'Text Secondary',
    name: 'Secondary Black',
  },
  { hex: 'rgba(10,10,10,0.08)', role: 'Border', name: 'Border Black' },
  { hex: '#16A34A', role: 'Success', name: 'Green' },
  { hex: '#DC2626', role: 'Destructive', name: 'Red' },
];

export const mockTypographyScale: {
  role: string
  family: string
  size: string
  weight: string
  lineHeight: string
}[] = [
  {
    role: 'Display / Hero',
    family: 'Outfit',
    size: '64px (4rem)',
    weight: '600 (SemiBold)',
    lineHeight: '1.10',
  },
  {
    role: 'Section Heading',
    family: 'Outfit',
    size: '52px (3.25rem)',
    weight: '600 (SemiBold)',
    lineHeight: '1.20',
  },
  {
    role: 'Sub-heading',
    family: 'Outfit',
    size: '32px (2rem)',
    weight: '500 (Medium)',
    lineHeight: '1.20',
  },
  {
    role: 'Body Large',
    family: 'DM Sans',
    size: '20px (1.25rem)',
    weight: '400 (Regular)',
    lineHeight: '1.60',
  },
  {
    role: 'Body Standard',
    family: 'DM Sans',
    size: '16px (1rem)',
    weight: '400 (Regular)',
    lineHeight: '1.50',
  },
  {
    role: 'Body Small',
    family: 'DM Sans',
    size: '14px (0.88rem)',
    weight: '400 (Regular)',
    lineHeight: '1.50',
  },
  {
    role: 'Label / Micro',
    family: 'DM Sans',
    size: '12px (0.75rem)',
    weight: '500 (Medium)',
    lineHeight: '1.25',
  },
];

export const mockSpacingSystem: number[] = [4, 8, 12, 16, 24, 32, 48, 64];

export const mockDesignMd = [
  '## Design System Overview',
  '',
  'A modern, clean design system built on a Soft White canvas with Nero Blue as the primary brand accent.',
  '',
  '## Color Palette',
  '',
  '| Token | Value |',
  '|---|---|',
  '| Primary | `#053B84` |',
  '| Background | `#F5F5F6` |',
  '| Surface | `#FFFFFF` |',
  '| Text Primary | `#0A0A0A` |',
  '| Text Secondary | `rgba(10,10,10,0.6)` |',
  '| Border | `rgba(10,10,10,0.08)` |',
  '| Success | `#16A34A` |',
  '| Destructive | `#DC2626` |',
  '',
  '## Typography',
  '',
  '- **Outfit**: Display / Hero, Section Heading, Sub-heading',
  '- **DM Sans**: Body Large, Body Standard, Body Small, Label / Micro',
  '',
  '## Spacing',
  '',
  'Base unit: 8px. Scale: 4, 8, 12, 16, 24, 32, 48, 64px.',
  '',
  '## Usage',
  '',
  'Import tokens directly from the exported Tailwind config or use the CSS custom properties defined in `:root`.',
].join('\n');

export const mockTailwindConfig = [
  'module.exports = {',
  '  theme: {',
  '    extend: {',
  '      colors: {',
  "        primary: '#053B84',",
  "        background: '#F5F5F6',",
  "        surface: '#FFFFFF',",
  "        foreground: '#0A0A0A',",
  "        'foreground-secondary': 'rgba(10,10,10,0.6)',",
  "        border: 'rgba(10,10,10,0.08)',",
  "        success: '#16A34A',",
  "        destructive: '#DC2626',",
  '      },',
  '      fontFamily: {',
  "        heading: ['Outfit', 'sans-serif'],",
  "        body: ['DM Sans', 'sans-serif'],",
  "        mono: ['JetBrains Mono', 'monospace'],",
  '      },',
  '      spacing: {',
  "        0.5: '4px',",
  "        1: '8px',",
  "        1.5: '12px',",
  "        2: '16px',",
  "        3: '24px',",
  "        4: '32px',",
  "        6: '48px',",
  "        8: '64px',",
  '      },',
  '      borderRadius: {',
  "        DEFAULT: '8px',",
  "        sm: '4px',",
  "        md: '8px',",
  "        lg: '12px',",
  '      },',
  '    },',
  '  },',
  '};',
].join('\n');
