import type { AchievementSummary, Badge, RewardProgress } from "../types/achievement";

export const mockAchievementSummary: AchievementSummary = {
  traderRank: 14,
  rankPercentile: "Top 5% of Students",
  totalBadgesEarned: 12,
  totalBadges: 48,
  winRate: 68.4,
};

export const mockRewardProgress: RewardProgress = {
  id: "reward-1",
  title: "Meal Voucher Reward",
  subtitle: "Pan-Atlantic Cafeteria Excellence",
  currentAmount: 18000,
  targetAmount: 25000,
  remainingAmount: 7000,
  unit: "₦",
};

export const mockBadges: Badge[] = [
  {
    id: "badge-1",
    title: "First Prediction",
    description:
      "The journey begins. Successfully placed your first market position.",
    status: "earned",
    earnedDate: "OCT 12",
    icon: "rocket",
  },
  {
    id: "badge-2",
    title: "3-Win Streak",
    description: "Precision over luck. Won three consecutive market outcomes.",
    status: "earned",
    earnedDate: "OCT 24",
    icon: "flame",
  },
  {
    id: "badge-3",
    title: "Weekly Top 10",
    description: "Ranked in the top 10 most profitable traders this week.",
    status: "earned",
    earnedDate: "NOV 02",
    icon: "medal",
  },
  {
    id: "badge-4",
    title: "Market Whale",
    description: "Place a single prediction exceeding ₦100,000 in volume.",
    status: "locked",
    icon: "coins",
  },
  {
    id: "badge-5",
    title: "Night Owl",
    description: "Executed a winning trade between 12:00 AM and 4:00 AM.",
    status: "earned",
    earnedDate: "OCT 15",
    icon: "moon",
  },
  {
    id: "badge-6",
    title: "Diversified",
    description:
      "Held active positions in 5 different market categories simultaneously.",
    status: "earned",
    earnedDate: "NOV 10",
    icon: "layers",
  },
  {
    id: "badge-7",
    title: "Risk Master",
    description: "Win a market where the implied probability was under 10%.",
    status: "locked",
    icon: "shield-alert",
  },
  {
    id: "badge-8",
    title: "Community Sage",
    description: "Your market analysis received 50+ helpful votes from peers.",
    status: "locked",
    icon: "message-square",
  },
];
