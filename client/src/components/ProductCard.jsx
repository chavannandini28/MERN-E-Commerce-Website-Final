import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

import { addToCart } from "../redux/cartSlice";
import { addWishlist } from "../redux/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const image = product.thumbnail?.url
    ? `http://localhost:5000/${product.thumbnail.url.replace(/\\/g, "/")}`
    : "/no-image.png";

  const rating = product.rating || 4.5;
  const reviews = product.numReviews || 0;
  const stock = product.stock || 0;

  const hasDiscount =
    product.comparePrice &&
    product.comparePrice > product.price;

  const discount = hasDiscount
    ? Math.round(
        ((product.comparePrice - product.price) /
          product.comparePrice) *
          100
      )
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={image}
          alt={product.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = "/no-image.png";
          }}
          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

        {/* Discount */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {discount}% OFF
          </span>
        )}

        {/* Stock */}
        <span
          className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md ${
            stock > 0
              ? "bg-white text-green-600"
              : "bg-gray-800 text-white"
          }`}
        >
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        {/* Wishlist */}
        <button
          onClick={() => dispatch(addWishlist(product._id))}
          className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm shadow-lg flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <Heart size={19} />
        </button>

      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Category */}
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {product.category?.name || "Premium Product"}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 min-h-[56px] group-hover:text-blue-600 transition-colors duration-300">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">

          <div className="flex">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                size={15}
                className={
                  item <= Math.round(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-500 ml-1">
            {rating.toFixed(1)}
          </span>

          <span className="text-xs text-gray-400">
            ({reviews} reviews)
          </span>

        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">

          <span className="text-2xl font-extrabold text-gray-900">
            ₹{product.price}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.comparePrice}
            </span>
          )}

        </div>

        {/* Stock Information */}
        <div className="mt-3">

          {stock > 0 ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-sm font-medium text-green-600">
                {stock} items available
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <p className="text-sm font-medium text-red-600">
                Currently unavailable
              </p>
            </div>
          )}

        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <button
            disabled={stock === 0}
            onClick={() =>
              dispatch(
                addToCart({
                  productId: product._id,
                  quantity: 1,
                })
              )
            }
            className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
              stock > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg hover:shadow-blue-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart size={17} />
            Add Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <Eye size={17} />
            Details
          </Link>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;