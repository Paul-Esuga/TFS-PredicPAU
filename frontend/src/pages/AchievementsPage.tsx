import { useEffect, useState } from "react";
import {
  Rocket,
  Flame,
  Medal,
  Coins,
  Moon,
  Layers,
  ShieldAlert,
  MessageSquare,
  type LucideIcon,
  Trophy,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { achievementService } from "../features/achievements/services/achievementService";
import type {
  Badge,
  BadgeFilter,
  RewardProgress,
  AchievementSummary,
} from "../features/achievements/types/achievement";

// ─── Icon Map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  flame: Flame,
  medal: Medal,
  coins: Coins,
  moon: Moon,
  layers: Layers,
  "shield-alert": ShieldAlert,
  "message-square": MessageSquare,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PageHeader = () => (
  <div className="mb-8">
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
      Milestones & Recognition
    </p>
    <h1 className="mt-2 text-4xl font-bold text-slate-900">Achievements</h1>
    <p className="mt-2 max-w-xl text-sm text-slate-500">
      Your strategic prowess on the PAU Predict floor, visualized through
      institutional milestones. Every win builds your legacy.
    </p>
  </div>
);

const RewardProgressCard = ({ reward }: { reward: RewardProgress }) => {
  const progressPercent = Math.min(
    (reward.currentAmount / reward.targetAmount) * 100,
    100,
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
      {/* Background watermark */}
      <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
        <Trophy size={120} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
          🍽️
        </div>
        <div>
          <p className="font-semibold">{reward.title}</p>
          <p className="text-xs text-blue-200">{reward.subtitle}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-blue-200">Current Progress</span>
          <span className="font-semibold">
            {reward.unit}
            {reward.currentAmount.toLocaleString()} /{" "}
            <span className="text-blue-200">
              {reward.unit}
              {reward.targetAmount.toLocaleString()}
            </span>
          </span>
        </div>

        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-2 rounded-full bg-white transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="mt-3 flex items-center gap-1 text-xs text-blue-200">
          <span>ℹ️</span>
          {reward.unit}
          {reward.remainingAmount.toLocaleString()} more profit to unlock this
          week's voucher
        </p>
      </div>
    </div>
  );
};

const SummaryCard = ({ summary }: { summary: AchievementSummary }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
      Trader Rank
    </p>

    <h2 className="mt-2 text-5xl font-bold text-blue-600">
      #{summary.traderRank}
    </h2>
    <p className="mt-1 text-sm font-semibold text-blue-500">
      {summary.rankPercentile}
    </p>

    <div className="mt-6 border-t border-slate-100 pt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Total Badges</p>
        <p className="text-sm font-semibold text-slate-800">
          {summary.totalBadgesEarned} / {summary.totalBadges}
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-slate-500">Win Rate</p>
        <p className="text-sm font-semibold text-blue-600">
          {summary.winRate}%
        </p>
      </div>
    </div>
  </div>
);

const BadgeCard = ({ badge }: { badge: Badge }) => {
  const IconComponent = iconMap[badge.icon] ?? Rocket;
  const isLocked = badge.status === "locked";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${
        isLocked
          ? "border-slate-100 bg-slate-50 opacity-60"
          : "border-slate-200 bg-white shadow-sm"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          isLocked ? "bg-slate-200" : "bg-blue-50"
        }`}
      >
        <IconComponent
          size={22}
          className={isLocked ? "text-slate-400" : "text-blue-600"}
        />
      </div>

      {/* Description */}
      <p
        className={`mt-4 text-sm leading-relaxed ${
          isLocked ? "text-slate-400" : "text-slate-600"
        }`}
      >
        {badge.description}
      </p>

      {/* Status pill */}
      <div className="mt-4">
        {badge.status === "earned" && badge.earnedDate ? (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
            EARNED {badge.earnedDate}
          </span>
        ) : (
          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-400">
            LOCKED
          </span>
        )}
      </div>
    </div>
  );
};

const BadgeFilterTabs = ({
  active,
  onChange,
}: {
  active: BadgeFilter;
  onChange: (f: BadgeFilter) => void;
}) => {
  const filters: BadgeFilter[] = ["all", "earned", "locked"];

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
            active === f
              ? "bg-slate-800 text-white"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const AchievementsPage = () => {
  const [summary, setSummary] = useState<AchievementSummary | null>(null);
  const [reward, setReward] = useState<RewardProgress | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [filter, setFilter] = useState<BadgeFilter>("all");
  const [loading, setLoading] = useState(true);

  // Initial load
  useEffect(() => {
    Promise.all([
      achievementService.getSummary(),
      achievementService.getRewardProgress(),
      achievementService.getBadges("all"),
    ]).then(([sum, rew, bdg]) => {
      setSummary(sum);
      setReward(rew);
      setBadges(bdg);
      setLoading(false);
    });
  }, []);

  // Re-fetch badges when filter changes
  useEffect(() => {
    achievementService.getBadges(filter).then(setBadges);
  }, [filter]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading achievements...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* ── Header ── */}
        <PageHeader />

        {/* ── Progress + Summary ── */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            {reward && <RewardProgressCard reward={reward} />}
          </div>
          <div>{summary && <SummaryCard summary={summary} />}</div>
        </div>

        {/* ── Badge Gallery ── */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-700">
              Badge Gallery
            </h2>
            <BadgeFilterTabs active={filter} onChange={setFilter} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AchievementsPage;
