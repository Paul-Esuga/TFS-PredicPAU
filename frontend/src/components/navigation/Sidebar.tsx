import { NavLink } from "react-router-dom";
import { dashboardNavItems } from "../../constants/navigation";

const Sidebar = () => {
  return (
    <aside className="flex min-h-screen w-[290px] shrink-0 flex-col bg-[#020617] text-white">
      <div className="border-b border-r border-red-400/80 px-10 py-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          PREDICPAU
        </h2>
        <p className="mt-3 text-sm text-blue-200">Student Trader</p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {dashboardNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "block rounded-xl px-4 py-4 text-center text-base transition",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-blue-200 hover:bg-white/5 hover:text-white",
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
