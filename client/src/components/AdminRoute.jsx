
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const {
    user,
    token,
    initialized,
  } = useSelector((state) => state.auth);

  // Loading UI while authentication is being checked
  if (!initialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">

          <div className="w-12 h-12 mx-auto border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

          <h2 className="text-xl font-bold text-gray-900 mt-5">
            Checking Access
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Please wait while we verify your account.
          </p>

        </div>
      </div>
    );
  }

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Not an admin
  if (user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // Admin access
  return children;
}

export default AdminRoute;

