import { NavLink, useNavigate } from "react-router-dom";
import { dashboardNavItems } from "../../constants/navigation";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="flex min-h-screen w-[290px] shrink-0 flex-col bg-[#020617] text-white">
      <div className="border-b border-r border-red-400/80 px-8 py-8 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          PREDICPAU
        </h2>
        <p className="mt-3 text-sm text-blue-200">Student Trader</p>
      </div>

      <nav className="flex-1 space-y-3 px-5 py-7">
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

      <button
        onClick={() => navigate("/help")}
        className="border-t border-white/10 p-6 text-center text-base text-blue-200 transition hover:bg-white/5 hover:text-white"
      >
        Help
      </button>
    </aside>
  );
};

export default Sidebar;
