import express from "express";
import cors from "cors";

import { env } from "./lib/env";
import { apiRouter } from "./routes/api";
import { errorHandler, notFoundHandler } from "./lib/errors";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.corsOrigin === "*" ? true : env.corsOrigin,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // When deployed as Vercel Function `api/[...all].ts`, requests come in under `/api/*`.
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
