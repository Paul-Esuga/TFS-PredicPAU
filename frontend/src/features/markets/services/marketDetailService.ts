import type {
  MarketDetail,
  TradeOrder,
  TradeResult,
  UserBalance,
} from "../../../types/trade";
import { apiFetch } from "../../../services/apiClient";

export const marketDetailService = {
  getMarketById: (marketId: string): Promise<MarketDetail> => {
    return apiFetch<MarketDetail>(`/api/markets/${marketId}/details`);
  },

  getUserBalance: (): Promise<UserBalance> => {
    return apiFetch<UserBalance>("/api/users/me/balance");
  },

  executeTrade: (order: TradeOrder): Promise<TradeResult> => {
    return apiFetch<TradeResult>("/api/trades/execute", {
      method: "POST",
      body: JSON.stringify(order),
    });
  },
};
