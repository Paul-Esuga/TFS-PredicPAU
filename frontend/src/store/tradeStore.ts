import type { TradeHistoryEntry } from "../types/portfolio";

// Module-level array — persists for the entire session
const sessionTrades: TradeHistoryEntry[] = [];

export const tradeStore = {
  addTrade: (trade: TradeHistoryEntry): void => {
    // Most recent trade first
    sessionTrades.unshift(trade);
  },

  getTrades: (): TradeHistoryEntry[] => {
    return sessionTrades;
  },

  clear: (): void => {
    sessionTrades.length = 0;
  },
};
