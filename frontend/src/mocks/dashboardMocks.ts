import type {
  DashboardActivity,
  DashboardLeaderboardEntry,
  DashboardMarket,
  DashboardSummaryCard,
  DashboardPerformancePoint,
  UpcomingEvent,
  RecentPosition,
} from "../types/dashboard";

export const dashboardSummaryCards: DashboardSummaryCard[] = [
  {
    id: "virtual-balance",
    title: "Virtual Balance",
    value: "₦103,450.00",
    subtitle: "since last session",
    subtitleHighlight: "+12.4%",
  },
  {
    id: "active-streak",
    title: "Active Streak",
    value: "3 Wins",
    badge: "🔥",
    subtitle: "at Pan-Atlantic",
    subtitleHighlight: "Top 5% of Traders",
  },
  {
    id: "market-pulse",
    title: "Market Pulse",
    value: "High Volatility",
    subtitle: "Live updates active",
  },
];

export const dashboardMarkets: DashboardMarket[] = [
  {
    id: "market-1",
    title: "Will Team Alpha beat Team Beta in the PAU final?",
    category: "Sports",
    yesPrice: 62,
    noPrice: 38,
    volume: "₦24,500",
  },
  {
    id: "market-2",
    title: "Will the cafeteria launch the new meal plan this month?",
    category: "Campus",
    yesPrice: 41,
    noPrice: 59,
    volume: "₦9,800",
  },
  {
    id: "market-3",
    title: "Will PAU host an inter-school tournament this semester?",
    category: "Sports",
    yesPrice: 74,
    noPrice: 26,
    volume: "₦31,000",
  },
];

export const dashboardActivity: DashboardActivity[] = [
  {
    id: "activity-1",
    trader: "Tomiwa A.",
    action: "bought YES",
    market: "PAU final",
    time: "2m ago",
  },
  {
    id: "activity-2",
    trader: "Adaeze N.",
    action: "bought NO",
    market: "Meal plan launch",
    time: "8m ago",
  },
  {
    id: "activity-3",
    trader: "David O.",
    action: "closed position",
    market: "Tournament market",
    time: "15m ago",
  },
];

export const dashboardLeaderboard: DashboardLeaderboardEntry[] = [
  {
    id: "leader-1",
    rank: 1,
    name: "Tomiwa A.",
    balance: "₦148,900",
    streak: "7 Wins",
  },
  {
    id: "leader-2",
    rank: 2,
    name: "Adaeze N.",
    balance: "₦132,400",
    streak: "5 Wins",
  },
  {
    id: "leader-3",
    rank: 3,
    name: "David O.",
    balance: "₦121,750",
    streak: "4 Wins",
  },
];

export const dashboardPerformanceData: Record<
  string,
  DashboardPerformancePoint[]
> = {
  "1W": [
    { day: "Mon", value: 91000 },
    { day: "Tue", value: 95000 },
    { day: "Wed", value: 93000 },
    { day: "Thu", value: 98000 },
    { day: "Fri", value: 102000 },
    { day: "Sat", value: 100000 },
    { day: "Sun", value: 103450 },
  ],
  "1M": [
    { day: "W1", value: 80000 },
    { day: "W2", value: 85000 },
    { day: "W3", value: 90000 },
    { day: "W4", value: 103450 },
  ],
  "3M": [
    { day: "Jan", value: 60000 },
    { day: "Feb", value: 72000 },
    { day: "Mar", value: 103450 },
  ],
};

export const dashboardUpcomingEvents: UpcomingEvent[] = [
  {
    id: "event-1",
    title: "Coupe de Escriva: Team Alpha vs Omega",
    category: "Sports",
    subcategory: "Football",
    startsIn: "Starts in 2h 45m",
    isOngoing: false,
    yesPrice: 1.85,
    noPrice: 2.15,
    marketId: "market-1",
  },
  {
    id: "event-2",
    title: "PAU Senate Election: Candidate X to win?",
    category: "Campus",
    subcategory: "Politics",
    startsIn: "Ongoing",
    isOngoing: true,
    yesPrice: 1.4,
    noPrice: 3.5,
    marketId: "market-2",
  },
];

export const dashboardRecentPositions: RecentPosition[] = [
  {
    id: "pos-1",
    marketName: "Will Team Alpha win the Coupe de Escriva finals?",
    marketId: "market-1",
    position: "yes",
    investment: 15000,
    plDelta: 2450,
    status: "winning",
  },
  {
    id: "pos-2",
    marketName: "PAU Tech Fest: Winner to be SME team?",
    marketId: "market-2",
    position: "no",
    investment: 5000,
    plDelta: -1200,
    status: "losing",
  },
  {
    id: "pos-3",
    marketName: "Rainfall in Lagos > 20mm tomorrow?",
    marketId: "market-3",
    position: "yes",
    investment: 8000,
    plDelta: 4100,
    status: "locked",
  },
];
