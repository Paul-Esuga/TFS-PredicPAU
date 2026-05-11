import type { Market } from "../types/market";

export const mockMarkets: Market[] = [
  {
    id: "market-1",
    title: "Will Team Alpha beat Team Beta in the PAU final?",
    category: "sports",
    description:
      "Prediction market for the upcoming Pan-Atlantic football final.",
    yesPrice: 0.62,
    noPrice: 0.38,
    volume: 24500,
    liquidity: "high",
    closesAt: "2026-05-10T15:00:00Z",
    status: "open",
  },
  {
    id: "market-2",
    title: "Will the cafeteria launch the new student meal plan this month?",
    category: "campus",
    description: "Campus operations market based on cafeteria announcements.",
    yesPrice: 0.41,
    noPrice: 0.59,
    volume: 9800,
    liquidity: "medium",
    closesAt: "2026-05-16T12:00:00Z",
    status: "open",
  },
  {
    id: "market-3",
    title: "Will PAU host an inter-school sports tournament this semester?",
    category: "sports",
    description:
      "Market based on official athletics and student affairs updates.",
    yesPrice: 0.74,
    noPrice: 0.26,
    volume: 31000,
    liquidity: "high",
    closesAt: "2026-05-20T18:00:00Z",
    status: "open",
  },
];
