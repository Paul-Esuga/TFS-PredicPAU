import type { DashboardMarket } from "../../types/dashboard";

interface DashboardMarketPulseProps {
  markets: DashboardMarket[];
}

const DashboardMarketPulse = ({ markets }: DashboardMarketPulseProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">
          Trending Markets
        </h2>
        <span className="text-sm font-medium text-blue-600">View all</span>
      </div>

      <div className="space-y-4">
        {markets.map((market) => (
          <div
            key={market.id}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {market.category}
                </span>
                <h3 className="mt-3 max-w-xl text-sm font-semibold text-slate-950">
                  {market.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Volume: {market.volume}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <span className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700">
                  YES {market.yesPrice}
                </span>
                <span className="rounded-lg bg-violet-100 px-3 py-2 text-sm font-semibold text-violet-700">
                  NO {market.noPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMarketPulse;
