import { PrismaClient, TradeSide, TradeStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed single dev user (matches frontend mock)
  const user = await prisma.user.upsert({
    where: { id: "user-1" },
    update: {},
    create: {
      id: "user-1",
      fullName: "Paul Ezugwu",
      username: "pau_trader",
      email: "paul@example.com",
      balance: 103450,
      balanceRow: {
        create: {
          available: 185200,
        },
      },
    },
    include: { balanceRow: true },
  });

  // Markets (matches frontend mock)
  const markets = [
    {
      id: "market-1",
      title: "Will Team Alpha beat Team Beta in the PAU final?",
      category: "sports" as const,
      description:
        "Prediction market for the upcoming Pan-Atlantic football final.",
      yesPrice: 0.62,
      noPrice: 0.38,
      volume: 24500,
      liquidity: "high" as const,
      closesAt: new Date("2026-05-10T15:00:00Z"),
      status: "open" as const,
    },
    {
      id: "market-2",
      title: "Will the cafeteria launch the new student meal plan this month?",
      category: "campus" as const,
      description:
        "Campus operations market based on cafeteria announcements.",
      yesPrice: 0.41,
      noPrice: 0.59,
      volume: 9800,
      liquidity: "medium" as const,
      closesAt: new Date("2026-05-16T12:00:00Z"),
      status: "open" as const,
    },
    {
      id: "market-3",
      title: "Will PAU host an inter-school sports tournament this semester?",
      category: "sports" as const,
      description: "Market based on official athletics and student affairs updates.",
      yesPrice: 0.74,
      noPrice: 0.26,
      volume: 31000,
      liquidity: "high" as const,
      closesAt: new Date("2026-05-20T18:00:00Z"),
      status: "open" as const,
    },
  ];

  for (const market of markets) {
    await prisma.market.upsert({
      where: { id: market.id },
      update: market,
      create: market,
    });
  }

  // Market details (matches frontend mock)
  const marketDetails: Array<{
    marketId: string;
    title: string;
    category: string;
    subcategory: string;
    description: string;
    yesOdds: number;
    noOdds: number;
    yesOddsChange: number;
    noOddsChange: number;
    volume: number;
    expiresIn: string;
    status: "open" | "closed" | "resolved";
    chartData: Array<{ time: string; value: number }>;
  }> = [
    {
      marketId: "market-1",
      title: "Will Coupe de Escriva Finals go to extra time?",
      category: "Sports",
      subcategory: "Football",
      description:
        "This market resolves YES if the Coupe de Escriva Finals match goes beyond 90 minutes of regular time. It resolves NO if either team wins within normal time.",
      yesOdds: 0.64,
      noOdds: 0.36,
      yesOddsChange: 4,
      noOddsChange: -2,
      volume: 45280000,
      expiresIn: "12d : 04h : 22m",
      status: "open",
      chartData: [
        { time: "Day 1", value: 0.45 },
        { time: "Day 2", value: 0.48 },
        { time: "Day 3", value: 0.51 },
        { time: "Day 4", value: 0.49 },
        { time: "Day 5", value: 0.55 },
        { time: "Day 6", value: 0.58 },
        { time: "Day 7", value: 0.61 },
        { time: "Day 8", value: 0.59 },
        { time: "Day 9", value: 0.62 },
        { time: "Day 10", value: 0.64 },
      ],
    },
    {
      marketId: "market-2",
      title: "Will PAU Basketball team win the next home game?",
      category: "Sports",
      subcategory: "Basketball",
      description:
        "This market resolves YES if the PAU Basketball team wins their next scheduled home game. It resolves NO if they lose or the game is cancelled.",
      yesOdds: 0.59,
      noOdds: 0.41,
      yesOddsChange: 2,
      noOddsChange: -2,
      volume: 12400000,
      expiresIn: "3d : 10h : 15m",
      status: "open",
      chartData: [
        { time: "Day 1", value: 0.5 },
        { time: "Day 2", value: 0.52 },
        { time: "Day 3", value: 0.48 },
        { time: "Day 4", value: 0.53 },
        { time: "Day 5", value: 0.55 },
        { time: "Day 6", value: 0.57 },
        { time: "Day 7", value: 0.56 },
        { time: "Day 8", value: 0.58 },
        { time: "Day 9", value: 0.59 },
        { time: "Day 10", value: 0.59 },
      ],
    },
    {
      marketId: "market-3",
      title: "Will PAU Volleyball team go undefeated this semester?",
      category: "Sports",
      subcategory: "Volleyball",
      description:
        "This market resolves YES if the PAU Volleyball team wins every match scheduled this semester without a single loss or draw.",
      yesOdds: 0.38,
      noOdds: 0.62,
      yesOddsChange: -3,
      noOddsChange: 3,
      volume: 8750000,
      expiresIn: "18h : 30m",
      status: "open",
      chartData: [
        { time: "Day 1", value: 0.55 },
        { time: "Day 2", value: 0.52 },
        { time: "Day 3", value: 0.49 },
        { time: "Day 4", value: 0.46 },
        { time: "Day 5", value: 0.44 },
        { time: "Day 6", value: 0.43 },
        { time: "Day 7", value: 0.41 },
        { time: "Day 8", value: 0.4 },
        { time: "Day 9", value: 0.39 },
        { time: "Day 10", value: 0.38 },
      ],
    },
  ];

  for (const detail of marketDetails) {
    await prisma.marketDetail.upsert({
      where: { marketId: detail.marketId },
      update: {
        ...detail,
        status: detail.status,
        chartData: detail.chartData as unknown as object,
      },
      create: {
        ...detail,
        chartData: detail.chartData as unknown as object,
      },
    });
  }

  // Seed a few portfolio trade history entries (from frontend mock)
  const mockTradeHistory = [
    {
      id: "trade-1",
      marketTitle: "Will Coupe de Escriva Finals go to extra time?",
      side: "yes" as const,
      amountInvested: 500.0,
      sharePrice: 0.62,
      executedAt: "12 Jan 2025, 10:34am",
      status: "open" as const,
    },
    {
      id: "trade-2",
      marketTitle: "Will PAU Basketball team win the next home game?",
      side: "no" as const,
      amountInvested: 250.0,
      sharePrice: 0.41,
      executedAt: "10 Jan 2025, 2:15pm",
      status: "open" as const,
    },
    {
      id: "trade-3",
      marketTitle: "Will PAU win the inter-faculty football tournament?",
      side: "yes" as const,
      amountInvested: 300.0,
      sharePrice: 0.58,
      executedAt: "5 Jan 2025, 9:00am",
      status: "closed" as const,
    },
  ];

  const titleToMarketId = new Map(
    marketDetails.map((d) => [d.title, d.marketId] as const),
  );

  for (const t of mockTradeHistory) {
    await prisma.trade.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        userId: user.id,
        marketId: titleToMarketId.get(t.marketTitle) ?? null,
        marketTitle: t.marketTitle,
        side: t.side === "yes" ? TradeSide.yes : TradeSide.no,
        amountInvested: t.amountInvested,
        sharePrice: t.sharePrice,
        executedAt: t.executedAt,
        status: t.status === "open" ? TradeStatus.open : TradeStatus.closed,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
