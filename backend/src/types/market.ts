export type MarketCategory =
  | "sports"
  | "campus"
  | "academics"
  | "finance"
  | "entertainment";

export type MarketStatus = "open" | "closed" | "resolved";

export interface Market {
  id: string;
  title: string;
  category: MarketCategory;
  description: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
  liquidity: "low" | "medium" | "high";
  closesAt: string;
  status: MarketStatus;
}
