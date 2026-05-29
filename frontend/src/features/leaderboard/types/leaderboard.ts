export type LeaderboardFilter = "weekly" | "monthly" | "annual";

export type TrendDirection = "up" | "down" | "neutral";

export interface LeaderboardEntry {
  rank: number;
  username: string;
  specialization: string; // e.g "Institutional Trader"
  avatarInitials: string;
  totalPnl: number; // positive or negative
  winRate: number; // e.g 92.4
  trend: TrendDirection;
  isCurrentUser?: boolean;
}

export interface PersonalPerformance {
  rank: number;
  totalTraders: number;
  monthlyGrowthPercent: number;
  winRate: number;
  winRatePercentile: string; // e.g "Top 5% efficiency this month"
}
