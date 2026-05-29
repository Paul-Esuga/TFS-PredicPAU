import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { marketService } from "../services/marketService";
import type { Market, MarketCategory } from "../types/market";
import MarketCard from "../components/cards/MarketCard";
import FeaturedMarket from "../components/cards/FeaturedMarket";
import RewardsCard from "../components/cards/RewardsCard";
import QuickStatsCard from "../components/cards/QuickStatsCard";

type FilterOption = "all" | MarketCategory;
type SortOption = "volume" | "newest" | "closing";

const FILTERS: { label: string; value: FilterOption }[] = [
  { label: "All Markets", value: "all" },
  { label: "Sports", value: "sports" },
  { label: "Campus", value: "campus" },
  { label: "Academics", value: "academics" },
  { label: "Finance", value: "finance" },
  { label: "Entertainment", value: "entertainment" },
];

const SORTS: { label: string; value: SortOption }[] = [
  { label: "Highest Volume", value: "volume" },
  { label: "Newest", value: "newest" },
  { label: "Closing Soon", value: "closing" },
];

const applySearch = (markets: Market[], query: string): Market[] => {
  if (!query.trim()) return markets;

  const lower = query.toLowerCase();

  return markets.filter(
    (m) =>
      m.title.toLowerCase().includes(lower) ||
      m.category.toLowerCase().includes(lower) ||
      m.description.toLowerCase().includes(lower),
  );
};

const applyFilter = (markets: Market[], filter: FilterOption): Market[] => {
  if (filter === "all") return markets;

  return markets.filter((m) => m.category === filter);
};

const applySort = (markets: Market[], sort: SortOption): Market[] => {
  const copy = [...markets];

  if (sort === "volume") {
    return copy.sort((a, b) => b.volume - a.volume);
  }

  if (sort === "closing") {
    return copy.sort(
      (a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime(),
    );
  }

  return copy.reverse();
};

const MarketsPage = () => {
  const [searchParams] = useSearchParams();

  const [markets, setMarkets] = useState<Market[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [activeSort, setActiveSort] = useState<SortOption>("volume");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  // Read search query from URL param
  const searchQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    marketService.getAllMarkets().then((data) => {
      setMarkets(data);
      setLoading(false);
    });
  }, []);

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    setVisibleCount(9);
  };

  const searched = applySearch(markets, searchQuery);
  const filtered = applyFilter(searched, activeFilter);
  const sorted = applySort(filtered, activeSort);

  const visible = sorted.slice(0, visibleCount);

  const hasMore = visibleCount < sorted.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Top section */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <FeaturedMarket />
          </div>

          <div className="space-y-4">
            <RewardsCard />
            <QuickStatsCard />
          </div>
        </div>

        {/* Search result banner */}
        {searchQuery && (
          <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 px-5 py-3">
            <p className="text-sm text-blue-700">
              Showing results for{" "}
              <span className="font-semibold">"{searchQuery}"</span>
            </p>

            <a
              href="/markets"
              className="text-xs font-semibold text-blue-500 hover:text-blue-700"
            >
              Clear search
            </a>
          </div>
        )}

        {/* Filters + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilterChange(f.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeFilter === f.value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Sort by:</span>

            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as SortOption)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-blue-400"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <p className="text-xs text-slate-400">
            Showing {visible.length} of {sorted.length} markets
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        )}

        {/* Market grid */}
        {loading ? (
          <div className="flex h-48 items-center justify-center text-slate-400">
            Loading markets...
          </div>
        ) : visible.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-2">
            <p className="text-4xl">🔍</p>

            <p className="text-sm font-medium text-slate-600">
              No markets found
            </p>

            <p className="text-xs text-slate-400">
              Try a different search term or filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {visible.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="rounded-full border border-slate-200 px-6 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50"
            >
              Load More Active Markets
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketsPage;
