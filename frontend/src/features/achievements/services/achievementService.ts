import type {
  Badge,
  BadgeFilter,
  RewardProgress,
  AchievementSummary,
} from "../types/achievement";
import { apiFetch } from "../../../services/apiClient";

export const achievementService = {
  getSummary: (): Promise<AchievementSummary> => {
    return apiFetch<AchievementSummary>("/api/achievements/summary");
  },

  getRewardProgress: (): Promise<RewardProgress> => {
    return apiFetch<RewardProgress>("/api/achievements/progress");
  },

  getBadges: (filter: BadgeFilter = "all"): Promise<Badge[]> => {
    const query = new URLSearchParams({ filter }).toString();
    return apiFetch<Badge[]>(`/api/achievements/badges?${query}`);
  },
};
