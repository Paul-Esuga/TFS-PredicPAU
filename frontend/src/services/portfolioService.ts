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
import { tradeStore } from "../store/tradeStore";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Converts a session TradeHistoryEntry into an ActivePosition so it
// shows up in the Active Positions tab. currentValue and pnl are flat
// until the backend provides real valuations.
const sessionTradeToActivePosition = (
  trade: TradeHistoryEntry,
): ActivePosition => ({
  id: trade.id,
  marketId: trade.id, // best we have without a real marketId on the trade
  userId: "session-user",
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
    return Promise.resolve(mockPortfolioSummary);
  },

  getActivePositions: (): Promise<ActivePosition[]> => {
    const sessionPositions = tradeStore
      .getTrades()
      .map(sessionTradeToActivePosition);

    // Session positions appear at the top, mock positions follow
    return Promise.resolve([...sessionPositions, ...mockActivePositions]);
  },

  getClosedPositions: (): Promise<ClosedPosition[]> => {
    return Promise.resolve(mockClosedPositions);
  },

  getTradeHistory: (): Promise<TradeHistoryEntry[]> => {
    const combined = [...tradeStore.getTrades(), ...mockTradeHistory];
    return Promise.resolve(combined);
  },

  getPayouts: (): Promise<PayoutEntry[]> => {
    return Promise.resolve(mockPayouts);
  },
};
