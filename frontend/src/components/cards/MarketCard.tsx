import { useNavigate } from "react-router-dom";
import type { Market } from "../../types/market";

interface Props {
  market: Market;
  activeFilter?: string;
}

const categoryColors: Record<string, string> = {
  sports: "bg-blue-50 text-blue-600",
  campus: "bg-emerald-50 text-emerald-600",
  academics: "bg-amber-50 text-amber-600",
  finance: "bg-purple-50 text-purple-600",
  entertainment: "bg-rose-50 text-rose-600",
};

const MarketCard = ({ market }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/markets/${market.id}`);
  };

  const handleTradeClick = (e: React.MouseEvent, side: "yes" | "no") => {
    // Stop the click from bubbling up to the card
    e.stopPropagation();
    navigate(`/markets/${market.id}`);
  };

  const colorClass =
    categoryColors[market.category] ?? "bg-slate-100 text-slate-600";

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between text-xs">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${colorClass}`}
        >
          {market.category}
        </span>
        <span className="text-slate-400">
          {market.status === "open" ? "Ends soon" : market.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-sm font-semibold leading-snug text-slate-800">
        {market.title}
      </h3>

      {/* Volume + liquidity */}
      <p className="mt-2 text-xs text-slate-400">
        Vol: ₦{market.volume.toLocaleString()} • Liquidity:{" "}
        <span
          className={
            market.liquidity === "high"
              ? "text-emerald-500"
              : market.liquidity === "medium"
                ? "text-amber-500"
                : "text-red-400"
          }
        >
          {market.liquidity}
        </span>
      </p>

      {/* YES / NO buttons */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={(e) => handleTradeClick(e, "yes")}
          className="flex-1 rounded-xl bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-200"
        >
          YES {market.yesPrice}¢
        </button>
        <button
          onClick={(e) => handleTradeClick(e, "no")}
          className="flex-1 rounded-xl bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-200"
        >
          NO {market.noPrice}¢
        </button>
      </div>

      {/* Probability bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${market.yesPrice * 100}%` }}
        />
      </div>
    </div>
  );
};

export default MarketCard;
