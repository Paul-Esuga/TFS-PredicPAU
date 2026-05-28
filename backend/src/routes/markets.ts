import { Router } from "express";

import { prisma } from "../db";
import { HttpError } from "../lib/errors";

export const marketsRouter = Router();

marketsRouter.get("/", async (_req, res, next) => {
  try {
    const markets = await prisma.market.findMany({ orderBy: { closesAt: "asc" } });

    res.json(
      markets.map((m) => ({
        id: m.id,
        title: m.title,
        category: m.category,
        description: m.description,
        yesPrice: m.yesPrice,
        noPrice: m.noPrice,
        volume: m.volume,
        liquidity: m.liquidity,
        closesAt: m.closesAt.toISOString(),
        status: m.status,
      })),
    );
  } catch (e) {
    next(e);
  }
});

marketsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const market = await prisma.market.findUnique({ where: { id } });
    if (!market) throw new HttpError(404, `Market ${id} not found`);

    res.json({
      id: market.id,
      title: market.title,
      category: market.category,
      description: market.description,
      yesPrice: market.yesPrice,
      noPrice: market.noPrice,
      volume: market.volume,
      liquidity: market.liquidity,
      closesAt: market.closesAt.toISOString(),
      status: market.status,
    });
  } catch (e) {
    next(e);
  }
});

marketsRouter.get("/:id/details", async (req, res, next) => {
  try {
    const id = req.params.id;
    const detail = await prisma.marketDetail.findUnique({ where: { marketId: id } });
    if (!detail) throw new HttpError(404, `Market ${id} not found`);

    res.json({
      id: detail.marketId,
      title: detail.title,
      category: detail.category,
      subcategory: detail.subcategory,
      description: detail.description,
      yesOdds: detail.yesOdds,
      noOdds: detail.noOdds,
      yesOddsChange: detail.yesOddsChange,
      noOddsChange: detail.noOddsChange,
      volume: detail.volume,
      expiresIn: detail.expiresIn,
      status: detail.status,
      chartData: detail.chartData,
    });
  } catch (e) {
    next(e);
  }
});
