import {
  beforeEach, describe, expect, it,
} from 'vitest';

import { useCreditsStore } from '../creditsSlice';
import { usePopupStore } from '../popup-store';

describe('CreditsStore & creditsSlice', () => {
  beforeEach(() => {
    // Reset stores to their defaults
    useCreditsStore.setState({
      balance: 10,
      transactions: [],
    });
    usePopupStore.setState({
      creditBalance: 10,
    });
  });

  it('initializes with the correct default states', () => {
    expect(useCreditsStore.getState().balance).toBe(10);
    expect(useCreditsStore.getState().transactions).toEqual([]);
  });

  it('deductCredit decrements the balance and prepends a "spent" transaction', () => {
    useCreditsStore.getState().deductCredit('Test Extraction');

    const state = useCreditsStore.getState();
    expect(state.balance).toBe(9);
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].type).toBe('spent');
    expect(state.transactions[0].amount).toBe(-1);
    expect(state.transactions[0].description).toBe('Test Extraction');
  });

  it('deductCredit does not decrement below 0', () => {
    useCreditsStore.setState({ balance: 0 });
    useCreditsStore.getState().deductCredit('Zero balance extraction');

    const state = useCreditsStore.getState();
    expect(state.balance).toBe(0);
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].amount).toBe(-1);
  });

  it('addCredits increments the balance and prepends a "purchased" transaction', () => {
    useCreditsStore.getState().addCredits(100, 'Pro Bundle');

    const state = useCreditsStore.getState();
    expect(state.balance).toBe(110);
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].type).toBe('purchased');
    expect(state.transactions[0].amount).toBe(100);
    expect(state.transactions[0].description).toBe('Pro Bundle Purchase');
  });

  it('initSignupCredits sets balance to 5 and prepends a "granted" transaction', () => {
    useCreditsStore.getState().initSignupCredits();

    const state = useCreditsStore.getState();
    expect(state.balance).toBe(5);
    expect(state.transactions).toHaveLength(1);
    expect(state.transactions[0].type).toBe('granted');
    expect(state.transactions[0].amount).toBe(5);
    expect(state.transactions[0].description).toBe('Sign-up Welcome Bonus');
  });

  it('synchronizes credits change to usePopupStore dynamically', () => {
    // Modify balance using useCreditsStore
    useCreditsStore.getState().setCreditBalance(42);

    expect(usePopupStore.getState().creditBalance).toBe(42);
  });

  it('synchronizes credits change from usePopupStore back to useCreditsStore dynamically', () => {
    // Modify balance using usePopupStore (e.g. signup or login action)
    usePopupStore.setState({ creditBalance: 88 });

    expect(useCreditsStore.getState().balance).toBe(88);
  });
});
