export interface Position {
  id: string;
  marketId: string;
  userId: string;
  side: "yes" | "no";
  amountInvested: number;
  averageEntryPrice: number;
  currentValue: number;
  pnl: number;
}

export interface ActivePosition extends Position {
  marketTitle: string;
  marketClosesAt: string;
  sharePrice: number;
}

export interface ClosedPosition {
  id: string;
  marketId: string;
  marketTitle: string;
  closedAt: string;
  outcome: "won" | "lost";
  pnl: number;
}

export interface PortfolioSummary {
  netPortfolioValue: number;
  activeExposure: number;
  activeMarketsCount: number;
  unrealizedPnl: number;
  topPositionGainPercent: number;
  monthlyChangePercent: number;
}

export interface TradeHistoryEntry {
  id: string;
  marketTitle: string;
  side: "yes" | "no";
  amountInvested: number;
  sharePrice: number;
  executedAt: string;
  status: "open" | "closed";
}

export interface PayoutEntry {
  id: string;
  marketTitle: string;
  settledAt: string;
  payout: number;
  outcome: "won" | "lost";
}
