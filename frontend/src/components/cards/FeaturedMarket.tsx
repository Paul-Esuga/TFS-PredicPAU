const FeaturedMarket = () => {
  return (
    <div className="rounded-2xl bg-[#e8ecff] p-6">
      <span className="text-xs font-semibold text-blue-600">
        TRENDING MARKET
      </span>

      <h2 className="mt-2 text-2xl font-semibold">
        Will Nigeria's GDP growth exceed 3.5% in Q4 2024?
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Institutional analysts are divided as petroleum output stabilizes.
      </p>

      <div className="mt-4 flex items-center gap-4">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">
          Predict YES at $0.62
        </button>

        <span className="text-sm text-slate-500">Volume $2.4M</span>
      </div>
    </div>
  );
};

export default FeaturedMarket;
