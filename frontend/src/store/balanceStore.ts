import { mockUserBalance } from "../features/markets/mocks/marketDetailMocks";

type BalanceListener = (balance: number) => void;

// Module-level listener list — any component can subscribe
const listeners: BalanceListener[] = [];

export const balanceStore = {
  getBalance: (): number => {
    return mockUserBalance.available;
  },

  deduct: (amount: number): void => {
    mockUserBalance.available -= amount;
    balanceStore.notify();
  },

  notify: (): void => {
    listeners.forEach((fn) => fn(mockUserBalance.available));
  },

  subscribe: (fn: BalanceListener): (() => void) => {
    listeners.push(fn);
    // Return unsubscribe function
    return () => {
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    };
  },
};
