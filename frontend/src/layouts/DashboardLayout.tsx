import type { ReactNode } from "react";
import Sidebar from "../components/navigation/Sidebar";
import Topbar from "../components/navigation/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#f3f4ff] text-slate-900">
      <div className="flex">
        <Sidebar />

        <main className="min-h-screen flex-1">
          <Topbar />

          <section className="p-6">{children}</section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
