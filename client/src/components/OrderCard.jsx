import {
  Link
} from "react-router-dom";

import {
  Eye,
  XCircle,
  CalendarDays,
  CreditCard,
  Package,
  ChevronRight,
} from "lucide-react";

import {
  toast
} from "react-toastify";

const OrderCard = ({
  order,
  onCancel
}) => {

  const statusColor = (status) => {

    switch (status) {

      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";

      case "Processing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  return (

    <div className="
      group
      bg-white
      border
      border-gray-200
      rounded-2xl
      shadow-sm
      hover:shadow-xl
      hover:border-blue-200
      transition-all
      duration-300
      overflow-hidden
    ">

      {/* Header */}

      <div className="
        bg-gradient-to-r
        from-gray-50
        to-white
        px-6
        py-5
        border-b
        border-gray-100
      ">

        <div className="
          flex
          flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-4
        ">

          <div>

            <div className="flex items-center gap-2">

              <div className="
                w-9
                h-9
                rounded-lg
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              ">
                <Package size={19} />
              </div>

              <h2 className="
                font-bold
                text-lg
                text-gray-900
              ">
                Order #{order._id.slice(-8)}
              </h2>

            </div>

            <p className="
              text-sm
              text-gray-500
              flex
              gap-2
              items-center
              mt-3
            ">

              <CalendarDays size={16} />

              {new Date(order.createdAt).toDateString()}

            </p>

          </div>

          <span
            className={`
              inline-flex
              items-center
              justify-center
              px-4
              py-2
              rounded-full
              border
              text-sm
              font-semibold
              ${statusColor(order.orderStatus)}
            `}
          >
            {order.orderStatus}
          </span>

        </div>

      </div>


      {/* Products */}

      <div className="px-6 py-5">

        <div className="flex items-center justify-between mb-4">

          <h3 className="
            text-sm
            font-semibold
            text-gray-500
            uppercase
            tracking-wide
          ">
            Order Items
          </h3>

          <span className="text-xs text-gray-400">
            {order.products.length} item(s)
          </span>

        </div>

        <div className="space-y-3">

          {
            order.products
              .slice(0, 3)
              .map(
                (item) => (

                  <div
                    key={item._id}
                    className="
                      flex
                      items-center
                      gap-4
                      p-3
                      rounded-xl
                      bg-gray-50
                      hover:bg-blue-50
                      transition
                    "
                  >

                    <div className="
                      w-16
                      h-16
                      rounded-xl
                      bg-white
                      border
                      border-gray-200
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    ">

                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </div>

                    <div className="flex-1 min-w-0">

                      <h3 className="
                        font-semibold
                        text-gray-800
                        truncate
                      ">
                        {item.name}
                      </h3>

                      <p className="
                        text-sm
                        text-gray-500
                        mt-1
                      ">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <ChevronRight
                      size={18}
                      className="text-gray-400"
                    />

                  </div>

                )
              )
          }

        </div>

      </div>


      {/* Footer */}

      <div className="
        border-t
        border-gray-100
        bg-gray-50/70
        px-6
        py-5
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-5
      ">

        <div>

          <p className="
            flex
            gap-2
            items-center
            text-sm
            text-gray-500
          ">

            <CreditCard size={17} />

            Payment:
            <span className="font-medium text-gray-700">
              {order.paymentStatus}
            </span>

          </p>

          <p className="
            text-2xl
            font-extrabold
            text-gray-900
            mt-2
          ">
            ₹{order.totalPrice}
          </p>

        </div>


        <div className="
          flex
          flex-wrap
          gap-3
        ">

          <Link
            to={`/order/${order._id}`}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2.5
              rounded-xl
              flex
              items-center
              justify-center
              gap-2
              font-semibold
              shadow-sm
              hover:shadow-md
              transition-all
            "
          >

            <Eye size={18} />

            View Order

          </Link>


          {
            order.orderStatus === "Pending" &&

            <button
              onClick={() => {

                if (
                  window.confirm(
                    "Cancel this order?"
                  )
                ) {

                  onCancel(order._id);

                }

              }}
              className="
                bg-red-50
                hover:bg-red-600
                text-red-600
                hover:text-white
                border
                border-red-200
                hover:border-red-600
                px-5
                py-2.5
                rounded-xl
                flex
                items-center
                justify-center
                gap-2
                font-semibold
                transition-all
              "
            >

              <XCircle size={18} />

              Cancel

            </button>

          }

        </div>

      </div>

    </div>

  );
};

export default OrderCard;