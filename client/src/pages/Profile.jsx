
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import DashboardCards from "../components/profile/DashboardCards";
import RecentOrders from "../components/profile/RecentOrders";
import WishlistPreview from "../components/profile/WishlistPreview";
import QuickActions from "../components/profile/QuickActions";

import { getMyOrders } from "../redux/orderSlice";
import { getWishlist } from "../redux/wishlistSlice";
import { getProfile } from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();

  const {
    profile,
    loading: profileLoading,
  } = useSelector((state) => state.users);

  const {
    loading: orderLoading,
    orders = [],
  } = useSelector((state) => state.orders);

  const {
    loading: wishlistLoading,
    items = [],
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getMyOrders());
    dispatch(getWishlist());
  }, [dispatch]);

  if (
    profileLoading ||
    orderLoading ||
    wishlistLoading
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-10 py-12 text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>

          <h2 className="text-xl font-bold text-gray-800">
            Loading Dashboard...
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Please wait while we load your account.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Page Header */}

        <div className="mb-8">

          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
            Account Dashboard
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">
            My Account
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your profile, orders, wishlist and more.
          </p>

        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Sidebar */}

          <div className="lg:col-span-1">

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              <ProfileSidebar />

            </div>

          </div>

          {/* Dashboard */}

          <div className="lg:col-span-3 space-y-6">

            {/* Welcome Card */}

            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl shadow-xl p-6 md:p-8 text-white">

              {/* Decorative Circles */}

              <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>

              <div className="absolute -bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full"></div>

              <div className="relative flex flex-col md:flex-row items-center md:items-center gap-6">

                {/* Avatar */}

                <div className="relative flex-shrink-0">

                  <img
                    src={
                      profile?.avatar?.url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        profile?.name || "User"
                      )}&background=ffffff&color=2563eb&bold=true`
                    }
                    alt="Profile"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/90 object-cover shadow-xl"
                  />

                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-4 border-blue-700 rounded-full"></div>

                </div>

                {/* Profile Information */}

                <div className="text-center md:text-left flex-1">

                  <p className="text-blue-100 text-sm mb-1">
                    Welcome back,
                  </p>

                  <h2 className="text-2xl md:text-3xl font-bold">
                    {profile?.name}
                  </h2>

                  <p className="text-blue-100 mt-2">
                    {profile?.email}
                  </p>

                  <p className="text-blue-100 text-sm">
                    {profile?.phone || "No phone number"}
                  </p>

                  <div className="mt-4 inline-flex px-4 py-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium">
                    {profile?.role}
                  </div>

                </div>

              </div>

            </div>

            {/* Statistics */}

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-1">

              <DashboardCards
                orders={orders}
                wishlist={items}
              />

            </div>

            {/* Recent Orders */}

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              <RecentOrders
                orders={orders}
              />

            </div>

            {/* Wishlist */}

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              <WishlistPreview
                wishlist={items}
              />

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              <QuickActions />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
