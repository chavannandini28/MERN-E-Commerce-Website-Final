
import {
  useEffect,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getDashboardStats,
  getSalesAnalytics,
} from "../../redux/dashboardSlice";

import {
  getAdminOrders,
} from "../../redux/orderSlice";

import {
  getAdminProducts,
} from "../../redux/adminSlice";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

function Dashboard() {
  const dispatch = useDispatch();

  // =============================
  // DASHBOARD STATE
  // =============================

  const {
    stats,
    analytics,
  } = useSelector(
    (state) => state.dashboard
  );

  // =============================
  // ORDERS
  // =============================

  const {
    orders,
  } = useSelector(
    (state) => state.orders
  );

  // =============================
  // PRODUCTS
  // =============================

  const {
    products,
  } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getSalesAnalytics());
    dispatch(getAdminOrders());
    dispatch(getAdminProducts());
  }, [dispatch]);

  // ============================
  // Revenue Calculation
  // ============================

  const revenue =
    orders?.reduce(
      (total, order) =>
        total + (order.totalPrice || 0),
      0
    ) || 0;

  // ============================
  // Top Products
  // ============================

  const topProducts =
    products?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================
            HEADER
        ================================= */}

        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Admin Analytics
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your store performance and sales activity.
              </p>
            </div>

          </div>
        </div>

        {/* =================================
            STAT CARDS
        ================================= */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* Revenue */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Revenue
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  ₹ {revenue.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-xs text-emerald-600">
                  Overall order revenue
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 2c-1.11 0-2.08.402-2.599 1M12 16v2m0-2c1.11 0 2.08-.402 2.599-1M12 16c-1.11 0-2.08-.402-2.599-1M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                  />
                </svg>

              </div>

            </div>

          </div>

          {/* Orders */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats?.orders || orders?.length || 0}
                </p>

                <p className="mt-2 text-xs text-indigo-600">
                  Orders received
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6m-6 7h6m-6 4h4"
                  />
                </svg>

              </div>

            </div>

          </div>

          {/* Products */}

          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Total Products
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats?.products || products?.length || 0}
                </p>

                <p className="mt-2 text-xs text-violet-600">
                  Products in catalog
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            RECENT ORDERS
        ================================= */}

        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest customer orders and their status.
                </p>

              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm sm:flex">

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
                    d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a3 3 0 006 0M9 5h6"
                  />
                </svg>

              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[650px]">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {orders?.slice(0, 5).map((order) => (

                  <tr
                    key={order._id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                          {(
                            order.user?.name ||
                            "C"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {order.user?.name || "Customer"}
                          </p>

                          <p className="text-xs text-slate-400">
                            Recent order
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="font-semibold text-slate-800">
                        ₹ {order.totalPrice?.toLocaleString("en-IN")}
                      </span>

                    </td>

                    <td className="px-5 py-4">

                      <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {order.orderStatus}
                      </span>

                    </td>

                  </tr>

                ))}

                {(!orders || orders.length === 0) && (

                  <tr>

                    <td
                      colSpan="3"
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No recent orders found.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =================================
            TOP PRODUCTS
        ================================= */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 to-white px-5 py-5 sm:px-6">

            <h2 className="text-lg font-semibold text-slate-900">
              Top Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Products currently available in your catalog.
            </p>

          </div>

          <div className="p-5 sm:p-6">

            <div className="space-y-3">

              {topProducts.map((product, index) => (

                <div
                  key={product._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-4 transition hover:border-indigo-100 hover:bg-indigo-50/30"
                >

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                      {index + 1}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-800">
                        {product.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Product
                      </p>

                    </div>

                  </div>

                  <div className="ml-4 flex-shrink-0">

                    <span className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm">
                      Stock: {product.stock}
                    </span>

                  </div>

                </div>

              ))}

              {topProducts.length === 0 && (

                <div className="py-10 text-center">

                  <p className="text-sm text-slate-500">
                    No products found.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* =================================
            CHARTS
        ================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Monthly Sales */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-semibold text-slate-900">
                Monthly Sales
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Sales performance over time.
              </p>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={
                  analytics?.sales || []
                }
              >

                <XAxis
                  dataKey="_id"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 25px rgba(15,23,42,0.08)",
                  }}
                />

                <Bar
                  dataKey="totalSales"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Order Status */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="mb-5">

              <h2 className="text-lg font-semibold text-slate-900">
                Order Status
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current distribution of order statuses.
              </p>

            </div>

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={
                    analytics?.orderStatus || []
                  }
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={100}
                  label
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 10px 25px rgba(15,23,42,0.08)",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;

