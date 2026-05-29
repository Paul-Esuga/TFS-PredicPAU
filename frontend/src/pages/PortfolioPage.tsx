import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { portfolioService } from "../services/portfolioService";
import type {
  ActivePosition,
  ClosedPosition,
  PortfolioSummary,
  TradeHistoryEntry,
  PayoutEntry,
} from "../types/portfolio";
import type { MarketCategory } from "../types/market";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "active" | "history" | "payouts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryEmoji: Record<MarketCategory | "default", string> = {
  sports: "🏟️",
  campus: "🏫",
  academics: "📚",
  finance: "📈",
  entertainment: "🎭",
  default: "📊",
};

const getCategoryEmoji = (title: string): string => {
  const lower = title.toLowerCase();
  if (
    lower.includes("football") ||
    lower.includes("basketball") ||
    lower.includes("volleyball") ||
    lower.includes("coupe") ||
    lower.includes("team") ||
    lower.includes("match")
  )
    return categoryEmoji.sports;
  if (
    lower.includes("campus") ||
    lower.includes("cafeteria") ||
    lower.includes("senate") ||
    lower.includes("pau")
  )
    return categoryEmoji.campus;
  if (
    lower.includes("exam") ||
    lower.includes("score") ||
    lower.includes("academic") ||
    lower.includes("midterm")
  )
    return categoryEmoji.academics;
  if (
    lower.includes("naira") ||
    lower.includes("btc") ||
    lower.includes("stock") ||
    lower.includes("market") ||
    lower.includes("finance")
  )
    return categoryEmoji.finance;
  if (
    lower.includes("concert") ||
    lower.includes("show") ||
    lower.includes("entertainment")
  )
    return categoryEmoji.entertainment;
  return categoryEmoji.default;
};

// ─── Empty States ─────────────────────────────────────────────────────────────

const EmptyState = ({
  emoji,
  title,
  subtitle,
}: {
  emoji: string;
  title: string;
  subtitle: string;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-5xl">{emoji}</div>
    <p className="mt-4 text-base font-semibold text-slate-700">{title}</p>
    <p className="mt-1 max-w-xs text-sm text-slate-400">{subtitle}</p>
  </div>
);

// ─── Sub-components ───────────────────────────────────────────────────────────

const SummaryCard = ({
  title,
  value,
  subtitle,
  subtitleColor = "text-slate-400",
}: {
  title: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-sm text-slate-500">{title}</p>
    <h3 className="mt-2 text-2xl font-semibold text-slate-900">{value}</h3>
    <p className={`mt-1 text-xs font-medium ${subtitleColor}`}>{subtitle}</p>
  </div>
);

const PositionBadge = ({ side }: { side: "yes" | "no" }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      side === "yes"
        ? "bg-blue-100 text-blue-600"
        : "bg-purple-100 text-purple-600"
    }`}
  >
    {side.toUpperCase()}
  </span>
);

// ─── Active Positions Tab ─────────────────────────────────────────────────────

const ActivePositionsTab = ({ positions }: { positions: ActivePosition[] }) => {
  const navigate = useNavigate();

  if (positions.length === 0) {
    return (
      <EmptyState
        emoji="📭"
        title="No active positions"
        subtitle="Head to the Markets page and place your first prediction to see it here."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
            <th className="pb-3 pr-4">Market Name</th>
            <th className="pb-3 pr-4">Position</th>
            <th className="pb-3 pr-4">Amount Invested</th>
            <th className="pb-3 pr-4">Current Value</th>
            <th className="pb-3 text-right">Unrealized P/L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {positions.map((pos) => {
            const pnlPositive = pos.pnl >= 0;
            const pnlPercent = ((pos.pnl / pos.amountInvested) * 100).toFixed(
              2,
            );
            const emoji = getCategoryEmoji(pos.marketTitle);

            return (
              <tr
                key={pos.id}
                className="group cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => navigate(`/markets/${pos.marketId}`)}
              >
                {/* Market Name */}
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                      {emoji}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {pos.marketTitle}
                      </p>
                      <p className="text-xs text-slate-400">
                        {pos.marketClosesAt}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Position */}
                <td className="py-4 pr-4">
                  <PositionBadge side={pos.side} />
                </td>

                {/* Amount Invested */}
                <td className="py-4 pr-4">
                  <p className="font-medium text-slate-800">
                    ₦{pos.amountInvested.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">
                    at {pos.sharePrice}¢ share
                  </p>
                </td>

                {/* Current Value */}
                <td className="py-4 pr-4 font-medium text-slate-800">
                  ₦{pos.currentValue.toLocaleString()}
                </td>

                {/* Unrealized P/L */}
                <td className="py-4 text-right">
                  <p
                    className={`font-semibold ${
                      pnlPositive ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {pnlPositive ? "+" : ""}₦{pos.pnl.toFixed(2)}
                  </p>
                  <p
                    className={`text-xs ${
                      pnlPositive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {pnlPositive ? "+" : ""}
                    {pnlPercent}%
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ─── Trade History Tab ────────────────────────────────────────────────────────

const TradeHistoryTab = ({ trades }: { trades: TradeHistoryEntry[] }) => {
  if (trades.length === 0) {
    return (
      <EmptyState
        emoji="🕰️"
        title="No trade history yet"
        subtitle="Your confirmed trades will appear here once you start predicting."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
            <th className="pb-3 pr-4">Market Name</th>
            <th className="pb-3 pr-4">Side</th>
            <th className="pb-3 pr-4">Amount</th>
            <th className="pb-3 pr-4">Share Price</th>
            <th className="pb-3 pr-4">Executed At</th>
            <th className="pb-3 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td className="py-4 pr-4 font-medium text-slate-800">
                {trade.marketTitle}
              </td>
              <td className="py-4 pr-4">
                <PositionBadge side={trade.side} />
              </td>
              <td className="py-4 pr-4 text-slate-700">
                ₦{trade.amountInvested.toLocaleString()}
              </td>
              <td className="py-4 pr-4 text-slate-700">{trade.sharePrice}¢</td>
              <td className="py-4 pr-4 text-slate-400">{trade.executedAt}</td>
              <td className="py-4 text-right">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    trade.status === "open"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {trade.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── Payouts Tab ──────────────────────────────────────────────────────────────

const PayoutsTab = ({ payouts }: { payouts: PayoutEntry[] }) => {
  if (payouts.length === 0) {
    return (
      <EmptyState
        emoji="🏆"
        title="No payouts yet"
        subtitle="When a market you predicted on resolves, your payout will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {payouts.map((payout) => {
        const won = payout.outcome === "won";
        return (
          <div
            key={payout.id}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  won ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                {won ? (
                  <span className="text-emerald-500">✓</span>
                ) : (
                  <span className="text-red-500">✕</span>
                )}
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  {payout.marketTitle}
                </p>
                <p className="text-xs text-slate-400">{payout.settledAt}</p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`font-semibold ${
                  won ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {won ? `+₦${payout.payout.toLocaleString()}` : "₦0.00"}
              </p>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  won
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {payout.outcome.toUpperCase()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Recent Closures ──────────────────────────────────────────────────────────

const RecentClosures = ({ closed }: { closed: ClosedPosition[] }) => {
  if (closed.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-base font-semibold text-slate-700">
        Recent Closures
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {closed.map((pos) => {
          const won = pos.outcome === "won";
          return (
            <div
              key={pos.id}
              className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    won ? "bg-emerald-100" : "bg-red-100"
                  }`}
                >
                  {won ? (
                    <span className="text-emerald-500">✓</span>
                  ) : (
                    <span className="text-red-500">✕</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">
                    {pos.marketTitle}
                  </p>
                  <p className="text-xs text-slate-400">{pos.closedAt}</p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    won ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {won ? "+" : ""}₦{Math.abs(pos.pnl).toFixed(2)}
                </p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    won
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {pos.outcome.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string }[] = [
  { id: "active", label: "Active Positions" },
  { id: "history", label: "Trading History" },
  { id: "payouts", label: "Payouts" },
];

const PortfolioPage = () => {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  const [activePositions, setActivePositions] = useState<ActivePosition[]>([]);
  const [closedPositions, setClosedPositions] = useState<ClosedPosition[]>([]);
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryEntry[]>([]);
  const [payouts, setPayouts] = useState<PayoutEntry[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      portfolioService.getSummary(),
      portfolioService.getActivePositions(),
      portfolioService.getClosedPositions(),
      portfolioService.getTradeHistory(),
      portfolioService.getPayouts(),
    ]).then(([sum, active, closed, history, payoutData]) => {
      setSummary(sum);
      setActivePositions(active);
      setClosedPositions(closed);
      setTradeHistory(history);
      setPayouts(payoutData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading portfolio...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ── Summary Cards ── */}
        {summary && (
          <div className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              title="Net Portfolio Value"
              value={`₦${summary.netPortfolioValue.toLocaleString()}`}
              subtitle={`+${summary.monthlyChangePercent}% this month`}
              subtitleColor="text-emerald-500"
            />
            <SummaryCard
              title="Active Exposure"
              value={`₦${summary.activeExposure.toLocaleString()}`}
              subtitle={`Across ${summary.activeMarketsCount} markets`}
            />
            <SummaryCard
              title="Unrealized P/L"
              value={`+₦${summary.unrealizedPnl.toLocaleString()}`}
              subtitle={`Top position: +${summary.topPositionGainPercent}%`}
              subtitleColor="text-emerald-500"
            />
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Tab Headers */}
          <div className="mb-6 flex gap-6 border-b border-slate-100">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "active" && (
            <ActivePositionsTab positions={activePositions} />
          )}
          {activeTab === "history" && <TradeHistoryTab trades={tradeHistory} />}
          {activeTab === "payouts" && <PayoutsTab payouts={payouts} />}
        </div>

        {/* ── Recent Closures (only on active tab) ── */}
        {activeTab === "active" && <RecentClosures closed={closedPositions} />}
      </div>
    </DashboardLayout>
  );
};

export default PortfolioPage;
