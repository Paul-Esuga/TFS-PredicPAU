import DashboardLayout from "../layouts/DashboardLayout";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: "general",
    title: "General",
    faqs: [
      {
        q: "What is PAU Predict?",
        a: "PAU Predict is a simulated prediction market platform built exclusively for Pan-Atlantic University students. You use virtual currency to place predictions on real campus events — sports matches, academic outcomes, and more. No real money is involved.",
      },
      {
        q: "Is this real money?",
        a: "No. Every transaction on PAU Predict uses virtual currency (₦). You cannot deposit or withdraw real money. The platform is designed for learning and friendly competition.",
      },
      {
        q: "How do I get started?",
        a: "You start with a virtual balance of ₦100,000. Head to the Markets page, pick an event you want to predict, choose YES or NO, enter an amount, and confirm your trade.",
      },
    ],
  },
  {
    id: "markets",
    title: "Markets",
    faqs: [
      {
        q: "What is a prediction market?",
        a: "A prediction market is a question about a future event with two possible outcomes — YES or NO. The price of each outcome reflects the crowd's estimated probability. For example, YES at ₦0.65 means the market thinks there's a 65% chance the event happens.",
      },
      {
        q: "How are markets created?",
        a: "Markets are created by PAU Predict administrators based on upcoming campus events. Students can only trade on published markets — they cannot create their own markets in the current version.",
      },
      {
        q: "What does 'Closes in X days' mean?",
        a: "This is the deadline for placing predictions on that market. Once a market closes, no new trades can be made. The market then waits for the real-world event to conclude before being resolved.",
      },
      {
        q: "What happens when a market is resolved?",
        a: "After the event concludes, an administrator marks the winning outcome as YES or NO. Users who predicted correctly receive a payout based on their position. Losing positions are settled at zero.",
      },
    ],
  },
  {
    id: "trading",
    title: "Trading",
    faqs: [
      {
        q: "How do I place a trade?",
        a: "Go to any active market, click the YES or NO button on the market card, which takes you to the market details page. On that page, select your side, enter the amount you want to invest, review the trade breakdown, and click Confirm Trade.",
      },
      {
        q: "What are shares?",
        a: "When you invest in a market, your virtual currency buys shares of the outcome you selected. The number of shares depends on the current price. If you are correct when the market resolves, each share pays out ₦1.00.",
      },
      {
        q: "Can I cancel a trade?",
        a: "No. Once a trade is confirmed it is final and recorded in your portfolio history. This mirrors how real prediction markets work.",
      },
      {
        q: "What is the maximum I can invest?",
        a: "You cannot invest more than your current virtual balance. There is no minimum trade size enforced by the system, but trades of ₦0 are rejected.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    faqs: [
      {
        q: "What is the Portfolio page?",
        a: "The Portfolio page shows all your current and past activity. The Active Positions tab shows open trades. Trading History shows every trade you have ever confirmed. Payouts shows the results of resolved markets you participated in.",
      },
      {
        q: "What is Unrealized P/L?",
        a: "Unrealized P/L (Profit and Loss) is the estimated gain or loss on your active positions based on current market prices. It becomes realized once the market is resolved.",
      },
      {
        q: "Why does my P/L show ₦0.00 for recent trades?",
        a: "Trades placed in the current session show a flat P/L until the backend processes real-time valuations. This will update automatically once backend integration is complete.",
      },
    ],
  },
  {
    id: "leaderboard",
    title: "Leaderboard",
    faqs: [
      {
        q: "How is the leaderboard ranked?",
        a: "Users are ranked by total profit and portfolio growth, not by the raw number of correct predictions. This rewards strategic thinking over lucky guesses.",
      },
      {
        q: "What are the weekly rewards?",
        a: "The top-ranked trader at the end of each week is eligible for a real reward — currently a PAU cafeteria meal voucher. The end-of-year champion receives special recognition on the platform.",
      },
      {
        q: "How often does the leaderboard update?",
        a: "The leaderboard reflects the current state of all resolved markets and settled positions. It updates whenever a market is resolved by an administrator.",
      },
    ],
  },
  {
    id: "achievements",
    title: "Achievements",
    faqs: [
      {
        q: "What are badges?",
        a: "Badges are earned by reaching milestones on the platform — placing your first trade, winning a streak, reaching the top 10, and more. They appear on your Achievements page.",
      },
      {
        q: "What is a win streak?",
        a: "A win streak is the number of consecutive correct predictions you have made. The platform tracks this automatically and awards badges at milestone numbers such as 3 and 5 in a row.",
      },
    ],
  },
  {
    id: "community",
    title: "Community",
    faqs: [
      {
        q: "What is the Community Feed?",
        a: "The Community Feed lets students share short analysis posts tied to specific prediction markets. You can post your thesis, like other students' posts, and see what the crowd is thinking before placing a trade.",
      },
      {
        q: "Can I post anything?",
        a: "Posts should be related to active prediction markets. Administrators can remove posts that are off-topic or inappropriate. Keep discussions analytical and respectful.",
      },
    ],
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <p className="text-sm font-medium text-slate-800">{q}</p>
        {open ? (
          <ChevronUp size={16} className="shrink-0 text-slate-400" />
        ) : (
          <ChevronDown size={16} className="shrink-0 text-slate-400" />
        )}
      </button>

      {open && (
        <p className="pb-4 text-sm leading-relaxed text-slate-500">{a}</p>
      )}
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const HelpPage = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Help & FAQs</h1>
          <p className="mt-1 text-sm text-slate-400">
            Everything you need to know about PAU Predict.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
              {section.title}
            </p>
            {section.faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default HelpPage;
