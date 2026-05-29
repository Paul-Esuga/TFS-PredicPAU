import { useState } from "react";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { MarketDetail, TradeSide, TradeStatus } from "../../types/trade";
import { marketDetailService } from "../../features/markets/services/marketDetailService";
import { balanceStore } from "../../store/balanceStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TradePanelProps {
  market: MarketDetail;
  userBalance: number;
  onTradeSuccess: (newBalance: number) => void;
}

// ─── Quick Amount Buttons ─────────────────────────────────────────────────────

const QUICK_AMOUNTS = [500, 1000, 5000];

// ─── Sub-components ───────────────────────────────────────────────────────────

const SideButton = ({
  side,
  selected,
  onClick,
}: {
  side: TradeSide;
  selected: boolean;
  onClick: () => void;
}) => {
  const isYes = side === "yes";

  return (
    <button
      onClick={onClick}
      className={`relative flex-1 rounded-2xl border-2 py-4 transition-all ${
        selected
          ? isYes
            ? "border-blue-500 bg-[#1a1f2e]"
            : "border-purple-500 bg-[#1a1f2e]"
          : "border-transparent bg-[#252a3a] hover:bg-[#2a3040]"
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2">
          <CheckCircle
            size={14}
            className={isYes ? "text-blue-400" : "text-purple-400"}
          />
        </span>
      )}
      <p className="text-xs font-medium text-slate-400">BUY</p>
      <p
        className={`mt-1 text-xl font-bold ${
          isYes ? "text-blue-400" : "text-purple-400"
        }`}
      >
        {side.toUpperCase()}
      </p>
    </button>
  );
};

const TradeBreakdown = ({
  amount,
  pricePerShare,
}: {
  amount: number;
  pricePerShare: number;
}) => {
  const sharesReceived =
    amount > 0 ? parseFloat((amount / pricePerShare).toFixed(2)) : 0;
  const estimatedPayout =
    amount > 0 ? parseFloat((amount / pricePerShare).toFixed(2)) : 0;

  return (
    <div className="rounded-2xl bg-[#252a3a] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Price per share</p>
        <p className="text-sm text-slate-300">₦{pricePerShare.toFixed(2)}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Shares purchased</p>
        <p className="text-sm text-slate-300">
          {sharesReceived > 0 ? sharesReceived.toLocaleString() : "—"}
        </p>
      </div>

      <div className="h-px bg-slate-700" />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white">Estimated Payout</p>
        <p className="text-sm font-bold text-blue-400">
          {estimatedPayout > 0 ? `₦${estimatedPayout.toLocaleString()}` : "—"}
        </p>
      </div>
    </div>
  );
};

const SuccessState = ({ onDismiss }: { onDismiss: () => void }) => (
  <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
      <CheckCircle size={32} className="text-emerald-400" />
    </div>
    <div>
      <p className="text-lg font-bold text-white">Trade Executed!</p>
      <p className="mt-1 text-sm text-slate-400">
        Your position has been recorded on the ledger.
      </p>
    </div>
    <button
      onClick={onDismiss}
      className="mt-2 rounded-full bg-slate-700 px-6 py-2 text-sm text-slate-300 hover:bg-slate-600 transition-colors"
    >
      Place another trade
    </button>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const TradePanel = ({
  market,
  userBalance,
  onTradeSuccess,
}: TradePanelProps) => {
  const [selectedSide, setSelectedSide] = useState<TradeSide>("yes");
  const [amount, setAmount] = useState<number>(0);
  const [amountInput, setAmountInput] = useState<string>("");
  const [tradeStatus, setTradeStatus] = useState<TradeStatus>("idle");

  const pricePerShare = selectedSide === "yes" ? market.yesOdds : market.noOdds;

  const handleAmountInput = (value: string) => {
    // Only allow numbers
    const numeric = value.replace(/[^0-9]/g, "");
    setAmountInput(numeric);
    setAmount(numeric ? parseInt(numeric) : 0);
  };

  const handleQuickAmount = (value: number) => {
    if (value > userBalance) return;
    setAmount(value);
    setAmountInput(value.toString());
  };

  const handleMax = () => {
    setAmount(userBalance);
    setAmountInput(userBalance.toString());
  };

  const handleConfirm = async () => {
    if (amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (amount > userBalance) {
      toast.error("Insufficient balance.");
      return;
    }

    setTradeStatus("confirming");

    try {
      const result = await marketDetailService.executeTrade({
        marketId: market.id,
        side: selectedSide,
        amount,
      });

      setTradeStatus("success");

      // Update the shared balance store so Topbar reflects the deduction instantly
      balanceStore.deduct(result.amountInvested);
      onTradeSuccess(balanceStore.getBalance());

      toast.success(
        `Trade placed! You bought ${result.sharesReceived.toLocaleString()} shares.`,
      );
    } catch (err: unknown) {
      setTradeStatus("error");
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error(message);
      setTradeStatus("idle");
    }
  };

  const handleDismiss = () => {
    setTradeStatus("idle");
    setAmount(0);
    setAmountInput("");
    setSelectedSide("yes");
  };

  return (
    <div className="rounded-2xl bg-[#1a1f2e] p-6 space-y-5">
      {/* ── Header ── */}
      <div>
        <h3 className="text-lg font-bold text-white">Execute Trade</h3>
        <p className="text-xs text-slate-400">
          Select your position and stake amount.
        </p>
      </div>

      {/* ── Success State ── */}
      {tradeStatus === "success" ? (
        <SuccessState onDismiss={handleDismiss} />
      ) : (
        <>
          {/* ── Side Selection ── */}
          <div className="flex gap-3">
            <SideButton
              side="yes"
              selected={selectedSide === "yes"}
              onClick={() => setSelectedSide("yes")}
            />
            <SideButton
              side="no"
              selected={selectedSide === "no"}
              onClick={() => setSelectedSide("no")}
            />
          </div>
          {/* ── Amount Input ── */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Amount to Trade
              </p>
              <p className="text-xs text-slate-400">
                Bal:{" "}
                <span className="font-semibold text-slate-300">
                  ₦{userBalance.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex items-center rounded-xl bg-[#252a3a] px-4 py-3">
              <span className="mr-2 text-slate-400">₦</span>
              <input
                type="text"
                inputMode="numeric"
                value={amountInput}
                onChange={(e) => handleAmountInput(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600"
              />
            </div>

            {/* Quick amounts */}
            <div className="mt-2 flex gap-2">
              {QUICK_AMOUNTS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickAmount(q)}
                  disabled={q > userBalance}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                    amount === q
                      ? "bg-blue-600 text-white"
                      : "bg-[#252a3a] text-slate-400 hover:bg-[#2a3040]"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  ₦{q.toLocaleString()}
                </button>
              ))}
              <button
                onClick={handleMax}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                  amount === userBalance
                    ? "bg-blue-600 text-white"
                    : "bg-[#252a3a] text-slate-400 hover:bg-[#2a3040]"
                }`}
              >
                MAX
              </button>
            </div>
          </div>
          {/* ── Trade Breakdown ── */}
          <TradeBreakdown amount={amount} pricePerShare={pricePerShare} />
          {/* ── Confirm Button ── */}
          <button
            onClick={handleConfirm}
            disabled={tradeStatus === "confirming" || amount <= 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {tradeStatus === "confirming" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Confirming...
              </>
            ) : (
              <>
                Confirm Trade
                <ArrowRight size={18} />
              </>
            )}
          </button>
          {/* ── Disclaimer ── */}
          // NEW
          <p className="text-center text-xs text-slate-600">
            By confirming, you agree to the Predictus Market Terms.
            <br />
            Your trade will be recorded in your portfolio history.
          </p>
        </>
      )}
    </div>
  );
};

export default TradePanel;
