import {
  mockAchievementSummary,
  mockRewardProgress,
  mockBadges,
} from "../mocks/achievementMocks";
import type {
  Badge,
  BadgeFilter,
  RewardProgress,
  AchievementSummary,
} from "../types/achievement";

export const achievementService = {
  getSummary: (): Promise<AchievementSummary> => {
    return Promise.resolve(mockAchievementSummary);
  },

  getRewardProgress: (): Promise<RewardProgress> => {
    return Promise.resolve(mockRewardProgress);
  },

  getBadges: (filter: BadgeFilter = "all"): Promise<Badge[]> => {
    const filtered =
      filter === "all"
        ? mockBadges
        : mockBadges.filter((badge) => badge.status === filter);

    return Promise.resolve(filtered);
  },
};
