import { Router } from "express";
import { z } from "zod";
import crypto from "node:crypto";

import { prisma } from "../db";
import { HttpError } from "../lib/errors";

export const tradesRouter = Router();

const CURRENT_USER_ID = "user-1";

const tradeOrderSchema = z.object({
  marketId: z.string().min(1),
  side: z.enum(["yes", "no"]),
  amount: z.number().positive(),
});

tradesRouter.post("/execute", async (req, res, next) => {
  try {
    const order = tradeOrderSchema.parse(req.body);

    const detail = await prisma.marketDetail.findUnique({ where: { marketId: order.marketId } });
    if (!detail) throw new HttpError(404, `Market ${order.marketId} not found`);

    const balance = await prisma.userBalance.findUnique({ where: { userId: CURRENT_USER_ID } });
    if (!balance) throw new HttpError(404, "Balance not found");

    if (order.amount > balance.available) {
      throw new HttpError(400, "Insufficient balance");
    }

    const pricePerShare = order.side === "yes" ? detail.yesOdds : detail.noOdds;
    const sharesReceived = Number((order.amount / pricePerShare).toFixed(2));

    const id = `trade-${crypto.randomUUID()}`;
    const executedAt = new Date().toLocaleString();

    await prisma.userBalance.update({
      where: { userId: CURRENT_USER_ID },
      data: { available: balance.available - order.amount },
    });

    await prisma.trade.create({
      data: {
        id,
        userId: CURRENT_USER_ID,
        marketId: order.marketId,
        marketTitle: detail.title,
        side: order.side,
        amountInvested: order.amount,
        sharePrice: pricePerShare,
        executedAt,
        status: "open",
      },
    });

    res.json({
      id,
      marketId: order.marketId,
      side: order.side,
      amountInvested: order.amount,
      sharesReceived,
      pricePerShare,
      estimatedPayout: sharesReceived,
      executedAt,
    });
  } catch (e) {
    next(e);
  }
});
