import { useNavigate } from "react-router-dom";
import type { RecentPosition } from "../../types/dashboard";

interface DashboardRecentPositionsProps {
  positions: RecentPosition[];
}

const StatusBadge = ({ status }: { status: RecentPosition["status"] }) => {
  const styles = {
    winning: "bg-emerald-100 text-emerald-600",
    losing: "bg-red-100 text-red-500",
    locked: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const PositionBadge = ({ position }: { position: "yes" | "no" }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${
      position === "yes"
        ? "bg-blue-100 text-blue-600"
        : "bg-purple-100 text-purple-600"
    }`}
  >
    {position.toUpperCase()}
  </span>
);

const DashboardRecentPositions = ({
  positions,
}: DashboardRecentPositionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800">Recent Positions</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Column headers */}
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-widest text-slate-400">
              <th className="pb-3 pr-4">Market Name</th>
              <th className="pb-3 pr-4">Position</th>
              <th className="pb-3 pr-4">Investment</th>
              <th className="pb-3 pr-4">P/L Delta</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {positions.map((pos) => {
              const pnlPositive = pos.plDelta >= 0;

              return (
                <tr key={pos.id} className="group">
                  {/* Market name — clickable */}
                  <td className="py-4 pr-4">
                    <p
                      className="cursor-pointer font-medium text-slate-800 hover:text-blue-600 transition-colors group-hover:text-blue-600"
                      onClick={() => navigate(`/markets/${pos.marketId}`)}
                    >
                      {pos.marketName}
                    </p>
                  </td>

                  {/* Position badge */}
                  <td className="py-4 pr-4">
                    <PositionBadge position={pos.position} />
                  </td>

                  {/* Investment */}
                  <td className="py-4 pr-4 font-medium text-slate-700">
                    ₦{pos.investment.toLocaleString()}
                  </td>

                  {/* P/L Delta */}
                  <td className="py-4 pr-4">
                    <span
                      className={`font-semibold ${
                        pnlPositive ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {pnlPositive ? "+" : ""}₦
                      {Math.abs(pos.plDelta).toLocaleString()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-4">
                    <StatusBadge status={pos.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardRecentPositions;
