import { useNavigate } from "react-router-dom";
import type { UpcomingEvent } from "../../types/dashboard";

interface DashboardUpcomingEventsProps {
  events: UpcomingEvent[];
}

const DashboardUpcomingEvents = ({ events }: DashboardUpcomingEventsProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-blue-600">Upcoming Events</h2>
      </div>

      {/* Event list */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="space-y-3">
            {/* Category + timing */}
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                {event.category} • {event.subcategory}
              </span>
              <span
                className={`text-xs font-semibold ${
                  event.isOngoing ? "text-emerald-500" : "text-slate-400"
                }`}
              >
                {event.startsIn}
              </span>
            </div>

            {/* Event title */}
            <p
              className="cursor-pointer text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              onClick={() => navigate(`/markets/${event.marketId}`)}
            >
              {event.title}
            </p>

            {/* Yes / No price buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/markets/${event.marketId}`)}
                className="flex-1 rounded-xl bg-blue-50 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
              >
                Yes ₦{event.yesPrice.toFixed(2)}
              </button>
              <button
                onClick={() => navigate(`/markets/${event.marketId}`)}
                className="flex-1 rounded-xl bg-purple-50 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-100 transition-colors"
              >
                No ₦{event.noPrice.toFixed(2)}
              </button>
            </div>

            {/* Divider between events */}
            {events.indexOf(event) < events.length - 1 && (
              <div className="border-b border-slate-100" />
            )}
          </div>
        ))}
      </div>

      {/* View all link */}
      <button
        onClick={() => navigate("/markets")}
        className="mt-5 flex w-full items-center justify-center gap-1 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        View All Markets →
      </button>
    </div>
  );
};

export default DashboardUpcomingEvents;
