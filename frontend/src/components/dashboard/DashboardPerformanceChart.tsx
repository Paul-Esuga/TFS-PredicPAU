import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PerformanceFilter } from "../../types/dashboard";
import { dashboardPerformanceData } from "../../mocks/dashboardMocks";

// ─── Types ────────────────────────────────────────────────────────────────────

const FILTERS: PerformanceFilter[] = ["1W", "1M", "3M"];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl bg-slate-900 px-3 py-2 text-xs text-white shadow-lg">
      <p className="text-slate-400">{label}</p>
      <p className="mt-0.5 font-semibold text-blue-400">
        ₦{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const DashboardPerformanceChart = () => {
  const [activeFilter, setActiveFilter] = useState<PerformanceFilter>("1W");

  const data = dashboardPerformanceData[activeFilter] ?? [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-1 flex items-start justify-between">
        <div>
          <h2 className="text-base font-bold text-blue-600">
            Performance Delta
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Portfolio growth across current academic semester
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex rounded-xl bg-slate-100 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                activeFilter === f
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${Math.round(v / 1000)}K`}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#perfGradient)"
            dot={false}
            activeDot={{ r: 4, fill: "#3b82f6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardPerformanceChart;
