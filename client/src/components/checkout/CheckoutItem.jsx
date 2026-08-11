
import { Package, ShoppingBag, Tag } from "lucide-react";

const CheckoutItem = ({ item }) => {
  const product = item?.product || item;

  const image =
    product?.thumbnail?.url
      ? product.thumbnail.url.startsWith("http")
        ? product.thumbnail.url
        : `http://localhost:5000/${product.thumbnail.url.replace(/\\/g, "/")}`
      : "/no-image.png";

  const title = product?.title || "Product";

  const quantity =
    item?.quantity ||
    item?.qty ||
    1;

  const price =
    item?.price ||
    product?.price ||
    0;

  const total = price * quantity;

  return (
    <div className="group flex flex-col sm:flex-row gap-5 py-6 border-b last:border-b-0">

      {/* Product Image */}
      <div className="relative w-full sm:w-32 h-32 shrink-0 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden flex items-center justify-center">

        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quantity Badge */}
        <span className="absolute top-2 right-2 min-w-7 h-7 px-2 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold shadow">
          ×{quantity}
        </span>

      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">

        {/* Title */}
        <div className="flex items-start justify-between gap-3">

          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {title}
            </h3>

            {(product?.brand || product?.category) && (
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">

                <Tag size={14} />

                <span>
                  {product?.brand?.name ||
                    product?.brand ||
                    ""}
                </span>

                {product?.brand &&
                  product?.category && (
                    <span>•</span>
                  )}

                <span>
                  {product?.category?.name ||
                    product?.category ||
                    ""}
                </span>

              </div>
            )}
          </div>

        </div>

        {/* Description */}
        {product?.shortDescription && (
          <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-6">
            {product.shortDescription}
          </p>
        )}

        {/* Product Information */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">

          {/* Price */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
              Price
            </p>

            <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
              ₹{price.toLocaleString()}
            </p>
          </div>

          {/* Quantity */}
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400 font-medium">
              Quantity
            </p>

            <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">
              {quantity}
            </p>
          </div>

          {/* Total */}
          <div className="rounded-xl bg-green-50 border border-green-100 p-3 col-span-2 sm:col-span-1">
            <p className="text-xs uppercase tracking-wide text-green-600 font-medium">
              Total
            </p>

            <p className="text-base sm:text-lg font-bold text-green-700 mt-1">
              ₹{total.toLocaleString()}
            </p>
          </div>

        </div>

        {/* Stock Status */}
        <div className="mt-5 flex items-center gap-2">

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
            <Package
              size={17}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-green-700">
              In Stock
            </p>

            <p className="text-xs text-gray-400">
              Ready for delivery
            </p>
          </div>

        </div>

      </div>

      {/* Desktop Total */}
      <div className="hidden md:flex flex-col items-end justify-start min-w-24">

        <p className="text-xs uppercase tracking-wide text-gray-400">
          Item Total
        </p>

        <p className="text-xl font-bold text-gray-900 mt-1">
          ₹{total.toLocaleString()}
        </p>

      </div>

    </div>
  );
};

export default CheckoutItem;
