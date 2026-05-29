import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPerformanceChart from "../components/dashboard/DashboardPerformanceChart";
import DashboardUpcomingEvents from "../components/dashboard/DashboardUpcomingEvents";
import DashboardRecentPositions from "../components/dashboard/DashboardRecentPositions";
import { dashboardService } from "../services/dashboardService";
import { balanceStore } from "../store/balanceStore";
import { apiFetch } from "../services/apiClient";
import type {
  DashboardSummaryCard,
  UpcomingEvent,
  RecentPosition,
} from "../types/dashboard";

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ card }: { card: DashboardSummaryCard }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
      {card.title}
    </p>

    <div className="mt-2 flex items-center gap-2">
      {card.badge && (
        <span className="text-2xl leading-none">{card.badge}</span>
      )}
      <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
    </div>

    <p className="mt-1.5 text-xs text-slate-400">
      {card.subtitleHighlight && (
        <span className="mr-1 font-semibold text-emerald-500">
          {card.subtitleHighlight}
        </span>
      )}
      {card.subtitle}
    </p>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const DashboardPage = () => {
  const navigate = useNavigate();
  const [summaryCards, setSummaryCards] = useState<DashboardSummaryCard[]>([]);
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [positions, setPositions] = useState<RecentPosition[]>([]);
  const [balance, setBalance] = useState<number>(balanceStore.getBalance());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real balance and sync with store
    apiFetch<{ available: number }>("/api/users/me/balance")
      .then((data) => setBalance(data.available))
      .catch(() => setBalance(balanceStore.getBalance()));

    // Subscribe to in-session balance changes
    const unsubscribe = balanceStore.subscribe(setBalance);

    Promise.all([
      dashboardService.getSummaryCards(),
      dashboardService.getUpcomingEvents(),
      dashboardService.getRecentPositions(),
    ]).then(([summaryData, eventData, positionData]) => {
      setSummaryCards(summaryData);
      setEvents(eventData);
      setPositions(positionData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Inject live balance into the virtual balance card
  const liveCards = summaryCards.map((card) =>
    card.id === "virtual-balance"
      ? { ...card, value: `₦${balance.toLocaleString()}` }
      : card,
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ── Stat Cards ── */}
        <div className="grid gap-4 md:grid-cols-3">
          {liveCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        {/* ── Main Grid: Chart + Sidebar ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <DashboardPerformanceChart />
            <DashboardRecentPositions positions={positions} />
          </div>
          <div>
            <DashboardUpcomingEvents events={events} />
          </div>
        </div>

        {/* ── Pro Access CTA ── */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">
            Pro Access
          </p>
          <h3 className="mt-1 text-lg font-bold">
            Unlock predictive AI insights.
          </h3>
          <button
            onClick={() => navigate("/markets")}
            className="mt-4 rounded-xl bg-white px-5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Trade Now
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
