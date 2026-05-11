import {
  mockMarketDetails,
  mockUserBalance,
  mockTradeResult,
} from "../mocks/marketDetailMocks";
import type {
  MarketDetail,
  TradeOrder,
  TradeResult,
  UserBalance,
} from "../../../types/trade";
import { tradeStore } from "../../../store/tradeStore"; // NEW

export const marketDetailService = {
  getMarketById: (marketId: string): Promise<MarketDetail> => {
    const market = mockMarketDetails[marketId];

    if (!market) {
      return Promise.reject(new Error(`Market ${marketId} not found`));
    }

    return Promise.resolve(market);
  },

  getUserBalance: (): Promise<UserBalance> => {
    return Promise.resolve(mockUserBalance);
  },

  executeTrade: (order: TradeOrder): Promise<TradeResult> => {
    const market = mockMarketDetails[order.marketId];

    if (!market) {
      return Promise.reject(new Error(`Market ${order.marketId} not found`));
    }

    if (order.amount <= 0) {
      return Promise.reject(new Error("Trade amount must be greater than 0"));
    }

    if (order.amount > mockUserBalance.available) {
      return Promise.reject(new Error("Insufficient balance"));
    }

    mockUserBalance.available -= order.amount;

    const pricePerShare = order.side === "yes" ? market.yesOdds : market.noOdds;

    const result = mockTradeResult(
      order.marketId,
      order.side,
      order.amount,
      pricePerShare,
    );

    // NEW — push to session trade store so portfolio history picks it up
    tradeStore.addTrade({
      id: result.id,
      marketTitle: market.title,
      side: order.side,
      amountInvested: order.amount,
      sharePrice: pricePerShare,
      executedAt: new Date().toLocaleString(),
      status: "open",
    });

    return Promise.resolve(result);
  },
};
