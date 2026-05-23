export type CreditTransaction = {
  id: string
  type: 'granted' | 'spent' | 'purchased'
  amount: number // positive for grants/purchases, negative for spent
  description: string
  createdAt: string // ISO datetime
};

export const mockCreditBalance = 5;

export const mockTransactionHistory: CreditTransaction[] = [
  {
    id: 'tx-8',
    type: 'spent',
    amount: -1,
    description: 'Stripe Checkout Form Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 'tx-7',
    type: 'spent',
    amount: -1,
    description: 'Linear Dashboard Element Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
  },
  {
    id: 'tx-6',
    type: 'spent',
    amount: -1,
    description: 'Stripe Pricing Table Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
  },
  {
    id: 'tx-5',
    type: 'purchased',
    amount: 50,
    description: '50-Credit Pack Purchase',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: 'tx-4',
    type: 'spent',
    amount: -1,
    description: 'Hero Section Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
  },
  {
    id: 'tx-3',
    type: 'spent',
    amount: -1,
    description: 'Navigation Bar Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
  },
  {
    id: 'tx-2',
    type: 'spent',
    amount: -1,
    description: 'Footer Navigation Extraction',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
  },
  {
    id: 'tx-1',
    type: 'granted',
    amount: 5,
    description: 'Sign-up Welcome Bonus',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), // 20 days ago
  },
];
