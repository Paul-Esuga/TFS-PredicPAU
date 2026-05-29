import type {
  ActivePosition,
  ClosedPosition,
  PortfolioSummary,
  TradeHistoryEntry,
  PayoutEntry,
} from "../types/portfolio";
import { apiFetch } from "./apiClient";
import { tradeStore } from "../store/tradeStore";

// ─── Backend shapes ───────────────────────────────────────────────────────────

interface BackendTrade {
  id: string;
  marketId: string | null;
  marketTitle: string;
  side: "yes" | "no";
  amountInvested: number;
  sharePrice: number;
  executedAt: string;
  status: "open" | "closed";
}

// ─── Helper ───────────────────────────────────────────────────────────────────

const sessionTradeToActivePosition = (
  trade: TradeHistoryEntry,
): ActivePosition => ({
  id: trade.id,
  marketId: trade.id,
  userId: "user-1",
  marketTitle: trade.marketTitle,
  marketClosesAt: "Pending resolution",
  side: trade.side,
  amountInvested: trade.amountInvested,
  sharePrice: trade.sharePrice,
  averageEntryPrice: trade.sharePrice,
  currentValue: trade.amountInvested,
  pnl: 0,
});

// ─── Service ──────────────────────────────────────────────────────────────────

export const portfolioService = {
  getSummary: (): Promise<PortfolioSummary> => {
    return apiFetch<PortfolioSummary>("/api/portfolio/summary");
  },

  getActivePositions: async (): Promise<ActivePosition[]> => {
    const backendPositions = await apiFetch<ActivePosition[]>(
      "/api/portfolio/positions/active",
    );

    // Session trades merged at the top
    const sessionPositions = tradeStore
      .getTrades()
      .map(sessionTradeToActivePosition);

    return [...sessionPositions, ...backendPositions];
  },

  getClosedPositions: (): Promise<ClosedPosition[]> => {
    return apiFetch<ClosedPosition[]>("/api/portfolio/positions/closed");
  },

  getTradeHistory: async (): Promise<TradeHistoryEntry[]> => {
    const backendTrades = await apiFetch<BackendTrade[]>(
      "/api/portfolio/trades",
    );

    const backendHistory: TradeHistoryEntry[] = backendTrades.map((t) => ({
      id: t.id,
      marketTitle: t.marketTitle,
      side: t.side,
      amountInvested: t.amountInvested,
      sharePrice: t.sharePrice,
      executedAt: t.executedAt,
      status: t.status,
    }));

    // Session trades at the top, backend trades follow
    return [...tradeStore.getTrades(), ...backendHistory];
  },

  getPayouts: (): Promise<PayoutEntry[]> => {
    return apiFetch<PayoutEntry[]>("/api/portfolio/payouts");
  },
};
