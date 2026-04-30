import type { Market } from "../../types/market";

interface Props {
  market: Market;
}

const MarketCard = ({ market }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="rounded-full bg-slate-100 px-2 py-1 uppercase">
          {market.category}
        </span>
        <span>Ends soon</span>
      </div>

      <h3 className="mt-3 text-sm font-semibold text-slate-800">
        {market.title}
      </h3>

      <p className="mt-2 text-xs text-slate-400">
        Vol: ${market.volume.toLocaleString()} • Liquidity: {market.liquidity}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <button className="flex-1 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700">
          YES ${market.yesPrice}
        </button>

        <button className="flex-1 rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700">
          NO ${market.noPrice}
        </button>
      </div>

      <div className="mt-4 h-1 w-full rounded-full bg-slate-100">
        <div
          className="h-1 rounded-full bg-blue-500"
          style={{ width: `${market.yesPrice * 100}%` }}
        />
      </div>
    </div>
  );
};

export default MarketCard;
