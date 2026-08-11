
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/authSlice";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: "📦",
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: "📂",
    },
    {
      title: "Brands",
      path: "/admin/brands",
      icon: "🏷️",
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: "🛒",
    },
    {
      title: "Users",
      path: "/admin/users",
      icon: "👤",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-950 text-white shadow-xl">

      {/* Logo / Header */}
      <div className="border-b border-slate-800 px-5 py-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold shadow-lg">
            A
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              Admin Panel
            </h1>

            <p className="mt-0.5 text-xs text-slate-400">
              Management Dashboard
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-5">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon */}
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition ${
                    isActive
                      ? "bg-white/15"
                      : "bg-slate-800 group-hover:bg-slate-700"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Title */}
                <span className="flex-1">
                  {item.title}
                </span>

                {/* Active Indicator */}
                {isActive && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </>
            )}
          </NavLink>
        ))}

      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-800 p-4">

        {/* Admin Profile */}
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-900 p-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold">
            A
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Administrator
            </p>

            <p className="text-xs text-slate-400">
              Admin Account
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm font-semibold text-red-400 transition-all hover:border-red-800/60 hover:bg-red-900/40 hover:text-red-300"
        >

          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-900/30 text-base transition group-hover:bg-red-900/50">
            🚪
          </span>

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;

