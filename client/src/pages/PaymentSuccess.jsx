
import {
  CheckCircle,
  Package,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
} from "react-redux";

import {
  getOrderDetails,
} from "../redux/orderSlice";

import {
  useEffect,
} from "react";

const PaymentSuccess = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg">

        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

          {/* Top Success Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-10 text-center text-white">

            <div className="relative flex justify-center mb-5">

              <div className="absolute w-24 h-24 bg-white/20 rounded-full animate-pulse"></div>

              <div className="relative bg-white rounded-full p-4 shadow-lg">

                <CheckCircle
                  size={64}
                  className="text-green-600"
                />

              </div>

            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Payment Successful!
            </h1>

            <p className="mt-3 text-green-50 text-sm md:text-base">
              Your order has been placed successfully 🎉
            </p>

          </div>

          {/* Content */}
          <div className="p-6 md:p-8">

            {/* Order ID */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-6">

              <div className="flex items-center justify-center gap-2 mb-2">

                <Package
                  size={18}
                  className="text-blue-600"
                />

                <p className="text-sm font-medium text-gray-500">
                  Order ID
                </p>

              </div>

              <p className="text-sm md:text-base font-semibold text-gray-800 break-all text-center">
                {id}
              </p>

            </div>

            {/* Success Message */}
            <div className="text-center mb-7">

              <h2 className="text-xl font-semibold text-gray-800">
                Thank you for your purchase!
              </h2>

              <p className="text-gray-500 text-sm mt-2 leading-6">
                Your order is being processed. You can view
                your order details or continue shopping.
              </p>

            </div>

            {/* Buttons */}
            <div className="space-y-3">

              <Link
                to={`/order/${id}`}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >

                <Package size={20} />

                View Order

              </Link>

              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-700 py-3.5 rounded-xl font-semibold transition-all duration-300"
              >

                <ShoppingBag size={20} />

                Continue Shopping

              </Link>

            </div>

          </div>

          {/* Footer */}
          <div className="border-t bg-gray-50 px-6 py-4 text-center">

            <p className="text-xs text-gray-500">
              Thank you for shopping with us ❤️
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccess;
