import type {
  MarketDetail,
  TradeOrder,
  TradeResult,
  UserBalance,
} from "../../../types/trade";
import { apiFetch } from "../../../services/apiClient";
import { tradeStore } from "../../../store/tradeStore";

export const marketDetailService = {
  getMarketById: (marketId: string): Promise<MarketDetail> => {
    return apiFetch<MarketDetail>(`/api/markets/${marketId}/details`);
  },

  getUserBalance: (): Promise<UserBalance> => {
    return apiFetch<UserBalance>("/api/users/me/balance");
  },

  executeTrade: async (order: TradeOrder): Promise<TradeResult> => {
    const result = await apiFetch<TradeResult>("/api/trades/execute", {
      method: "POST",
      body: JSON.stringify(order),
    });

    // Record in session store so portfolio history picks it up immediately
    tradeStore.addTrade({
      id: result.id,
      marketTitle: order.marketId, // will be resolved by portfolio service
      side: order.side,
      amountInvested: order.amount,
      sharePrice: result.pricePerShare,
      executedAt: result.executedAt,
      status: "open",
    });

    return result;
  },
};
