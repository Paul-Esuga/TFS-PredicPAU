import type {
  ActivePosition,
  ClosedPosition,
  PortfolioSummary,
  TradeHistoryEntry,
  PayoutEntry,
} from "../types/portfolio";
import { apiFetch } from "./apiClient";

export const portfolioService = {
  getSummary: (): Promise<PortfolioSummary> => {
    return apiFetch<PortfolioSummary>("/api/portfolio/summary");
  },

  getActivePositions: (): Promise<ActivePosition[]> => {
    return apiFetch<ActivePosition[]>("/api/portfolio/positions/active");
  },

  getClosedPositions: (): Promise<ClosedPosition[]> => {
    return apiFetch<ClosedPosition[]>("/api/portfolio/positions/closed");
  },

  getTradeHistory: (): Promise<TradeHistoryEntry[]> => {
    return apiFetch<TradeHistoryEntry[]>("/api/portfolio/trades");
  },

  getPayouts: (): Promise<PayoutEntry[]> => {
    return apiFetch<PayoutEntry[]>("/api/portfolio/payouts");
  },
};
