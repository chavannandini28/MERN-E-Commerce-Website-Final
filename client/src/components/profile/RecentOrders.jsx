
import { Link } from "react-router-dom";
import { Package, ArrowRight, CalendarDays } from "lucide-react";

function RecentOrders({ orders = [] }) {
  const recentOrders = orders.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "Shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Processing":
        return "bg-purple-50 text-purple-700 border-purple-200";

      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            Your Activity
          </p>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Keep track of your latest purchases
          </p>
        </div>

        <Link
          to="/my-orders"
          className="group inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
        >
          View All
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>

      </div>

      {/* Empty State */}
      {recentOrders.length === 0 ? (

        <div className="text-center py-14 px-4">

          <div className="w-20 h-20 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center">
            <Package
              size={40}
              className="text-blue-500"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-5">
            No Orders Yet
          </h3>

          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Start shopping and your recent orders will appear here.
          </p>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              shadow-md
              hover:shadow-lg
              transition-all
            "
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-gray-200">

                <th className="text-left py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Order ID
                </th>

                <th className="text-left py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Date
                </th>

                <th className="text-left py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Items
                </th>

                <th className="text-left py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Total
                </th>

                <th className="text-left py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="text-center py-4 px-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="
                    border-b
                    border-gray-100
                    hover:bg-blue-50/40
                    transition-colors
                  "
                >

                  {/* Order ID */}
                  <td className="py-5 px-3">

                    <span className="font-bold text-gray-900">
                      #{order._id.slice(-8)}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="py-5 px-3">

                    <div className="flex items-center gap-2 text-gray-600">

                      <CalendarDays
                        size={16}
                        className="text-gray-400"
                      />

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </div>

                  </td>

                  {/* Items */}
                  <td className="py-5 px-3">

                    <span className="inline-flex items-center justify-center min-w-8 px-2 py-1 rounded-lg bg-gray-100 text-gray-700 font-semibold text-sm">
                      {order.products?.length || 0}
                    </span>

                  </td>

                  {/* Total */}
                  <td className="py-5 px-3">

                    <span className="font-bold text-blue-600">
                      ₹{order.totalPrice}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="py-5 px-3">

                    <span
                      className={`
                        inline-flex
                        items-center
                        px-3
                        py-1.5
                        rounded-full
                        border
                        text-xs
                        font-bold
                        ${getStatusColor(order.orderStatus)}
                      `}
                    >
                      {order.orderStatus}
                    </span>

                  </td>

                  {/* Action */}
                  <td className="py-5 px-3 text-center">

                    <Link
                      to={`/order/${order._id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        font-semibold
                        shadow-sm
                        hover:shadow-md
                        transition-all
                      "
                    >
                      View
                      <ArrowRight size={15} />
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default RecentOrders;

