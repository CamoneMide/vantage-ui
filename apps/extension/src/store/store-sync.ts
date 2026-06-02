type BalanceSyncFn = (balance: number) => void;
let balanceSync: BalanceSyncFn | null = null;

export function setBalanceSync(fn: BalanceSyncFn) {
  balanceSync = fn;
}

export function syncBalance(balance: number) {
  balanceSync?.(balance);
}
