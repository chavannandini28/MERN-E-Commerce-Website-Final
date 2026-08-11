
import { Link } from "react-router-dom";
import { Heart, Star, ArrowRight, ShoppingBag } from "lucide-react";

function WishlistPreview({ wishlist = [] }) {
  const previewItems = wishlist.slice(0, 4);

  const getImageUrl = (item) => {
    if (!item?.thumbnail?.url) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (item.thumbnail.url.startsWith("http")) {
      return item.thumbnail.url;
    }

    return `http://localhost:5000/${item.thumbnail.url.replace(/\\/g, "/")}`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center">
            <Heart
              className="text-pink-500"
              size={25}
              fill="currentColor"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-pink-500">
              Your Favorites
            </p>

            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Wishlist
            </h2>
          </div>

        </div>

        <Link
          to="/wishlist"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-blue-600
            hover:text-blue-700
            font-semibold
            transition
          "
        >
          View All
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>

      </div>

      {/* Empty Wishlist */}
      {previewItems.length === 0 ? (

        <div className="text-center py-14 px-4">

          <div className="w-20 h-20 mx-auto rounded-2xl bg-pink-50 flex items-center justify-center">
            <Heart
              size={40}
              className="text-pink-400"
            />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-5">
            Wishlist is Empty
          </h3>

          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Save your favourite products here and easily find them later.
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
            <ShoppingBag size={18} />
            Explore Products
          </Link>

        </div>

      ) : (

        /* Product Grid */
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {previewItems.map((item) => {

            const product = item.product || item;

            return (

              <div
                key={product._id}
                className="
                  group
                  bg-white
                  border
                  border-gray-100
                  rounded-2xl
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >

                {/* Image */}
                <div className="relative bg-gray-50 overflow-hidden">

                  <img
                    src={getImageUrl(product)}
                    alt={product.title}
                    className="
                      w-full
                      h-52
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  {/* Wishlist Icon */}
                  <div
                    className="
                      absolute
                      top-3
                      right-3
                      w-9
                      h-9
                      rounded-full
                      bg-white/90
                      backdrop-blur-sm
                      flex
                      items-center
                      justify-center
                      shadow-sm
                    "
                  >
                    <Heart
                      size={17}
                      className="text-pink-500"
                      fill="currentColor"
                    />
                  </div>

                </div>

                {/* Product Details */}
                <div className="p-5">

                  <h3 className="
                    font-bold
                    text-gray-900
                    text-base
                    line-clamp-2
                    min-h-[48px]
                  ">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">

                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-yellow-500"
                      />

                      <span className="text-xs font-bold text-yellow-700">
                        {product.averageRating || 4.5}
                      </span>

                    </div>

                    <span className="text-xs text-gray-400">
                      Customer Rating
                    </span>

                  </div>

                  {/* Price */}
                  <p className="text-blue-600 font-extrabold text-xl mt-4">
                    ₹{product.price}
                  </p>

                  {/* Button */}
                  <Link
                    to={`/product/${product._id}`}
                    className="
                      group/btn
                      flex
                      items-center
                      justify-center
                      gap-2
                      mt-4
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-2.5
                      rounded-xl
                      font-semibold
                      text-sm
                      transition-all
                    "
                  >
                    View Product

                    <ArrowRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default WishlistPreview;

