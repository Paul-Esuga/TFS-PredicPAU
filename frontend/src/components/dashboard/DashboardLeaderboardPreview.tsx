import type { DashboardLeaderboardEntry } from "../../types/dashboard";

interface DashboardLeaderboardPreviewProps {
  leaders: DashboardLeaderboardEntry[];
}

const DashboardLeaderboardPreview = ({
  leaders,
}: DashboardLeaderboardPreviewProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Top Traders</h2>
        <span className="text-sm font-medium text-blue-600">Leaderboard</span>
      </div>

      <div className="space-y-3">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {leader.rank}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {leader.name}
                </p>
                <p className="text-xs text-slate-400">{leader.streak}</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-950">
              {leader.balance}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLeaderboardPreview;
