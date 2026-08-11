
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <div className="min-h-full p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;

