import { Router } from "express";

import { marketsRouter } from "./markets";
import { usersRouter } from "./users";
import { portfolioRouter } from "./portfolio";
import { achievementsRouter } from "./achievements";
import { tradesRouter } from "./trades";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
	res.json({ status: "ok" });
});

apiRouter.use("/markets", marketsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/portfolio", portfolioRouter);
apiRouter.use("/achievements", achievementsRouter);
apiRouter.use("/trades", tradesRouter);
