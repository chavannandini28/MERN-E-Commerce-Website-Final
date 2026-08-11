
import { useEffect } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  getOrderDetails,
  updateOrderStatus,
} from "../redux/orderSlice";

function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    order,
    loading,
  } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  const handleStatusChange = (status) => {
    dispatch(
      updateOrderStatus({
        id: order._id,
        status,
      })
    );
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-slate-50 p-6">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="font-semibold text-slate-700">
              Loading Order Details...
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Please wait
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] bg-slate-50 p-6">
        <div className="flex min-h-[50vh] items-center justify-center">

          <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
              ⚠️
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Order Not Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              We couldn't find the order you're looking for.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Go Back
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* =================================
            HEADER
        ================================= */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Orders</span>
              <span>/</span>
              <span className="font-medium text-indigo-600">
                Details
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Order Details
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-2">

              <span className="text-sm text-slate-500">
                Order ID:
              </span>

              <span className="rounded-lg bg-slate-200 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700">
                #{order._id}
              </span>

            </div>

          </div>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <span>←</span>
            Back
          </button>

        </div>

        {/* =================================
            CUSTOMER + PAYMENT
        ================================= */}

        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Customer */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                  👤
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Customer Information
                  </h2>

                  <p className="text-xs text-slate-400">
                    Customer details
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-6">

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Name
                </p>

                <p className="font-semibold text-slate-800">
                  {order.user?.name || "N/A"}
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="break-all font-medium text-slate-700">
                  {order.user?.email || "N/A"}
                </p>

              </div>

            </div>

          </div>

          {/* Payment */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                  💳
                </div>

                <div>

                  <h2 className="font-bold text-slate-900">
                    Payment Information
                  </h2>

                  <p className="text-xs text-slate-400">
                    Payment and order total
                  </p>

                </div>

              </div>

            </div>

            <div className="space-y-4 p-6">

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                <span className="text-sm text-slate-500">
                  Method
                </span>

                <span className="font-semibold text-slate-800">
                  {order.paymentMethod}
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                <span className="text-sm text-slate-500">
                  Payment Status
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {order.paymentStatus}
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 p-4">

                <span className="font-semibold text-indigo-700">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-indigo-700">
                  ₹ {order.totalPrice}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =================================
            SHIPPING ADDRESS
        ================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
                📍
              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  Shipping Address
                </h2>

                <p className="text-xs text-slate-400">
                  Delivery location
                </p>

              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Address
              </p>
              <p className="mt-1 font-medium text-slate-700">
                {order.shippingAddress?.address || "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                City
              </p>
              <p className="mt-1 font-medium text-slate-700">
                {order.shippingAddress?.city || "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                State
              </p>
              <p className="mt-1 font-medium text-slate-700">
                {order.shippingAddress?.state || "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Postal Code
              </p>
              <p className="mt-1 font-medium text-slate-700">
                {order.shippingAddress?.postalCode || "N/A"}
              </p>
            </div>

          </div>

        </div>

        {/* =================================
            ORDER STATUS
        ================================= */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-lg font-bold text-slate-900">
              Order Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the current status of this order.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {[
              "Pending",
              "Processing",
              "Shipped",
              "Delivered",
            ].map((status) => (

              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                  order.orderStatus === status
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-100"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {status}
              </button>

            ))}

          </div>

        </div>

        {/* =================================
            ORDER ITEMS
        ================================= */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Order Items
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Products included in this order.
                </p>

              </div>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {order.orderItems?.length || 0} Items
              </span>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {order.orderItems?.map((item) => (

                  <tr
                    key={item.product}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-xl border border-slate-200 object-cover"
                        />

                        <div>

                          <p className="font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Product
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-center">

                      <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
                        {item.quantity}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-center font-medium text-slate-700">
                      ₹ {item.price}
                    </td>

                    <td className="px-6 py-4 text-right">

                      <span className="font-bold text-slate-900">
                        ₹ {item.price * item.quantity}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;

