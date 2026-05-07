import type { Position } from "./position";
// import type { Market } from "./market";

export interface ActivePosition extends Position {
  marketTitle: string;
  marketClosesAt: string;
  sharePrice: number; // the price per share at entry e.g 0.62
}

export interface ClosedPosition {
  id: string;
  marketId: string;
  marketTitle: string;
  closedAt: string; // e.g "2 days ago"
  outcome: "won" | "lost";
  pnl: number; // positive or negative
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
