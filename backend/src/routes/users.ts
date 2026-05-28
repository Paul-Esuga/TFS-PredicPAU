import { Router } from "express";

import { prisma } from "../db";
import { HttpError } from "../lib/errors";

export const usersRouter = Router();

// Dev: single "current" user to match the frontend mocks
const CURRENT_USER_ID = "user-1";

usersRouter.get("/me", async (_req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: CURRENT_USER_ID } });
    if (!user) throw new HttpError(404, "Current user not found");

    res.json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl ?? undefined,
      balance: user.balance,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/me/balance", async (_req, res, next) => {
  try {
    const balance = await prisma.userBalance.findUnique({ where: { userId: CURRENT_USER_ID } });
    if (!balance) throw new HttpError(404, "Balance not found");

    res.json({ available: balance.available });
  } catch (e) {
    next(e);
  }
});
