export type BadgeStatus = "earned" | "locked";

export type BadgeFilter = "all" | "earned" | "locked";

export interface Badge {
  id: string;
  title: string;
  description: string;
  status: BadgeStatus;
  earnedDate?: string; // e.g "OCT 12" — only present if earned
  icon: string; // lucide icon name — we map this in the component
}

export interface RewardProgress {
  id: string;
  title: string;
  subtitle: string;
  currentAmount: number;
  targetAmount: number;
  remainingAmount: number;
  unit: string; // e.g "₦"
}

export interface AchievementSummary {
  traderRank: number;
  rankPercentile: string; // e.g "Top 5% of Students"
  totalBadgesEarned: number;
  totalBadges: number;
  winRate: number;
}
