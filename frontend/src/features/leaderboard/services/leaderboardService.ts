import {
  mockLeaderboardEntries,
  mockPersonalPerformance,
} from "../mocks/leaderboardMocks";
import type {
  LeaderboardEntry,
  LeaderboardFilter,
  PersonalPerformance,
} from "../types/leaderboard";

const INITIAL_VISIBLE = 5;

export const leaderboardService = {
  getPersonalPerformance: (): Promise<PersonalPerformance> => {
    return Promise.resolve(mockPersonalPerformance);
  },

  getEntries: (
    filter: LeaderboardFilter,
    limit?: number,
  ): Promise<LeaderboardEntry[]> => {
    const entries = mockLeaderboardEntries[filter] ?? [];

    // Always keep current user row visible regardless of limit
    const currentUser = entries.find((e) => e.isCurrentUser);
    const rest = entries.filter((e) => !e.isCurrentUser);
    const sliced = limit ? rest.slice(0, limit) : rest;

    // Only append current user if they aren't already in the visible slice
    const alreadyVisible = sliced.some((e) => e.isCurrentUser);
    const result =
      currentUser && !alreadyVisible ? [...sliced, currentUser] : sliced;

    return Promise.resolve(result);
  },

  getInitialLimit: (): number => {
    return INITIAL_VISIBLE;
  },
};
