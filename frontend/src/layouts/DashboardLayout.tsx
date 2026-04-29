import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex">
        <aside className="min-h-screen w-64 border-r border-slate-200 bg-slate-950 text-white">
          <div className="p-6 text-xl font-bold">PREDICTUS</div>

          <nav className="space-y-2 px-4">
            <div className="rounded-lg px-3 py-2 hover:bg-white/10">
              Dashboard
            </div>
            <div className="rounded-lg px-3 py-2 hover:bg-white/10">
              Markets
            </div>
            <div className="rounded-lg px-3 py-2 hover:bg-white/10">
              Portfolio
            </div>
            <div className="rounded-lg px-3 py-2 hover:bg-white/10">
              Community
            </div>
            <div className="rounded-lg px-3 py-2 hover:bg-white/10">
              Achievements
            </div>
          </nav>
        </aside>

        <main className="flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="text-sm text-slate-500">Welcome to PredicPAU</div>
            <div className="text-sm font-medium">User</div>
          </header>

          <section className="p-6">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
