import { NavLink } from "react-router-dom";
import { dashboardNavItems } from "../../constants/navigation";

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 text-white">
      <div className="border-b border-r border-red-400/80 p-6">
        <h2 className="text-4xl! md:text-2xl lg:text-xs font-bold tracking-tight">
          PREDICPAU
        </h2>
        <p className="mt-1 text-xs text-slate-400">Student Trader</p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {dashboardNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "block rounded-xl px-4 py-3 text-sm transition",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4 text-sm text-slate-400">
        Help
      </div>
    </aside>
  );
};

export default Sidebar;
