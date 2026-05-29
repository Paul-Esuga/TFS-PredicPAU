import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { apiFetch } from "../services/apiClient";

interface UserProfile {
  id: string;
  fullName: string;
  username: string;
  email: string;
  balance: number;
}

const fallbackUser = {
  fullName: "Paul Esuga",
  email: "paul.esuga@pau.edu.ng",
  username: "pau_trader",
  balance: 185200,
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<UserProfile>("/api/users/me")
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        // Fall back to static data if backend is unreachable
        setUser({
          id: "user-1",
          ...fallbackUser,
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center text-slate-400">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  const displayUser = user ?? { id: "user-1", ...fallbackUser };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-400">
            Your account details and trading summary.
          </p>
        </div>

        {/* Avatar + Name */}
        <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            {displayUser.fullName.charAt(0)}
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900">
              {displayUser.fullName}
            </p>
            <p className="text-sm text-slate-400">Student Trader</p>
          </div>
        </div>

        {/* Account Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Account Details
          </p>
          <div className="divide-y divide-slate-100">
            {[
              { label: "Full Name", value: displayUser.fullName },
              { label: "Email", value: displayUser.email },
              { label: "Username", value: `@${displayUser.username}` },
              { label: "Student ID", value: "PAU/2024/2061" },
              { label: "Member Since", value: "September 2024" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="text-sm font-medium text-slate-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trading Summary
          </p>
          <div className="divide-y divide-slate-100">
            {[
              {
                label: "Virtual Balance",
                value: `₦${displayUser.balance.toLocaleString()}`,
              },
              { label: "Win Rate", value: "68.5%" },
              { label: "Total Trades", value: "24" },
              { label: "Current Rank", value: "#142" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3"
              >
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="text-sm font-semibold text-slate-800">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
