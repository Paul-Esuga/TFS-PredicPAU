export type BadgeStatus = "earned" | "locked";
export type BadgeFilter = "all" | "earned" | "locked";

export interface Badge {
  id: string;
  title: string;
  description: string;
  status: BadgeStatus;
  earnedDate?: string;
  icon: string;
}

export interface RewardProgress {
  id: string;
  title: string;
  subtitle: string;
  currentAmount: number;
  targetAmount: number;
  remainingAmount: number;
  unit: string;
}

export interface AchievementSummary {
  traderRank: number;
  rankPercentile: string;
  totalBadgesEarned: number;
  totalBadges: number;
  winRate: number;
}
