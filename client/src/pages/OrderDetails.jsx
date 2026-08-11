
import {
  useEffect,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  MapPin,
  Package,
  CreditCard,
  ArrowLeft,
  XCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";

import {
  toast,
} from "react-toastify";

import {
  getOrderDetails,
  cancelOrder,
} from "../redux/orderSlice";

import OrderTimeline from "../components/OrderTimeline";

import {
  downloadInvoiceAPI,
} from "../api/invoiceApi";

const OrderDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    order,
    loading,
  } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {

    dispatch(
      getOrderDetails(id)
    );

  }, [
    dispatch,
    id,
  ]);

  const handleCancel = async () => {

    const confirm =
      window.confirm(
        "Cancel this order?"
      );

    if (!confirm)
      return;

    try {

      await dispatch(
        cancelOrder(order._id)
      ).unwrap();

      toast.success(
        "Order cancelled"
      );

      dispatch(
        getOrderDetails(id)
      );

    } catch (error) {

      toast.error(
        error || "Cancel failed"
      );

    }

  };

  if (loading || !order) {

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-100 px-10 py-12">

          <div className="w-12 h-12 mx-auto rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />

          <h2 className="text-lg font-semibold text-gray-800 mt-5">
            Loading order details...
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch your order.
          </p>

        </div>

      </div>
    );

  }

  const downloadInvoice = async () => {

    try {

      const pdf =
        await downloadInvoiceAPI(
          order._id
        );

      const url =
        window.URL.createObjectURL(
          new Blob([pdf])
        );

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `invoice-${order._id}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (error) {

      toast.error(
        "Invoice download failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10">

        {/* Back */}
        <Link
          to="/my-orders"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-7 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Package size={24} />
                </div>

                <div>

                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Order Details
                  </h1>

                  <p className="text-gray-500 text-sm mt-1 break-all">
                    Order #{order._id}
                  </p>

                </div>

              </div>

            </div>

            <span className="self-start sm:self-center bg-blue-50 text-blue-700 border border-blue-100 px-4 py-2 rounded-full font-semibold text-sm">
              {order.orderStatus}
            </span>

          </div>

        </div>

        {/* Delivery Address */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-3 mb-5">

            <span className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <MapPin size={20} />
            </span>

            Delivery Address

          </h2>

          <div className="bg-gray-50 rounded-xl p-5 space-y-1.5 text-gray-600">

            <p className="font-bold text-gray-900 text-base">
              {order.shippingAddress.fullName}
            </p>

            <p>
              {order.shippingAddress.phone}
            </p>

            <p>
              {order.shippingAddress.address}
            </p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <p>
              {order.shippingAddress.country} -{" "}
              {order.shippingAddress.pincode}
            </p>

          </div>

        </div>

        {/* Order Status */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">

          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">

            <span className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Package size={20} />
            </span>

            Order Status

          </h2>

          <div className="bg-gray-50 rounded-xl p-5 overflow-x-auto">
            <OrderTimeline
              status={order.orderStatus}
            />
          </div>

        </div>

        {/* Products */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Products
            </h2>

            <span className="text-sm text-gray-500">
              {order.products?.length || 0}{" "}
              {order.products?.length === 1
                ? "Item"
                : "Items"}
            </span>

          </div>

          <div className="space-y-4">

            {order.products.map(
              (item) => (

                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition"
                >

                  <div className="flex gap-4 items-center">

                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">

                      <img
                        src={
                          item.image ||
                          "/placeholder.png"
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-gray-900">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                      {item.size && (
                        <p className="text-gray-500 text-sm">
                          Size: {item.size}
                        </p>
                      )}

                      {item.color && (
                        <p className="text-gray-500 text-sm">
                          Color: {item.color}
                        </p>
                      )}

                    </div>

                  </div>

                  <div className="sm:text-right">

                    <p className="text-xs text-gray-400 mb-1">
                      Price
                    </p>

                    <p className="font-bold text-lg text-gray-900">
                      ₹{item.price}
                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* Payment Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-3">

              <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard size={20} />
              </span>

              Payment Summary

            </h2>

            <CheckCircle2
              size={22}
              className="text-green-500"
            />

          </div>

          <div className="space-y-4">

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-semibold text-gray-900">
                {order.paymentMethod}
              </span>

            </div>

            <div className="flex justify-between gap-4 text-sm">

              <span className="text-gray-500">
                Payment Status
              </span>

              <span className="font-semibold text-green-600">
                {order.paymentStatus}
              </span>

            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Items Price
                </span>

                <span className="font-medium">
                  ₹{order.itemsPrice}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Shipping
                </span>

                <span className="font-medium">
                  ₹{order.shippingPrice}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Tax
                </span>

                <span className="font-medium">
                  ₹{order.taxPrice}
                </span>

              </div>

            </div>

            <div className="border-t border-gray-200 pt-5 flex justify-between items-center">

              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-extrabold text-blue-600">
                ₹{order.totalPrice}
              </span>

            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">

          <button
            onClick={downloadInvoice}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
          >
            <FileText size={19} />
            Download Invoice
          </button>

          {order.orderStatus === "Pending" && (

            <button
              onClick={handleCancel}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200"
            >
              <XCircle size={19} />
              Cancel Order
            </button>

          )}

        </div>

      </div>

    </div>

  );

};

export default OrderDetails;

