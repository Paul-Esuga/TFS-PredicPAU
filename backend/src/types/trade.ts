export type TradeSide = "yes" | "no";

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

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface MarketDetail {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  yesOdds: number;
  noOdds: number;
  yesOddsChange: number;
  noOddsChange: number;
  volume: number;
  expiresIn: string;
  status: "open" | "closed" | "resolved";
  chartData: ChartDataPoint[];
}

export interface UserBalance {
  available: number;
}
