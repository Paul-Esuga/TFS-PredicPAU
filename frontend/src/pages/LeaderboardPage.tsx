import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { leaderboardService } from "../features/leaderboard/services/leaderboardService";
import type {
  LeaderboardEntry,
  LeaderboardFilter,
  PersonalPerformance,
} from "../features/leaderboard/types/leaderboard";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const avatarColors: Record<string, string> = {
  QE: "bg-violet-500",
  AS: "bg-rose-400",
  BR: "bg-amber-400",
  SH: "bg-emerald-500",
  RN: "bg-slate-400",
  TA: "bg-blue-400",
  AN: "bg-pink-400",
  DO: "bg-teal-400",
  ME: "bg-indigo-500",
  default: "bg-blue-400",
};

const getAvatarColor = (initials: string) =>
  avatarColors[initials] ?? avatarColors.default;

// ─── Sub-components ───────────────────────────────────────────────────────────

const Avatar = ({ initials }: { initials: string }) => (
  <div
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${getAvatarColor(initials)}`}
  >
    {initials}
  </div>
);

const RankBadge = ({ rank }: { rank: number }) => {
  const isTop3 = rank <= 3;

  return (
    <div
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        isTop3 ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
      }`}
    >
      {rank}
    </div>
  );
};

const TrendIcon = ({ trend }: { trend: "up" | "down" | "neutral" }) => {
  if (trend === "up")
    return <TrendingUp size={16} className="text-emerald-500" />;
  if (trend === "down")
    return <TrendingDown size={16} className="text-red-400" />;
  return <Minus size={16} className="text-slate-400" />;
};

const FilterTabs = ({
  active,
  onChange,
}: {
  active: LeaderboardFilter;
  onChange: (f: LeaderboardFilter) => void;
}) => (
  <div className="flex rounded-xl bg-slate-100 p-1">
    {(["weekly", "monthly", "annual"] as LeaderboardFilter[]).map((f) => (
      <button
        key={f}
        onClick={() => onChange(f)}
        className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
          active === f
            ? "bg-white text-slate-800 shadow-sm"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        {f}
      </button>
    ))}
  </div>
);

const PersonalPerformanceCard = ({
  performance,
}: {
  performance: PersonalPerformance;
}) => (
  <div className="grid gap-4 md:grid-cols-3">
    {/* Rank */}
    <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        Personal Performance
      </p>
      <div className="mt-3 flex items-end gap-8">
        <div>
          <h2 className="text-4xl font-bold text-slate-900">
            #{performance.rank}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Ranked among {performance.totalTraders.toLocaleString()} traders
          </p>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <TrendingUp size={16} className="text-emerald-500" />
            <span className="text-xl font-bold text-emerald-500">
              +{performance.monthlyGrowthPercent}%
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">Monthly Growth</p>
        </div>
      </div>
    </div>

    {/* Win Rate */}
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        Win Rate
      </p>
      <h2 className="mt-3 text-4xl font-bold text-slate-900">
        {performance.winRate}%
      </h2>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${performance.winRate}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        {performance.winRatePercentile}
      </p>
    </div>
  </div>
);

const LeaderboardRow = ({ entry }: { entry: LeaderboardEntry }) => {
  const pnlPositive = entry.totalPnl >= 0;
  const isCurrentUser = entry.isCurrentUser ?? false;

  return (
    <div
      className={`grid grid-cols-[40px_1fr_auto] items-center gap-4 rounded-2xl px-4 py-4 transition-colors md:grid-cols-[40px_1fr_160px_100px_60px] ${
        isCurrentUser ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-slate-50"
      }`}
    >
      {/* Rank */}
      <RankBadge rank={entry.rank} />

      {/* Username */}
      <div className="flex items-center gap-3">
        <Avatar initials={entry.avatarInitials} />
        <div>
          <p
            className={`text-sm font-semibold ${
              isCurrentUser ? "text-blue-700" : "text-slate-800"
            }`}
          >
            {entry.username}
            {isCurrentUser && (
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                You
              </span>
            )}
          </p>
          <p className="text-xs text-slate-400">{entry.specialization}</p>
        </div>
      </div>

      {/* Total P/L — hidden on small screens */}
      <p
        className={`hidden text-sm font-semibold md:block ${
          pnlPositive ? "text-emerald-500" : "text-red-500"
        }`}
      >
        {pnlPositive ? "+" : ""}₦{Math.abs(entry.totalPnl).toLocaleString()}
      </p>

      {/* Win Rate */}
      <p className="text-sm font-medium text-slate-700">{entry.winRate}%</p>

      {/* Trend — hidden on small screens */}
      <div className="hidden md:flex justify-center">
        <TrendIcon trend={entry.trend} />
      </div>
    </div>
  );
};

const TableHeader = () => (
  <div className="hidden grid-cols-[40px_1fr_160px_100px_60px] gap-4 px-4 pb-2 md:grid">
    {["Rank", "Username", "Total P/L", "Win Rate", "Trend"].map((col) => (
      <p
        key={col}
        className="text-xs font-semibold uppercase tracking-widest text-slate-400"
      >
        {col}
      </p>
    ))}
  </div>
);

const CallToActionCards = () => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl bg-[#e8ecff] p-6 space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Join the Elite</h3>
        <p className="text-sm text-slate-500">
          Top 10 traders this month receive exclusive access to the
          Institutional Tier liquidity pools.
        </p>
        <button
          onClick={() => navigate("/portfolio")}
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Upgrade Portfolio
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-lg font-bold text-slate-800">Community Insights</h3>
        <p className="text-sm text-slate-500">
          Discuss strategies with the top ranked traders in the private
          community channels.
        </p>
        <button
          onClick={() => navigate("/community")}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Enter Lounge
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const LeaderboardPage = () => {
  const [performance, setPerformance] = useState<PersonalPerformance | null>(
    null,
  );
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<LeaderboardFilter>("weekly");
  const [limit, setLimit] = useState<number>(
    leaderboardService.getInitialLimit(),
  );
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    leaderboardService.getPersonalPerformance().then((p) => {
      setPerformance(p);
      setLoading(false);
    });
  }, []);

  // Reload entries when filter or limit changes
  useEffect(() => {
    leaderboardService.getEntries(filter, limit).then((data) => {
      setEntries(data);
      // Get total count without limit for load more logic
      leaderboardService
        .getEntries(filter)
        .then((all) => setTotalCount(all.length));
    });
  }, [filter, limit]);

  // Reset limit when filter changes
  const handleFilterChange = (f: LeaderboardFilter) => {
    setFilter(f);
    setLimit(leaderboardService.getInitialLimit());
  };

  const handleLoadMore = () => {
    setLimit((prev) => prev + 5);
  };

  const nonUserEntries = entries.filter((e) => !e.isCurrentUser);
  const currentUserEntry = entries.find((e) => e.isCurrentUser);
  const hasMore = limit < totalCount - 1; // subtract 1 for current user row

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading leaderboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ── Header ── */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Top Traders</h1>
          <p className="mt-1 text-sm text-slate-400">
            Visualizing the market's most precise architects.
          </p>
        </div>

        {/* ── Personal Performance ── */}
        {performance && <PersonalPerformanceCard performance={performance} />}

        {/* ── Table ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-1">
          {/* Table top row */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Rankings</p>
            <FilterTabs active={filter} onChange={handleFilterChange} />
          </div>

          <TableHeader />

          {/* Regular rows */}
          <div className="space-y-1">
            {nonUserEntries.map((entry) => (
              <LeaderboardRow key={entry.rank} entry={entry} />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Load More Architects
                <ChevronDown size={15} />
              </button>
            </div>
          )}

          {/* Current user row — always pinned at bottom */}
          {currentUserEntry && (
            <>
              <div className="my-2 border-t border-dashed border-slate-200" />
              <LeaderboardRow entry={currentUserEntry} />
            </>
          )}
        </div>

        {/* ── CTA Cards ── */}
        <CallToActionCards />
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
