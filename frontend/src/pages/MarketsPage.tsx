import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { marketService } from "../services/marketService";
import type { Market } from "../types/market";

import MarketCard from "../components/cards/MarketCard";
import FeaturedMarket from "../components/cards/FeaturedMarket";
import RewardsCard from "../components/cards/RewardsCard";
import QuickStatsCard from "../components/cards/QuickStatsCard";

const MarketsPage = () => {
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    marketService.getAllMarkets().then(setMarkets);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top section */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <FeaturedMarket />
          </div>

          <div className="space-y-4">
            <RewardsCard />
            <QuickStatsCard />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="rounded-full bg-blue-100 px-4 py-2 text-sm">
              All Markets
            </button>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm">
              Economics
            </button>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm">
              Sports
            </button>
            <button className="rounded-full bg-slate-100 px-4 py-2 text-sm">
              Campus
            </button>
          </div>

          <span className="text-sm text-slate-500">
            Sort by: Highest Volume
          </span>
        </div>

        {/* Market grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {markets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center">
          <button className="text-sm text-slate-500">
            Load More Active Markets
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketsPage;
