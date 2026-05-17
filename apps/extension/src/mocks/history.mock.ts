import type { JsonBlueprint } from '~store/extraction-store';

export type ExtractionHistoryItem = {
  id: string
  sourceUrl: string
  sourceDomain: string
  elementTag: string
  capturedAt: string
  thumbnailUrl: string
  generatedCode: string
  jsonBlueprint: JsonBlueprint
};

const now = Date.now();
const DAY = 86_400_000;
const HOUR = 3_600_000;

export const mockHistory: ExtractionHistoryItem[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    sourceUrl: 'https://linear.app/issues',
    sourceDomain: 'linear.app',
    elementTag: 'div.issue-card',
    capturedAt: new Date(now - 2 * HOUR).toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/linear/112/80',
    generatedCode: `import { Card } from '@/components/ui/card';

export function IssueCard() {
  return (
    <Card className="p-4 border border-border rounded-lg">
      <h3 className="font-heading font-semibold text-foreground">
        VNT-123: Fix navigation
      </h3>
      <p className="text-sm text-muted-foreground">In progress</p>
    </Card>
  );
}`,
    jsonBlueprint: {
      element: 'div',
      attributes: { className: 'issue-card' },
      styles: { padding: '16px', borderRadius: '8px' },
      animations: [],
      assets: [],
      ariaAttributes: {},
      childElements: [],
    },
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    sourceUrl: 'https://stripe.com/payments',
    sourceDomain: 'stripe.com',
    elementTag: 'button.payment-btn',
    capturedAt: new Date(now - 6 * HOUR).toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/stripe/112/80',
    generatedCode: `import { Button } from '@/components/ui/button';

export function PaymentButton() {
  return (
    <Button variant="primary" className="w-full">
      Pay $49.99
    </Button>
  );
}`,
    jsonBlueprint: {
      element: 'button',
      attributes: { className: 'payment-btn' },
      styles: { width: '100%', padding: '12px 24px' },
      animations: [],
      assets: [],
      ariaAttributes: { role: 'button' },
      childElements: [],
    },
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    sourceUrl: 'https://vercel.com/dashboard',
    sourceDomain: 'vercel.com',
    elementTag: 'nav.sidebar-nav',
    capturedAt: new Date(now - 1 * DAY).toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/vercel/112/80',
    generatedCode: `export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 p-4">
      <a href="/projects" className="text-sm font-medium">Projects</a>
      <a href="/deployments" className="text-sm font-medium">Deployments</a>
      <a href="/settings" className="text-sm font-medium">Settings</a>
    </nav>
  );
}`,
    jsonBlueprint: {
      element: 'nav',
      attributes: { className: 'sidebar-nav' },
      styles: { display: 'flex', flexDirection: 'column', gap: '4px' },
      animations: [],
      assets: [],
      ariaAttributes: { role: 'navigation' },
      childElements: [],
    },
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    sourceUrl: 'https://ui.shadcn.com/docs/components',
    sourceDomain: 'ui.shadcn.com',
    elementTag: 'div.component-preview',
    capturedAt: new Date(now - 3 * DAY).toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/shadcn/112/80',
    generatedCode: `import { Badge } from '@/components/ui/badge';

export function ComponentBadge() {
  return (
    <Badge variant="secondary" className="text-xs">
      New component
    </Badge>
  );
}`,
    jsonBlueprint: {
      element: 'div',
      attributes: { className: 'component-preview' },
      styles: { padding: '24px', borderRadius: '8px' },
      animations: [],
      assets: [],
      ariaAttributes: {},
      childElements: [],
    },
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    sourceUrl: 'https://tailwindui.com/components',
    sourceDomain: 'tailwindui.com',
    elementTag: 'section.hero',
    capturedAt: new Date(now - 6 * DAY).toISOString(),
    thumbnailUrl: 'https://picsum.photos/seed/tailwindui/112/80',
    generatedCode: `export function HeroSection() {
  return (
    <section className="py-24 text-center">
      <h1 className="font-heading text-5xl font-semibold">
        Build faster
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Start building with Tailwind UI.
      </p>
    </section>
  );
}`,
    jsonBlueprint: {
      element: 'section',
      attributes: { className: 'hero' },
      styles: { padding: '96px 0', textAlign: 'center' },
      animations: [],
      assets: [],
      ariaAttributes: {},
      childElements: [],
    },
  },
];
