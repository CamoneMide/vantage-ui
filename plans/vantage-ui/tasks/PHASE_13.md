# PHASE 13 — Credits & Billing UI

**Goal:** Build the full Credits tab — balance card, credit pack selector, mocked Stripe purchase flow, low-credit warning, and transaction history.  
**Depends On:** Phase 5  
**Unblocks:** Phase 14

---

- [x] **Create mock credits fixtures**: Typed credit balance and transaction data.
  - **Details:** Create `src/mocks/credits.mock.ts`. Export:
    - `mockCreditBalance: number` — `5` (matches the sign-up bonus).
    - `mockTransactionHistory: CreditTransaction[]` — 8 items. Type:
      ```typescript
      type CreditTransaction = {
        id: string;
        type: 'granted' | 'spent' | 'purchased';
        amount: number; // positive for grants/purchases, negative for spent
        description: string; // e.g. "Sign-up bonus", "Component extraction", "50-credit pack"
        createdAt: string; // ISO datetime
      };
      ```
      Mix of all 3 types, spanning the last 30 days. Include 3 `spent` entries (−1 each), 1 `granted` (+5 sign-up), 1 `purchased` (+50), and a few more for variety.
  - **Verification:** All exports importable. Zod schema validates all 8 transactions in a unit test. `pnpm test` → green.

- [x] **Create / finalize Zustand credits slice**: Full credit state management.
  - **Details:** Create (or finalize the stub from Phase 6) `src/store/creditsSlice.ts`. State: `{ balance: number, transactions: CreditTransaction[] }` seeded from `mockCreditBalance` and `mockTransactionHistory`. Actions:
    - `setCreditBalance(n)` — hard set.
    - `deductCredit()` — immutably decrements balance by 1, appends a `spent` transaction entry.
    - `addCredits(amount, pack)` — immutably adds credits, appends a `purchased` transaction.
    - `initSignupCredits()` — sets balance to 5, appends the `granted` entry.
  - Wire `deductCredit()` into `extractionSlice.startExtraction()` so each mock extraction decrements the balance. Add JSDoc to all actions.
  - **Verification:** Unit test: `deductCredit()` from `balance=5` → `balance=4` and transaction count +1. `addCredits(50, '50-pack')` → balance increases by 50 and transaction count +1. Does not mutate the original array. `pnpm test` → green.

- [x] **Build `CreditBalanceCard` component**: Top-level balance overview card.
  - **Details:** White card, `border-radius: 12px`, `padding: 24px`, `box-shadow: 0px 4px 12px rgba(0,0,0,0.05)`. Layout:
    - Top row: "Credit Balance" label (DM Sans 12px Medium, `rgba(10,10,10,0.6)`) + Zap icon (Nero Blue).
    - Main: Balance number in Outfit Bold 48px, Deep Black. Animate balance changes with a count-up animation (number increments/decrements over 400ms using `useSpring` from Framer Motion or a simple interval).
    - Below: "credits remaining" in DM Sans 14px `rgba(10,10,10,0.6)`.
    - Below: A thin progress bar showing consumption (e.g., `balance / 50 * 100%` assuming 50 is "full"). Nero Blue fill, Soft White track, `height: 6px`, `border-radius: 3px`.
  - **Verification:** Balance number renders and animates when balance changes (verify by triggering a mock extraction). Progress bar visually reflects the current balance proportion.

- [x] **Build low-credit warning banner**: Global warning when balance falls below 5.
  - **Details:** A full-width banner at the top of the Credits tab (above the balance card) — only shown when `balance < 5`. `background: rgba(220,38,38,0.06)`, `border: 1px solid rgba(220,38,38,0.2)`, `border-radius: 8px`, `padding: 12px 16px`. Icon: AlertTriangle (Destructive `#DC2626`, 16px). Text: "You're running low on credits ({balance} remaining). Purchase more to keep extracting." in DM Sans 13px `#DC2626`. This same banner appears as a compact ribbon in `PanelHeader` on all other tabs when `balance < 5`.
  - **Verification:** Banner appears in Credits tab when `balance < 5`. Banner is hidden when `balance >= 5`. The compact header ribbon appears on the Extract tab header when `balance < 5`.

- [x] **Build `CreditPackSelector` component**: 3-option credit pack purchase cards.
  - **Details:** 3 cards in a grid (1 column on narrow panels, or `display: flex; flex-direction: column; gap: 12px`). Pack definitions:
    - 50 credits — $4.99 — "Best for individuals"
    - 100 credits — $8.99 — "Most popular" (highlighted with a Nero Blue `border: 2px solid #053B84` and a "Popular" badge, Nero Blue bg, White text, 12px)
    - 200 credits — $15.99 — "Best value"
      Each card: White bg, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 12px`, `padding: 16px 20px`. Selected card: Nero Blue border (`border: 2px solid #053B84`), `box-shadow: 0px 4px 12px rgba(5,59,132,0.15)`. Click selects the card. Below the 3 cards: "Purchase {n} Credits" primary Nero Blue button (full-width, shows selected pack name and price). Props: `selected`, `onSelect`. Add JSDoc.
  - **Verification:** Clicking a pack card selects it (Nero Blue border). Only one card selected at a time. "Popular" badge renders on the 100-credit card. Button text updates with selected pack.

- [x] **Build mocked Stripe purchase flow**: Simulate a checkout session.
  - **Details:** On clicking "Purchase {n} Credits": set a local `isPurchasing: boolean` state. Show spinner on the button. After 2000ms (mock checkout): call `creditsSlice.addCredits(amount, packName)`. Show a Shadcn `<Toast>` (success): "✓ {n} credits added to your account!" Balance card animates the count-up. `isPurchasing` resets to `false`. No real Stripe or network call is made.
  - **Verification:** Clicking Purchase shows spinner for ~2 seconds. After 2 seconds: toast appears, balance increments correctly, progress bar updates. Transaction history gains a new "purchased" row.

- [x] **Build `TransactionHistoryTable` component**: Full transaction log.
  - **Details:** Section heading: "Transaction History" (Outfit SemiBold 14px). White card, `border: 1px solid rgba(10,10,10,0.08)`, `border-radius: 8px`. Table columns: Date | Type | Description | Amount. Styling:
    - Date: DM Sans 13px `rgba(10,10,10,0.6)` (formatted: "May 5, 2026")
    - Type badge: `granted` = Success green, `spent` = secondary gray, `purchased` = Nero Blue — pill badge, 11px.
    - Description: DM Sans 13px, Deep Black.
    - Amount: Outfit Medium 14px — green for positive (`+50`), red for negative (`−1`), right-aligned.
      Even/odd row striping (White / Soft White). Max height: 240px, `overflow-y: auto` with thin Nero Blue scrollbar.
  - **Verification:** All 8 mock transactions render. Amount colors are correct (green/red). Type badges show correct colors. New transactions added during testing appear at the top.

- [x] **Assemble `CreditsTab` and wire into side panel**: Replace placeholder from Phase 5.
  - **Details:** Layout in `CreditsTab.tsx`: [Low Credit Banner if < 5] → [Balance Card] → [Pack Selector] → [Transaction History]. Read all state from Zustand `creditsSlice`. Animate section entrance with `animate-fade-up` staggered per section.
  - **Verification:** Full Credits tab renders all sections. Purchase flow works end-to-end. Balance updates reflect on the `CreditBadge` in `PanelHeader` across all tabs.
