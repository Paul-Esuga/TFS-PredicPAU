import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

import { createApp } from "../app";
import { prisma } from "../db";

describe("backend api", () => {
  const app = createApp();
  const testMarketId = "market-test-1";
  let dbAvailable = false;

  type HasId = { id: string };

  beforeAll(async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      dbAvailable = true;
    } catch {
      dbAvailable = false;
      if (process.env.CI === "true") {
        throw new Error(
          "Database is not reachable in CI; check DATABASE_URL / Postgres service.",
        );
      }
    }

    if (!dbAvailable) return;

    await prisma.user.upsert({
      where: { id: "user-1" },
      update: { balance: 103450 },
      create: {
        id: "user-1",
        fullName: "Paul Ezugwu",
        username: "pau_trader",
        email: "paul@example.com",
        balance: 103450,
      },
    });

    await prisma.userBalance.upsert({
      where: { userId: "user-1" },
      update: { available: 1000 },
      create: { userId: "user-1", available: 1000 },
    });

    await prisma.market.upsert({
      where: { id: testMarketId },
      update: {
        title: "Test market",
        category: "sports",
        description: "Market used for API tests",
        yesPrice: 0.6,
        noPrice: 0.4,
        volume: 100,
        liquidity: "medium",
        closesAt: new Date("2026-06-01T12:00:00Z"),
        status: "open",
      },
      create: {
        id: testMarketId,
        title: "Test market",
        category: "sports",
        description: "Market used for API tests",
        yesPrice: 0.6,
        noPrice: 0.4,
        volume: 100,
        liquidity: "medium",
        closesAt: new Date("2026-06-01T12:00:00Z"),
        status: "open",
      },
    });

    await prisma.marketDetail.upsert({
      where: { marketId: testMarketId },
      update: {
        title: "Test market detail",
        category: "Sports",
        subcategory: "Football",
        description: "Detail used for API tests",
        yesOdds: 0.6,
        noOdds: 0.4,
        yesOddsChange: 0,
        noOddsChange: 0,
        volume: 100,
        expiresIn: "1d",
        status: "open",
        chartData: [{ time: "t1", value: 0.6 }],
      },
      create: {
        marketId: testMarketId,
        title: "Test market detail",
        category: "Sports",
        subcategory: "Football",
        description: "Detail used for API tests",
        yesOdds: 0.6,
        noOdds: 0.4,
        yesOddsChange: 0,
        noOddsChange: 0,
        volume: 100,
        expiresIn: "1d",
        status: "open",
        chartData: [{ time: "t1", value: 0.6 }],
      },
    });
  });

  afterAll(async () => {
    if (!dbAvailable) return;
    // Best-effort cleanup (keeps user-1, which is a dev fixture)
    await prisma.trade.deleteMany({ where: { marketId: testMarketId } });
    await prisma.marketDetail.deleteMany({ where: { marketId: testMarketId } });
    await prisma.market.deleteMany({ where: { id: testMarketId } });
    await prisma.$disconnect();
  });

  it("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("GET /api/markets includes seeded test market", async () => {
    if (!dbAvailable) return;
    const res = await request(app).get("/api/markets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const markets = res.body as HasId[];
    expect(markets.some((m) => m.id === testMarketId)).toBe(true);
  });

  it("POST /api/trades/execute creates a trade and reduces available balance", async () => {
    if (!dbAvailable) return;
    const before = await request(app).get("/api/users/me/balance");
    expect(before.status).toBe(200);
    const beforeAvailable = before.body.available as number;

    const execRes = await request(app)
      .post("/api/trades/execute")
      .send({ marketId: testMarketId, side: "yes", amount: 100 });

    expect(execRes.status).toBe(200);
    expect(execRes.body.marketId).toBe(testMarketId);
    expect(execRes.body.side).toBe("yes");
    expect(execRes.body.amountInvested).toBe(100);
    expect(typeof execRes.body.id).toBe("string");

    const after = await request(app).get("/api/users/me/balance");
    expect(after.status).toBe(200);
    expect(after.body.available).toBe(beforeAvailable - 100);

    const trades = await request(app).get("/api/portfolio/trades");
    expect(trades.status).toBe(200);
    const tradeHistory = trades.body as HasId[];
    expect(tradeHistory.some((t) => t.id === execRes.body.id)).toBe(true);
  });
});
