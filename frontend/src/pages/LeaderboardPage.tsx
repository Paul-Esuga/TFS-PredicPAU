import DashboardLayout from "../layouts/DashboardLayout";

const leaders = [
  {
    rank: 1,
    name: "Tomiwa A.",
    wins: 18,
    balance: "₦148,900",
    streak: "7 Wins",
  },
  {
    rank: 2,
    name: "Adaeze N.",
    wins: 16,
    balance: "₦132,400",
    streak: "5 Wins",
  },
  {
    rank: 3,
    name: "David O.",
    wins: 14,
    balance: "₦121,750",
    streak: "4 Wins",
  },
  { rank: 4, name: "Maya E.", wins: 12, balance: "₦113,200", streak: "3 Wins" },
];

const LeaderboardPage = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-center text-5xl font-semibold text-white">
          Leaderboard
        </h1>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-[80px_1fr_120px_140px_120px] border-b border-slate-100 pb-3 text-sm font-semibold text-slate-400">
            <span>Rank</span>
            <span>Trader</span>
            <span>Wins</span>
            <span>Balance</span>
            <span>Streak</span>
          </div>

          <div className="divide-y divide-slate-100">
            {leaders.map((leader) => (
              <div
                key={leader.rank}
                className="grid grid-cols-[80px_1fr_120px_140px_120px] items-center py-5 text-sm"
              >
                <span className="font-semibold text-slate-500">
                  #{leader.rank}
                </span>
                <span className="font-semibold text-slate-900">
                  {leader.name}
                </span>
                <span className="text-slate-600">{leader.wins}</span>
                <span className="font-semibold text-slate-900">
                  {leader.balance}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-center text-xs font-semibold text-blue-600">
                  {leader.streak}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
