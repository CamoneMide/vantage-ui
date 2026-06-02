import { Button, toast } from '@vantage-ui/ui';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { runMockPurchase } from '../../../../mocks/mock-purchase';
import { useCreditsStore } from '../../../../store/creditsSlice';

type CreditPack = {
  id: string
  name: string
  credits: number
  price: string
  badge?: string
  description: string
};

const PACKS: CreditPack[] = [
  {
    id: 'pack-50',
    name: 'Starter Bundle',
    credits: 50,
    price: '$4.99',
    description: 'Best for individuals',
  },
  {
    id: 'pack-100',
    name: 'Pro Bundle',
    credits: 100,
    price: '$8.99',
    badge: 'Popular',
    description: 'Most popular',
  },
  {
    id: 'pack-200',
    name: 'Enterprise Bundle',
    credits: 200,
    price: '$15.99',
    description: 'Best value',
  },
];

export function CreditPackSelector() {
  const [selectedId, setSelectedId] = useState<string>('pack-100');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const addCredits = useCreditsStore((s) => s.addCredits);

  const selectedPack = PACKS.find((p) => p.id === selectedId) || PACKS[1];

  const handlePurchase = async () => {
    setIsPurchasing(true);

    try {
      await runMockPurchase();
    } catch {
      setIsPurchasing(false);
      toast({
        title: 'Purchase Failed',
        description: 'The transaction could not be completed. Please try again.',
        variant: 'destructive',
      });
      return;
    }

    addCredits(selectedPack.credits, selectedPack.name);
    setIsPurchasing(false);

    toast({
      title: 'Purchase Successful!',
      description: `${selectedPack.credits} credits have been added to your account.`,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h3
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#0A0A0A',
            margin: 0,
          }}
        >
          Purchase Credits
        </h3>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            color: 'rgba(10,10,10,0.5)',
            margin: 0,
          }}
        >
          Top up your account with credits to extract more components.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {PACKS.map((pack) => {
          const isSelected = pack.id === selectedId;

          return (
            <button
              key={pack.id}
              type="button"
              onClick={() => setSelectedId(pack.id)}
              style={{
                textAlign: 'left',
                background: '#FFFFFF',
                border: isSelected
                  ? '2px solid #053B84'
                  : '1px solid rgba(10,10,10,0.08)',
                borderRadius: '12px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: isSelected
                  ? '0px 4px 16px rgba(5, 59, 132, 0.12)'
                  : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {pack.badge && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '16px',
                    background: '#053B84',
                    color: '#FFFFFF',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 6px rgba(5, 59, 132, 0.2)',
                  }}
                >
                  {pack.badge}
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#0A0A0A',
                  }}
                >
                  {pack.credits}
                  {' '}
                  Credits
                </span>
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(10,10,10,0.5)',
                  }}
                >
                  {pack.description}
                </span>
              </div>

              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: isSelected ? '#053B84' : '#0A0A0A',
                }}
              >
                {pack.price}
              </div>
            </button>
          );
        })}
      </div>

      <Button
        onClick={handlePurchase}
        disabled={isPurchasing}
        style={{
          width: '100%',
          height: '42px',
          background: '#053B84',
          color: '#FFFFFF',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 600,
          fontSize: '14px',
          borderRadius: '8px',
          cursor: isPurchasing ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          border: 'none',
          boxShadow: '0px 4px 10px rgba(5, 59, 132, 0.15)',
          transition: 'all 0.15s ease',
        }}
      >
        {isPurchasing ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Connecting to Stripe Checkout...
          </>
        ) : (
          `Purchase ${selectedPack.credits} Credits (${selectedPack.price})`
        )}
      </Button>
    </div>
  );
}
