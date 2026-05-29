import type { DashboardActivity } from "../../types/dashboard";

interface DashboardActivityListProps {
  activity: DashboardActivity[];
}

const DashboardActivityList = ({ activity }: DashboardActivityListProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-950">Live Activity</h2>

      <div className="mt-5 space-y-4">
        {activity.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-950">
                {item.trader}{" "}
                <span className="font-normal text-slate-500">
                  {item.action}
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {item.market} • {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardActivityList;
