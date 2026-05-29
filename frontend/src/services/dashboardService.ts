import {
  dashboardActivity,
  dashboardLeaderboard,
  dashboardMarkets,
  dashboardSummaryCards,
  dashboardUpcomingEvents,
  dashboardRecentPositions,
} from "../mocks/dashboardMocks";
import type {
  DashboardActivity,
  DashboardLeaderboardEntry,
  DashboardMarket,
  DashboardSummaryCard,
  UpcomingEvent,
  RecentPosition,
} from "../types/dashboard";

export const dashboardService = {
  getSummaryCards: (): Promise<DashboardSummaryCard[]> => {
    return Promise.resolve(dashboardSummaryCards);
  },

  getMarkets: (): Promise<DashboardMarket[]> => {
    return Promise.resolve(dashboardMarkets);
  },

  getActivity: (): Promise<DashboardActivity[]> => {
    return Promise.resolve(dashboardActivity);
  },

  getLeaderboard: (): Promise<DashboardLeaderboardEntry[]> => {
    return Promise.resolve(dashboardLeaderboard);
  },

  getUpcomingEvents: (): Promise<UpcomingEvent[]> => {
    return Promise.resolve(dashboardUpcomingEvents);
  },

  getRecentPositions: (): Promise<RecentPosition[]> => {
    return Promise.resolve(dashboardRecentPositions);
  },
};
