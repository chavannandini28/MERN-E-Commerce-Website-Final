
import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Package,
  ShoppingBag,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  getMyOrders,
  cancelOrder,
} from "../redux/orderSlice";

import OrderCard from "../components/OrderCard";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders,
    loading,
    error,
  } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleCancelOrder = async (id) => {
    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this order?"
      );

    if (!confirmCancel)
      return;

    try {
      await dispatch(
        cancelOrder(id)
      ).unwrap();

      toast.success(
        "Order cancelled successfully"
      );
    } catch (error) {
      toast.error(
        error || "Unable to cancel order"
      );
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package size={25} />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    My Orders
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    Track and manage your recent orders
                  </p>
                </div>

              </div>

            </div>

            {orders?.length > 0 && (
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold">
                {orders.length}{" "}
                {orders.length === 1 ? "Order" : "Orders"}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">

            <div className="w-12 h-12 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

            <h2 className="text-lg font-semibold text-gray-800 mt-5">
              Loading your orders...
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Please wait while we fetch your order history.
            </p>

          </div>
        )}

        {/* Empty Orders */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16 px-6">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
              <ShoppingBag
                size={36}
                className="text-blue-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center mt-7 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
            >
              Start Shopping
            </Link>

          </div>
        )}

        {/* Orders */}
        {!loading && orders.length > 0 && (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >

                <OrderCard
                  order={order}
                  onCancel={handleCancelOrder}
                />

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
};

export default MyOrders;
