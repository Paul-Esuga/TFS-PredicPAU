import type { Market } from "../types/market";
import { apiFetch, ApiError } from "./apiClient";

export const marketService = {
  async getAllMarkets(): Promise<Market[]> {
    return apiFetch<Market[]>("/api/markets");
  },

  async getMarketById(id: string): Promise<Market | undefined> {
    try {
      return await apiFetch<Market>(`/api/markets/${id}`);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return undefined;
      throw e;
    }
  },
};
