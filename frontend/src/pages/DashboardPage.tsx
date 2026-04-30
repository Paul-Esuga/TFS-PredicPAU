import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/shared/StatCard";

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Virtual Balance"
            value="₦103,450"
            subtitle="+12.4% since last session"
          />
          <StatCard
            title="Active Streak"
            value="3 Wins"
            subtitle="Top 5% of traders at Pan-Atlantic"
          />
          <StatCard
            title="Market Pulse"
            value="High Volatility"
            subtitle="Live updates active"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
