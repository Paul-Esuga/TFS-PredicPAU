import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Trophy,
  Users,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const upcomingMatches = [
  {
    id: 1,
    matchDay: "Match Day 4",
    title: "Team Alpha vs Team Beta",
    subtitle: "Quarter Finals • PAU Sports Complex",
    yesLabel: "Team Alpha Wins",
    yesPrice: 0.65,
    noPrice: 0.35,
  },
  {
    id: 2,
    matchDay: "Match Day 4",
    title: "Sigma FC vs Delta United",
    subtitle: "Quarter Finals • PAU Sports Complex",
    yesLabel: "Sigma FC Wins",
    yesPrice: 0.72,
    noPrice: 0.28,
  },
  {
    id: 3,
    matchDay: "Match Day 5",
    title: "Omega Kings vs Zeta Stars",
    subtitle: "Friendly Match • PAU Field B",
    yesLabel: "Omega Kings Win",
    yesPrice: 0.5,
    noPrice: 0.5,
  },
];

const features = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Learn Market Dynamics",
    description:
      "Experience how real-world financial markets react to news, performance, and crowd sentiment through our risk-free campus simulation.",
    badge: "Join 500+ student analysts",
    accent: "bg-[#e8ecff]",
  },
  {
    id: 2,
    icon: Trophy,
    title: "Win Real Rewards",
    description:
      "Your analytical skills pay off. Top predictors earn Meal Vouchers and exclusive campus perks every match week.",
    badge: "Weekly Pot ₦25,000",
    accent: "bg-white border border-slate-200",
  },
  {
    id: 3,
    icon: Users,
    title: "Compete with Peers",
    description:
      "Challenge your classmates and see who truly understands the PAU Coupe landscape. Real-time leaderboards keep the competition fierce.",
    badge: null,
    accent: "bg-[#e8ecff]",
  },
];

const liveMarkets = [
  { id: 1, title: "ALPHA VS BETA", yes: "₦0.65", no: "₦0.35" },
  { id: 2, title: "SIGMA VS DELTA", yes: "₦0.52", no: "₦0.48" },
];

const topTraders = [
  { rank: 1, name: "Chidi O.", gain: "+89.4%" },
  { rank: 2, name: "Tunde W.", gain: "+74.2%" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const Navbar = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <span className="text-lg font-bold text-slate-900">PAU Predict</span>

      <div className="hidden items-center gap-8 md:flex">
        <a href="#markets" className="text-sm font-medium text-blue-600">
          Markets
        </a>

        <a
          href="#leaderboard"
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Leaderboard
        </a>

        <a
          href="#how-it-works"
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          How it Works
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onGetStarted}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Login
        </button>

        <button
          onClick={onGetStarted}
          className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

const LiveDataWidget = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Real-Time Data Stream
        </span>
      </div>

      <TrendingUp size={14} className="text-blue-500" />
    </div>

    <div className="space-y-2">
      {liveMarkets.map((m) => (
        <div
          key={m.id}
          className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5"
        >
          <span className="text-xs font-semibold text-slate-700">
            {m.title}
          </span>

          <div className="flex gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
              YES {m.yes}
            </span>

            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-600">
              NO {m.no}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-3 h-16 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100">
      <svg viewBox="0 0 300 64" className="h-full w-full">
        <path
          d="M0,50 C30,45 60,55 90,40 C120,25 150,35 180,20 C210,10 240,25 270,15 L300,10 L300,64 L0,64 Z"
          fill="url(#heroGrad)"
          opacity="0.6"
        />

        <path
          d="M0,50 C30,45 60,55 90,40 C120,25 150,35 180,20 C210,10 240,25 270,15 L300,10"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        <defs>
          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

const MatchCard = ({
  match,
  onGetStarted,
}: {
  match: (typeof upcomingMatches)[0];
  onGetStarted: () => void;
}) => (
  <div className="space-y-4 rounded-2xl bg-slate-900 p-5 text-white">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {match.matchDay}
      </span>

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800">
        <Trophy size={12} className="text-slate-400" />
      </div>
    </div>

    <div>
      <h3 className="font-bold text-white">{match.title}</h3>

      <p className="mt-0.5 text-xs text-slate-400">{match.subtitle}</p>
    </div>

    <div className="space-y-2">
      <button
        onClick={onGetStarted}
        className="flex w-full items-center justify-between rounded-xl bg-blue-600/20 px-3 py-2 text-xs font-semibold text-blue-400 transition-colors hover:bg-blue-600/30"
      >
        <span>YES {match.yesLabel}</span>
        <span>₦{match.yesPrice.toFixed(2)}</span>
      </button>

      <button
        onClick={onGetStarted}
        className="flex w-full items-center justify-between rounded-xl bg-purple-600/20 px-3 py-2 text-xs font-semibold text-purple-400 transition-colors hover:bg-purple-600/30"
      >
        <span>NO {match.yesLabel}</span>
        <span>₦{match.noPrice.toFixed(2)}</span>
      </button>
    </div>
  </div>
);

const FeatureCard = ({ feature }: { feature: (typeof features)[0] }) => {
  const Icon = feature.icon;

  return (
    <div className={`space-y-4 rounded-2xl p-6 ${feature.accent}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
        <Icon size={18} className="text-blue-600" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {feature.description}
        </p>
      </div>

      {feature.badge && (
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
          {feature.badge}
        </div>
      )}

      {feature.id === 3 && (
        <div className="flex gap-3">
          {topTraders.map((t) => (
            <div
              key={t.rank}
              className="flex-1 rounded-xl bg-white px-3 py-2 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Rank #{t.rank}
              </p>

              <p className="mt-1 text-sm font-bold text-slate-800">{t.name}</p>

              <p className="text-xs font-semibold text-emerald-500">{t.gain}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white">
    <div className="border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {["PAU Finance Society", "Coupes Committee", "Alumni Relations"].map(
          (p) => (
            <span
              key={p}
              className="text-xs font-semibold uppercase tracking-widest text-slate-500"
            >
              {p}
            </span>
          ),
        )}
      </div>
    </div>

    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-bold">PAU Predict</p>

          <p className="mt-1 text-xs text-slate-400">
            © 2024 PAU Predict. Institutional Precision for Campus Markets.
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Powered by Virtual Currency. No real money gambling involved.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-slate-400">
          {[
            "Privacy Policy",
            "Terms of Service",
            "Market Rules",
            "Contact Support",
          ].map((link) => (
            <a
              key={link}
              href="#"
              className="transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900">
      <Navbar onGetStarted={handleGetStarted} />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />

              <span className="text-xs font-semibold text-blue-600">
                PAU Coupe Markets Live
              </span>
            </div>

            <h1 className="text-5xl font-black leading-tight tracking-tight md:text-6xl">
              Predict PAU{" "}
              <span className="text-blue-600">
                Coupe
                <br />
                Matches.
              </span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-slate-500">
              Trade predictions on your favorite campus teams and climb the
              leaderboard. High-fidelity markets powered by campus sentiment.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGetStarted}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Start Predicting
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => navigate("/markets")}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                View Markets
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <LiveDataWidget />
          </div>
        </div>
      </section>

      <section id="markets" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Upcoming Matches
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Live campus sentiment reflected in real-time prediction prices.
            </p>
          </div>

          <button
            onClick={() => navigate("/markets")}
            className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Explore all markets
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {upcomingMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onGetStarted={handleGetStarted}
            />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">
          Engineered for Excellence
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-blue-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-black">
            Built for Pan-Atlantic University.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm text-blue-200">
            Join hundreds of students already trading predictions on PAU sports
            events. No real money. Just strategy.
          </p>

          <button
            onClick={handleGetStarted}
            className="mx-auto mt-6 flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Get Started Free
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
