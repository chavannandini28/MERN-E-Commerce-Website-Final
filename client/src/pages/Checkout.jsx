
import {
  useEffect,
  useMemo,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  ShoppingBag,
  MapPin,
} from "lucide-react";

import AddressPreview from "../components/checkout/AddressPreview";
import CheckoutItem from "../components/checkout/CheckoutItem";
import PriceSummary from "../components/checkout/PriceSummary";

import {
  getCart,
} from "../redux/cartSlice";

import {
  getAddresses,
} from "../redux/userSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  // ==========================
  // Redux States
  // ==========================

  const {
    items = [],
  } = useSelector(
    (state) => state.cart
  );

  const cartItems = items;

  const {
    addresses = [],
  } = useSelector(
    (state) => state.users
  );

  // ==========================
  // Load Data
  // ==========================

  useEffect(() => {
    dispatch(getCart());
    dispatch(getAddresses());
  }, [dispatch]);

  // ==========================
  // Delivery Address
  // ==========================

  const deliveryAddress =
    addresses.find(
      (item) => item.isDefault
    ) ||
    addresses[0] ||
    null;

  // ==========================
  // Price Calculation
  // ==========================

  const {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (
        sum,
        item
      ) => {
        const price =
          item.price ||
          item.product?.price ||
          0;

        const quantity =
          item.quantity ||
          item.qty ||
          1;

        return (
          sum +
          price *
          quantity
        );
      },
      0
    );

    const shipping =
      subtotal >= 500
        ? 0
        : subtotal > 0
          ? 50
          : 0;

    const tax = Number(
      (
        subtotal *
        0.18
      ).toFixed(2)
    );

    const discount = 0;

    const total = Number(
      (
        subtotal +
        shipping +
        tax -
        discount
      ).toFixed(2)
    );

    return {
      subtotal,
      shipping,
      tax,
      discount,
      total,
    };
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <ShoppingBag size={20} />

            <span className="text-sm font-semibold">
              Secure Checkout
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Review your delivery details and order before placing it.
          </p>

        </div>

        {/* Address Section */}
        <div className="mb-6">

          <div className="flex items-center gap-2 mb-3">
            <MapPin
              size={18}
              className="text-blue-600"
            />

            <h2 className="font-bold text-gray-900">
              Delivery Address
            </h2>
          </div>

          <AddressPreview
            address={deliveryAddress}
          />

        </div>

        {/* Main Checkout Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

              {/* Cart Header */}
              <div className="px-5 md:px-6 py-5 border-b border-gray-100">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      Shopping Cart
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      Review your selected products
                    </p>
                  </div>

                  {cartItems.length > 0 && (
                    <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
                      {cartItems.length}{" "}
                      {cartItems.length === 1
                        ? "item"
                        : "items"}
                    </span>
                  )}

                </div>

              </div>

              {/* Items */}
              <div className="p-5 md:p-6">

                {cartItems.length === 0 ? (
                  <div className="text-center py-14">

                    <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-gray-100">
                      <ShoppingBag
                        size={30}
                        className="text-gray-400"
                      />
                    </div>

                    <p className="text-gray-700 font-semibold text-lg mt-5">
                      Your cart is empty.
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      Add some products to continue checkout.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-4">

                    {cartItems.map(
                      (item) => (
                        <CheckoutItem
                          key={item._id}
                          item={item}
                        />
                      )
                    )}

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Price Summary */}
          <div className="lg:sticky lg:top-6 h-fit">

            <PriceSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              discount={discount}
              total={total}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;

