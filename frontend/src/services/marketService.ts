import { mockMarkets } from "../mocks/markets";
import type { Market } from "../types/market";

export const marketService = {
  async getAllMarkets(): Promise<Market[]> {
    return Promise.resolve(mockMarkets);
  },

  async getMarketById(id: string): Promise<Market | undefined> {
    return Promise.resolve(mockMarkets.find((market) => market.id === id));
  },
};
