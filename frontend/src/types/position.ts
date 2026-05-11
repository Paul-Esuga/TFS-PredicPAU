export type PositionSide = "yes" | "no";

export interface Position {
  id: string;
  marketId: string;
  userId: string;
  side: PositionSide;
  amountInvested: number;
  averageEntryPrice: number;
  currentValue: number;
  pnl: number;
}
