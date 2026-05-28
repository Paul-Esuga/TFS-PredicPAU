import { Router } from "express";

import {
  mockAchievementSummary,
  mockBadges,
  mockRewardProgress,
} from "../data/achievementMocks";
import { z } from "zod";

export const achievementsRouter = Router();

achievementsRouter.get("/summary", (_req, res) => {
  res.json(mockAchievementSummary);
});

achievementsRouter.get("/progress", (_req, res) => {
  res.json(mockRewardProgress);
});

const badgeFilterSchema = z.enum(["all", "earned", "locked"]).default("all");

achievementsRouter.get("/badges", (req, res) => {
  const filter = badgeFilterSchema.parse(req.query.filter ?? "all");
  const filtered = filter === "all" ? mockBadges : mockBadges.filter((b) => b.status === filter);
  res.json(filtered);
});
