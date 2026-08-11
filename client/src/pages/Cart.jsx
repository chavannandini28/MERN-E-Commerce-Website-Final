
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import {
  getCart,
  updateCart,
  removeCart,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

          <h2 className="text-lg font-semibold text-gray-700">
            Loading Cart...
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ShoppingBag size={20} />
            <span className="text-sm font-semibold">
              Your Cart
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          {items.length > 0 && (
            <p className="text-gray-500 mt-2">
              Review your items before checkout.
            </p>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm text-center py-16 px-6">

            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-blue-50">
              <ShoppingBag
                size={38}
                className="text-blue-500"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Looks like you haven't added anything yet.
            </p>

            <Link to="/shop">
              <button className="mt-7 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200">
                Continue Shopping
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-5">
              {items.map((item) => {
                const image =
                  item.product?.thumbnail?.url
                    ? `http://localhost:5000/${item.product.thumbnail.url.replace(
                        /\\/g,
                        "/"
                      )}`
                    : "/no-image.png";

                return (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-5">

                      {/* Product Image */}
                      <div className="w-full sm:w-28 md:w-32 h-48 sm:h-28 md:h-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={image}
                          alt={item.product?.title || "Product"}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">

                        <h2 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
                          {item.product?.title}
                        </h2>

                        <p className="text-blue-600 mt-2 font-bold text-lg">
                          ₹ {item.price}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="flex flex-wrap items-center gap-4 mt-5">

                          <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">

                            <button
                              disabled={item.quantity <= 1}
                              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                              onClick={async () => {
                                await dispatch(
                                  updateCart({
                                    id: item.product._id,
                                    quantity: item.quantity - 1,
                                  })
                                );

                                dispatch(getCart());
                              }}
                            >
                              <Minus size={16} />
                            </button>

                            <span className="w-10 text-center font-bold text-gray-800">
                              {item.quantity}
                            </span>

                            <button
                              className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
                              onClick={async () => {
                                await dispatch(
                                  updateCart({
                                    id: item.product._id,
                                    quantity: item.quantity + 1,
                                  })
                                );

                                dispatch(getCart());
                              }}
                            >
                              <Plus size={16} />
                            </button>

                          </div>

                          <button
                            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200"
                            onClick={async () => {
                              await dispatch(removeCart(item._id));
                              dispatch(getCart());
                            }}
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>

                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="sm:text-right flex sm:block items-center justify-between border-t sm:border-t-0 pt-4 sm:pt-0">
                        <span className="text-sm text-gray-500 sm:hidden">
                          Subtotal
                        </span>

                        <p className="font-bold text-xl text-gray-900">
                          ₹ {item.subtotal}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 md:p-7">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                <div>
                  <p className="text-sm text-gray-500">
                    Cart Total
                  </p>

                  <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
                    ₹ {total}
                  </h2>
                </div>

                <Link to="/checkout">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all duration-200">
                    Proceed To Checkout
                    <ArrowRight size={18} />
                  </button>
                </Link>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;
