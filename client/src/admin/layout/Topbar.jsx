
import { useSelector } from "react-redux";

function Topbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur sm:px-6">

      {/* Left Section */}
      <div className="flex items-center gap-3">

        <div className="hidden h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13h4v8H3v-8zm7-9h4v17h-4V4zm7 5h4v12h-4V9z"
            />
          </svg>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Admin Dashboard
          </h2>

          <p className="hidden text-xs text-slate-400 sm:block">
            Manage your store
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Status */}
        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Online
          </span>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* User Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-sm ring-4 ring-indigo-50">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        {/* User Details */}
        <div className="hidden sm:block">
          <p className="max-w-[160px] truncate text-sm font-semibold text-slate-800">
            {user?.name || "Administrator"}
          </p>

          <p className="mt-0.5 text-xs font-medium text-slate-400">
            {user?.role || "Admin"}
          </p>
        </div>

      </div>

    </header>
  );
}

export default Topbar;

