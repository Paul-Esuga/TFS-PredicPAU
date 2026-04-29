import type { Position } from "../types/position";

export const mockPositions: Position[] = [
  {
    id: "position-1",
    marketId: "market-1",
    userId: "user-1",
    side: "yes",
    amountInvested: 15000,
    averageEntryPrice: 0.56,
    currentValue: 18450,
    pnl: 3450,
  },
  {
    id: "position-2",
    marketId: "market-2",
    userId: "user-1",
    side: "no",
    amountInvested: 5000,
    averageEntryPrice: 0.61,
    currentValue: 4200,
    pnl: -800,
  },
];
