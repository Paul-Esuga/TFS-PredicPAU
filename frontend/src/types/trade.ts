export type TradeSide = "yes" | "no";

export type TradeStatus = "idle" | "confirming" | "success" | "error";

export interface TradeOrder {
  marketId: string;
  side: TradeSide;
  amount: number;
}

export interface TradeResult {
  id: string;
  marketId: string;
  side: TradeSide;
  amountInvested: number;
  sharesReceived: number;
  pricePerShare: number;
  estimatedPayout: number;
  executedAt: string;
}

export interface MarketDetail {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  yesOdds: number; // e.g 0.64 = 64%
  noOdds: number; // e.g 0.36 = 36%
  yesOddsChange: number; // e.g +4 or -2 (percentage change in last 24h)
  noOddsChange: number;
  volume: number;
  expiresIn: string; // e.g "12d : 04h : 22m"
  status: "open" | "closed" | "resolved";
  chartData: ChartDataPoint[];
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface UserBalance {
  available: number;
}
