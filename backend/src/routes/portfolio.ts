import { Router } from "express";

import { prisma } from "../db";
import {
  mockActivePositions,
  mockClosedPositions,
  mockPayouts,
  mockPortfolioSummary,
} from "../data/portfolioMocks";

export const portfolioRouter = Router();

const CURRENT_USER_ID = "user-1";

portfolioRouter.get("/summary", (_req, res) => {
  res.json(mockPortfolioSummary);
});

portfolioRouter.get("/positions/active", (_req, res) => {
  res.json(mockActivePositions);
});

portfolioRouter.get("/positions/closed", (_req, res) => {
  res.json(mockClosedPositions);
});

portfolioRouter.get("/payouts", (_req, res) => {
  res.json(mockPayouts);
});

portfolioRouter.get("/trades", async (_req, res, next) => {
  try {
    const trades = await prisma.trade.findMany({
      where: { userId: CURRENT_USER_ID },
      orderBy: { createdAt: "desc" },
    });

    res.json(
      trades.map((t) => ({
        id: t.id,
        marketTitle: t.marketTitle,
        side: t.side,
        amountInvested: t.amountInvested,
        sharePrice: t.sharePrice,
        executedAt: t.executedAt,
        status: t.status,
      })),
    );
  } catch (e) {
    next(e);
  }
});
