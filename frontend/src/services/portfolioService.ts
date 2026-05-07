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

// Simulating async API calls — swap these out for real fetch calls when backend is ready

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
    return Promise.resolve(mockTradeHistory);
  },

  getPayouts: (): Promise<PayoutEntry[]> => {
    return Promise.resolve(mockPayouts);
  },
};
