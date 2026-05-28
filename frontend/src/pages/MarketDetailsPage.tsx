import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Clock, BarChart2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import TradePanel from "../components/trade/TradePanel";
import { marketDetailService } from "../features/markets/services/marketDetailService";
import type { MarketDetail } from "../types/trade";

// ─── Sub-components ───────────────────────────────────────────────────────────

const OddsCard = ({
  label,
  odds,
  change,
}: {
  label: "Yes Odds" | "No Odds";
  odds: number;
  change: number;
}) => {
  const isYes = label === "Yes Odds";
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-400">{label}</p>
      <h3
        className={`mt-2 text-3xl font-bold ${
          isYes ? "text-blue-600" : "text-purple-600"
        }`}
      >
        {Math.round(odds * 100)}%
      </h3>
      <div className="mt-2 flex items-center gap-1">
        {isPositive ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingDown size={14} className="text-red-500" />
        )}
        <p
          className={`text-xs font-medium ${
            isPositive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(change)}% in last 24h
        </p>
      </div>
    </div>
  );
};

const MarketStats = ({
  volume,
  expiresIn,
}: {
  volume: number;
  expiresIn: string;
}) => (
  <div className="flex items-center gap-6">
    <div className="flex items-center gap-2">
      <BarChart2 size={16} className="text-slate-400" />
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Market Volume
        </p>
        <p className="text-sm font-semibold text-slate-700">
          ₦{volume.toLocaleString()}
        </p>
      </div>
    </div>

    <div className="h-8 w-px bg-slate-200" />

    <div className="flex items-center gap-2">
      <Clock size={16} className="text-slate-400" />
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Expires In
        </p>
        <p className="text-sm font-semibold text-slate-700">{expiresIn}</p>
      </div>
    </div>
  </div>
);

const PriceChart = ({ data }: { data: { time: string; value: number }[] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="mb-4 text-sm font-semibold text-slate-600">
      YES Price History
    </p>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 1]}
          tickFormatter={(v) => `${Math.round(v * 100)}%`}
          tick={{ fontSize: 11, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          formatter={(value) => {
            const numeric = typeof value === "number" ? value : Number(value);
            if (!Number.isFinite(numeric)) return ["—", "YES Price"];
            return [`${Math.round(numeric * 100)}%`, "YES Price"];
          }}
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "none",
            borderRadius: "12px",
            color: "#f1f5f9",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#3b82f6"
          strokeWidth={2}
          fill="url(#priceGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const LoadingState = () => (
  <DashboardLayout>
    <div className="flex h-64 items-center justify-center text-slate-400">
      Loading market...
    </div>
  </DashboardLayout>
);

const ErrorState = ({ message }: { message: string }) => (
  <DashboardLayout>
    <div className="flex h-64 items-center justify-center text-red-400">
      {message}
    </div>
  </DashboardLayout>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const MarketDetailsPage = () => {
  const { marketId } = useParams<{ marketId: string }>();
  const [market, setMarket] = useState<MarketDetail | null>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marketId) return;

    Promise.all([
      marketDetailService.getMarketById(marketId),
      marketDetailService.getUserBalance(),
    ])
      .then(([marketData, balanceData]) => {
        setMarket(marketData);
        setUserBalance(balanceData.available);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load market.";
        setError(message);
        setLoading(false);
      });
  }, [marketId]);

  if (loading) return <LoadingState />;
  if (error || !market)
    return <ErrorState message={error ?? "Market not found."} />;

  return (
    <>
      {/* Toaster lives outside DashboardLayout so it renders above everything */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#1e293b",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1e293b",
            },
          },
        }}
      />

      <DashboardLayout>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* ── Left Column ── */}
          <div className="space-y-6 lg:col-span-2">
            {/* Category breadcrumb */}
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              {market.category} • {market.subcategory}
            </p>

            {/* Market title */}
            <h1 className="text-3xl font-bold leading-snug text-slate-900">
              {market.title}
            </h1>

            {/* Odds cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <OddsCard
                label="Yes Odds"
                odds={market.yesOdds}
                change={market.yesOddsChange}
              />
              <OddsCard
                label="No Odds"
                odds={market.noOdds}
                change={market.noOddsChange}
              />
            </div>

            {/* Chart */}
            <PriceChart data={market.chartData} />

            {/* Market stats */}
            <MarketStats volume={market.volume} expiresIn={market.expiresIn} />

            {/* Description */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-slate-600">
                About this Market
              </p>
              <p className="text-sm leading-relaxed text-slate-500">
                {market.description}
              </p>
            </div>
          </div>

          {/* ── Right Column — Trade Panel ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <TradePanel
                market={market}
                userBalance={userBalance}
                onTradeSuccess={(newBalance) => setUserBalance(newBalance)}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default MarketDetailsPage;
