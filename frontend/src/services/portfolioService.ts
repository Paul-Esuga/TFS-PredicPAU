import { mockPositions } from "../mocks/position";
import type { Position } from "../types/position";

export const portfolioService = {
  async getCurrentUserPositions(): Promise<Position[]> {
    return Promise.resolve(mockPositions);
  },
};
