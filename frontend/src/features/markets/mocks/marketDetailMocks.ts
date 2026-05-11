import type {
  MarketDetail,
  UserBalance,
  TradeResult,
} from "../../../types/trade";

export const mockUserBalance: UserBalance = {
  available: 185200,
};

export const mockMarketDetails: Record<string, MarketDetail> = {
  "market-1": {
    id: "market-1",
    title: "Will Coupe de Escriva Finals go to extra time?",
    category: "Sports",
    subcategory: "Football",
    description:
      "This market resolves YES if the Coupe de Escriva Finals match goes beyond 90 minutes of regular time. It resolves NO if either team wins within normal time.",
    yesOdds: 0.64,
    noOdds: 0.36,
    yesOddsChange: 4,
    noOddsChange: -2,
    volume: 45280000,
    expiresIn: "12d : 04h : 22m",
    status: "open",
    chartData: [
      { time: "Day 1", value: 0.45 },
      { time: "Day 2", value: 0.48 },
      { time: "Day 3", value: 0.51 },
      { time: "Day 4", value: 0.49 },
      { time: "Day 5", value: 0.55 },
      { time: "Day 6", value: 0.58 },
      { time: "Day 7", value: 0.61 },
      { time: "Day 8", value: 0.59 },
      { time: "Day 9", value: 0.62 },
      { time: "Day 10", value: 0.64 },
    ],
  },
  "market-2": {
    id: "market-2",
    title: "Will PAU Basketball team win the next home game?",
    category: "Sports",
    subcategory: "Basketball",
    description:
      "This market resolves YES if the PAU Basketball team wins their next scheduled home game. It resolves NO if they lose or the game is cancelled.",
    yesOdds: 0.59,
    noOdds: 0.41,
    yesOddsChange: 2,
    noOddsChange: -2,
    volume: 12400000,
    expiresIn: "3d : 10h : 15m",
    status: "open",
    chartData: [
      { time: "Day 1", value: 0.5 },
      { time: "Day 2", value: 0.52 },
      { time: "Day 3", value: 0.48 },
      { time: "Day 4", value: 0.53 },
      { time: "Day 5", value: 0.55 },
      { time: "Day 6", value: 0.57 },
      { time: "Day 7", value: 0.56 },
      { time: "Day 8", value: 0.58 },
      { time: "Day 9", value: 0.59 },
      { time: "Day 10", value: 0.59 },
    ],
  },
  "market-3": {
    id: "market-3",
    title: "Will PAU Volleyball team go undefeated this semester?",
    category: "Sports",
    subcategory: "Volleyball",
    description:
      "This market resolves YES if the PAU Volleyball team wins every match scheduled this semester without a single loss or draw.",
    yesOdds: 0.38,
    noOdds: 0.62,
    yesOddsChange: -3,
    noOddsChange: 3,
    volume: 8750000,
    expiresIn: "18h : 30m",
    status: "open",
    chartData: [
      { time: "Day 1", value: 0.55 },
      { time: "Day 2", value: 0.52 },
      { time: "Day 3", value: 0.49 },
      { time: "Day 4", value: 0.46 },
      { time: "Day 5", value: 0.44 },
      { time: "Day 6", value: 0.43 },
      { time: "Day 7", value: 0.41 },
      { time: "Day 8", value: 0.4 },
      { time: "Day 9", value: 0.39 },
      { time: "Day 10", value: 0.38 },
    ],
  },
};

// Simulates what the backend would return after a trade is executed
export const mockTradeResult = (
  marketId: string,
  side: "yes" | "no",
  amount: number,
  pricePerShare: number,
): TradeResult => ({
  id: `trade-${Date.now()}`,
  marketId,
  side,
  amountInvested: amount,
  sharesReceived: parseFloat((amount / pricePerShare).toFixed(2)),
  pricePerShare,
  estimatedPayout: parseFloat((amount / pricePerShare).toFixed(2)),
  executedAt: new Date().toLocaleString(),
});
