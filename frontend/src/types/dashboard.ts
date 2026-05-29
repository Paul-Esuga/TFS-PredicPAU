export interface DashboardSummaryCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  subtitleHighlight?: string; // e.g "+12.4%" rendered in color
  badge?: string; // e.g "🔥" prefix for streak
}

export interface DashboardMarket {
  id: string;
  title: string;
  category: string;
  yesPrice: number;
  noPrice: number;
  volume: string;
}

export interface DashboardActivity {
  id: string;
  trader: string;
  action: string;
  market: string;
  time: string;
}

export interface DashboardLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  balance: string;
  streak: string;
}

export interface DashboardPerformancePoint {
  day: string;
  value: number;
}

export type PerformanceFilter = "1W" | "1M" | "3M";

export interface UpcomingEvent {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  startsIn: string; // e.g "Starts in 2h 45m" or "Ongoing"
  isOngoing: boolean;
  yesPrice: number;
  noPrice: number;
  marketId: string;
}

export type RecentPositionStatus = "winning" | "losing" | "locked";

export interface RecentPosition {
  id: string;
  marketName: string;
  marketId: string;
  position: "yes" | "no";
  investment: number;
  plDelta: number;
  status: RecentPositionStatus;
}
