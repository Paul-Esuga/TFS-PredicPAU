const QuickStatsCard = () => {
  return (
    <div className="rounded-2xl bg-blue-600 p-5 text-white">
      <p className="text-xs">QUICK STATS</p>
      <h3 className="mt-2 text-xl font-semibold">Top 5% Rank</h3>
      <p className="text-xs opacity-80">Based on last 30 days accuracy</p>
    </div>
  );
};

export default QuickStatsCard;
