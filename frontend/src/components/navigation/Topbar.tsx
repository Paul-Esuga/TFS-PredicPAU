import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/apiClient";
import { balanceStore } from "../../store/balanceStore";

const Topbar = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(balanceStore.getBalance());

  useEffect(() => {
    // Fetch real balance from backend on mount
    apiFetch<{ available: number }>("/api/users/me/balance")
      .then((data) => {
        // Sync the store with the backend value
        const diff = data.available - balanceStore.getBalance();
        if (diff !== 0) {
          balanceStore.notify();
        }
        setBalance(data.available);
      })
      .catch(() => {
        // Fall back to store value if backend is unreachable
        setBalance(balanceStore.getBalance());
      });

    // Subscribe to in-session balance changes (trades)
    const unsubscribe = balanceStore.subscribe(setBalance);
    return unsubscribe;
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = (e.target as HTMLInputElement).value.trim();
      if (query) {
        navigate(`/markets?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <header className="flex h-[74px] items-center justify-between border-b border-slate-200 bg-white px-7">
      <input
        type="text"
        placeholder="Search markets..."
        onKeyDown={handleSearch}
        className="h-11 w-[360px] rounded-full border border-slate-200 bg-slate-50 px-5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
      />

      <div className="flex items-center gap-5">
        <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950">
          ₦{balance.toLocaleString()}
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white transition-opacity hover:opacity-80"
          title="View profile"
        >
          P
        </button>
      </div>
    </header>
  );
};

export default Topbar;
