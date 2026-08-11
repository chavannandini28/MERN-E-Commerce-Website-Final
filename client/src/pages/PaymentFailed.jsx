
import {
  XCircle,
  RotateCcw,
  ShoppingCart,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

const PaymentFailed = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg">

        {/* Back to Checkout */}

        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-medium mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Checkout
        </Link>

        {/* Main Card */}

        <div className="bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden">

          {/* Top Banner */}

          <div className="bg-gradient-to-r from-red-500 to-rose-600 px-6 py-5 text-white text-center">

            <div className="flex justify-center items-center gap-2">

              <ShieldAlert size={20} />

              <span className="font-semibold">
                Payment Unsuccessful
              </span>

            </div>

          </div>

          {/* Content */}

          <div className="p-8 md:p-10 text-center">

            {/* Icon */}

            <div className="relative mx-auto w-24 h-24 mb-7">

              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />

              <div className="relative w-24 h-24 bg-red-50 border-4 border-red-100 rounded-full flex items-center justify-center">

                <XCircle
                  size={58}
                  className="text-red-600"
                />

              </div>

            </div>

            {/* Heading */}

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">

              Payment Failed

            </h1>

            <p className="text-gray-500 mt-3 leading-7 max-w-sm mx-auto">

              We couldn't complete your payment.
              Your order has not been confirmed.

            </p>

            {/* Order ID */}

            {id && (

              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">

                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">

                  Order ID

                </p>

                <p className="text-sm font-mono font-semibold text-gray-700 mt-1 break-all">

                  {id}

                </p>

              </div>

            )}

            {/* Message */}

            <div className="mt-5 bg-red-50 border border-red-100 rounded-xl p-4 text-left">

              <p className="text-sm text-red-700 leading-6">

                Please check your payment details,
                internet connection, or try another
                payment method.

              </p>

            </div>

            {/* Buttons */}

            <div className="mt-8 space-y-3">

              <Link
                to="/checkout"
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300"
              >

                <RotateCcw size={20} />

                Retry Payment

              </Link>

              <Link
                to="/cart"
                className="w-full flex justify-center items-center gap-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold transition"
              >

                <ShoppingCart size={20} />

                Go To Cart

              </Link>

            </div>

            {/* Support */}

            <p className="text-xs text-gray-400 mt-7">

              If the amount was deducted from your account,
              please wait before trying again.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentFailed;

