
import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  getAdminOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../redux/orderSlice";

function OrderList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================
  // LOCAL STATE
  // ==========================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // ==========================
  // REDUX STATE
  // ==========================

  const {
    orders = [],
    loading,
  } = useSelector(
    (state) => state.orders
  );

  // ==========================
  // FETCH ORDERS
  // ==========================

  useEffect(() => {
    dispatch(getAdminOrders());
  }, [dispatch]);

  // ==========================
  // STATUS UPDATE
  // ==========================

  const handleStatusChange = (id, status) => {
    dispatch(
      updateOrderStatus({
        id,
        status,
      })
    );
  };

  // ==========================
  // DELETE ORDER
  // ==========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (confirmDelete) {
      dispatch(deleteOrder(id));
    }
  };

  // ==========================
  // FILTER ORDERS
  // ==========================

  const filteredOrders = orders.filter((order) => {
    const searchValue = search.toLowerCase();

    const searchMatch =
      order._id
        ?.toLowerCase()
        .includes(searchValue) ||
      order.user?.name
        ?.toLowerCase()
        .includes(searchValue);

    const statusMatch =
      statusFilter === "All"
        ? true
        : order.orderStatus === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-indigo-600">
                Orders
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Order Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage customer orders and update order status.
            </p>

          </div>

          <div className="flex items-center gap-2">

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

              <p className="text-xs font-medium text-slate-400">
                Total Orders
              </p>

              <p className="text-lg font-bold text-slate-800">
                {orders.length}
              </p>

            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5">

              <p className="text-xs font-medium text-indigo-500">
                Showing
              </p>

              <p className="text-lg font-bold text-indigo-700">
                {filteredOrders.length}
              </p>

            </div>

          </div>

        </div>

        {/* =========================
            FILTER CARD
        ========================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}

            <div className="relative flex-1">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search Order ID or Customer..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />

            </div>

            {/* Status Filter */}

            <div className="flex items-center gap-3">

              <span className="hidden text-sm font-medium text-slate-500 sm:block">
                Status:
              </span>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-48"
              >

                <option value="All">
                  All Orders
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* =========================
            TABLE CARD
        ========================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">

            <div>

              <h2 className="font-bold text-slate-900">
                All Orders
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Recent customer orders
              </p>

            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {filteredOrders.length} Results
            </span>

          </div>

          {/* Loading */}

          {loading ? (

            <div className="flex min-h-[350px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

                <p className="font-semibold text-slate-700">
                  Loading Orders...
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Please wait
                </p>

              </div>

            </div>

          ) : filteredOrders.length === 0 ? (

            /* Empty State */

            <div className="flex min-h-[350px] items-center justify-center px-6">

              <div className="text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  📦
                </div>

                <h3 className="font-bold text-slate-800">
                  No Orders Found
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Try changing your search or status filter.
                </p>

              </div>

            </div>

          ) : (

            /* =========================
               TABLE
            ========================= */

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1050px]">

                <thead>

                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Order ID
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Payment
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Order ID */}

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-xs font-semibold text-slate-700">
                          #{order._id.slice(-8)}
                        </span>

                      </td>

                      {/* Customer */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {order.user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-semibold text-slate-800">
                              {order.user?.name ||
                                "Customer"}
                            </p>

                            <p className="max-w-[200px] truncate text-xs text-slate-400">
                              {order.user?.email || ""}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Date */}

                      <td className="px-5 py-4 text-center">

                        <span className="text-sm font-medium text-slate-600">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </td>

                      {/* Amount */}

                      <td className="px-5 py-4 text-center">

                        <span className="font-bold text-slate-800">
                          ₹ {order.totalPrice || 0}
                        </span>

                      </td>

                      {/* Payment */}

                      <td className="px-5 py-4 text-center">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            order.paymentStatus ===
                            "Paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >

                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              order.paymentStatus ===
                              "Paid"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />

                          {order.paymentStatus ||
                            "Pending"}

                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4 text-center">

                        <select
                          value={
                            order.orderStatus ||
                            "Pending"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              order._id,
                              e.target.value
                            )
                          }
                          className={`rounded-lg border px-3 py-2 text-xs font-semibold outline-none transition focus:ring-4 focus:ring-indigo-50 ${
                            order.orderStatus ===
                            "Delivered"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                              : order.orderStatus ===
                                "Cancelled"
                              ? "border-red-200 bg-red-50 text-red-700"
                              : order.orderStatus ===
                                "Shipped"
                              ? "border-blue-200 bg-blue-50 text-blue-700"
                              : order.orderStatus ===
                                "Processing"
                              ? "border-purple-200 bg-purple-50 text-purple-700"
                              : "border-amber-200 bg-amber-50 text-amber-700"
                          }`}
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-2">

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/orders/${order._id}`
                              )
                            }
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                order._id
                              )
                            }
                            className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default OrderList;

