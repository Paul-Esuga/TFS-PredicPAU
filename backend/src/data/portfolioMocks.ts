import type {
  ActivePosition,
  ClosedPosition,
  PortfolioSummary,
  PayoutEntry,
} from "../types/portfolio";

export const mockPortfolioSummary: PortfolioSummary = {
  netPortfolioValue: 4820.45,
  activeExposure: 1150.0,
  activeMarketsCount: 8,
  unrealizedPnl: 245.12,
  topPositionGainPercent: 18,
  monthlyChangePercent: 12.4,
};

export const mockActivePositions: ActivePosition[] = [
  {
    id: "pos-1",
    marketId: "market-1",
    userId: "user-1",
    marketTitle: "Will Coupe de Escriva Finals go to extra time?",
    marketClosesAt: "Closes in 12 days",
    side: "yes",
    amountInvested: 500.0,
    sharePrice: 0.62,
    averageEntryPrice: 0.62,
    currentValue: 585.2,
    pnl: 85.2,
  },
  {
    id: "pos-2",
    marketId: "market-2",
    userId: "user-1",
    marketTitle: "Will PAU Basketball team win the next home game?",
    marketClosesAt: "Closes in 3 days",
    side: "no",
    amountInvested: 250.0,
    sharePrice: 0.41,
    averageEntryPrice: 0.41,
    currentValue: 215.0,
    pnl: -35.0,
  },
  {
    id: "pos-3",
    marketId: "market-3",
    userId: "user-1",
    marketTitle: "Will PAU Volleyball team go undefeated this semester?",
    marketClosesAt: "Closes in 18 hours",
    side: "yes",
    amountInvested: 400.0,
    sharePrice: 0.55,
    averageEntryPrice: 0.55,
    currentValue: 594.92,
    pnl: 194.92,
  },
];

export const mockClosedPositions: ClosedPosition[] = [
  {
    id: "closed-1",
    marketId: "market-4",
    marketTitle: "Will PAU win the inter-faculty football tournament?",
    closedAt: "Closed 2 days ago",
    outcome: "won",
    pnl: 450.0,
  },
  {
    id: "closed-2",
    marketId: "market-5",
    marketTitle: "Will the Coupe de Escriva opener exceed 3 goals?",
    closedAt: "Closed 4 days ago",
    outcome: "lost",
    pnl: -120.0,
  },
];

export const mockPayouts: PayoutEntry[] = [
  {
    id: "payout-1",
    marketTitle: "Will PAU win the inter-faculty football tournament?",
    settledAt: "Settled 2 days ago",
    payout: 750.0,
    outcome: "won",
  },
  {
    id: "payout-2",
    marketTitle: "Will the Coupe de Escriva opener exceed 3 goals?",
    settledAt: "Settled 4 days ago",
    payout: 0,
    outcome: "lost",
  },
];
