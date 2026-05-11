import {
  mockActivePositions,
  mockClosedPositions,
  mockPortfolioSummary,
  mockTradeHistory,
  mockPayouts,
} from "../mocks/portfolioMocks";
import type {
  ActivePosition,
  ClosedPosition,
  PortfolioSummary,
  TradeHistoryEntry,
  PayoutEntry,
} from "../types/portfolio";
import { tradeStore } from "../store/tradeStore"; // NEW

export const portfolioService = {
  getSummary: (): Promise<PortfolioSummary> => {
    return Promise.resolve(mockPortfolioSummary);
  },

  getActivePositions: (): Promise<ActivePosition[]> => {
    return Promise.resolve(mockActivePositions);
  },

  getClosedPositions: (): Promise<ClosedPosition[]> => {
    return Promise.resolve(mockClosedPositions);
  },

  getTradeHistory: (): Promise<TradeHistoryEntry[]> => {
    // NEW — session trades appear at the top, mock trades follow
    const combined = [...tradeStore.getTrades(), ...mockTradeHistory];
    return Promise.resolve(combined);
  },

  getPayouts: (): Promise<PayoutEntry[]> => {
    return Promise.resolve(mockPayouts);
  },
};
