import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getWishlist,
  removeWishlist,
  clearWishlist,
} from "../redux/wishlistSlice";

import { addToCart } from "../redux/cartSlice";

import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Sparkles,
  PackageOpen,
} from "lucide-react";

function Wishlist() {
  const dispatch = useDispatch();

  const { items = [], loading } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />

          <p className="mt-5 text-lg font-semibold text-gray-600">
            Loading your wishlist...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ============================
          HERO HEADER
      ============================ */}

      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-5 py-12">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Heart
                    size={28}
                    fill="currentColor"
                  />
                </div>

                <span className="text-blue-100 font-medium">
                  Your Favorites
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold">
                My Wishlist
              </h1>

              <p className="mt-3 text-blue-100 text-lg">
                Save your favorite products and shop them anytime.
              </p>
            </div>

            {items.length > 0 && (
              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-5 border border-white/20">

                <p className="text-sm text-blue-100">
                  Wishlist Items
                </p>

                <p className="text-3xl font-bold mt-1">
                  {items.length}
                </p>

              </div>
            )}

          </div>

        </div>
      </section>


      {/* ============================
          MAIN CONTENT
      ============================ */}

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* ============================
            TOP BAR
        ============================ */}

        {items.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Saved Products
              </h2>

              <p className="text-gray-500 mt-1">
                {items.length}{" "}
                {items.length === 1 ? "product" : "products"} saved
              </p>
            </div>

            <button
              onClick={() => dispatch(clearWishlist())}
              className="
                flex
                items-center
                justify-center
                gap-2
                border
                border-red-200
                text-red-600
                bg-white
                hover:bg-red-50
                px-5
                py-2.5
                rounded-xl
                font-semibold
                transition
              "
            >
              <Trash2 size={18} />

              Clear Wishlist
            </button>

          </div>
        )}


        {/* ============================
            EMPTY WISHLIST
        ============================ */}

        {items.length === 0 ? (

          <div className="min-h-[500px] flex items-center justify-center">

            <div className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-100
              p-10
              md:p-14
              max-w-lg
              w-full
              text-center
            ">

              <div className="
                w-24
                h-24
                mx-auto
                rounded-full
                bg-blue-50
                flex
                items-center
                justify-center
              ">

                <Heart
                  size={46}
                  className="text-blue-600"
                />

              </div>

              <h2 className="
                text-3xl
                font-bold
                text-gray-800
                mt-7
              ">
                Your Wishlist is Empty
              </h2>

              <p className="
                text-gray-500
                mt-3
                leading-7
              ">
                You haven't added any products to your wishlist yet.
                Explore our collection and save products you love.
              </p>

              <Link to="/shop">

                <button
                  className="
                    mt-7
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    hover:from-blue-700
                    hover:to-indigo-700
                    text-white
                    px-8
                    py-3
                    rounded-xl
                    font-semibold
                    flex
                    items-center
                    justify-center
                    gap-2
                    mx-auto
                    transition
                    shadow-md
                  "
                >
                  Start Shopping

                  <ArrowRight size={19} />
                </button>

              </Link>

            </div>

          </div>

        ) : (

          /* ============================
             PRODUCT GRID
          ============================ */

          <div className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-7
          ">

            {items.map((item) => {

              const product = item.product || item;

              const image =
                product?.thumbnail?.url
                  ? `http://localhost:5000/${product.thumbnail.url.replaceAll(
                      "\\",
                      "/"
                    )}`
                  : "/no-image.png";

              const discountPrice =
                product?.discount > 0
                  ? Math.round(
                      product.price -
                        (product.price * product.discount) / 100
                    )
                  : product.price;

              return (

                <div
                  key={item._id}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    overflow-hidden
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >

                  {/* IMAGE */}

                  <Link
                    to={`/product/${product._id}`}
                    className="block relative"
                  >

                    <div className="
                      h-64
                      bg-gray-50
                      overflow-hidden
                      flex
                      items-center
                      justify-center
                      relative
                    ">

                      <img
                        src={image}
                        alt={product.title || "Product"}
                        className="
                          w-full
                          h-full
                          object-contain
                          p-5
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                      />

                      {/* Wishlist Badge */}

                      <div className="
                        absolute
                        top-4
                        right-4
                        w-10
                        h-10
                        bg-white
                        rounded-full
                        shadow-md
                        flex
                        items-center
                        justify-center
                      ">

                        <Heart
                          size={19}
                          className="text-red-500"
                          fill="currentColor"
                        />

                      </div>

                      {/* Discount */}

                      {product.discount > 0 && (
                        <span className="
                          absolute
                          top-4
                          left-4
                          bg-red-500
                          text-white
                          text-xs
                          font-bold
                          px-3
                          py-1.5
                          rounded-full
                        ">
                          {product.discount}% OFF
                        </span>
                      )}

                    </div>

                  </Link>


                  {/* PRODUCT CONTENT */}

                  <div className="p-5">

                    <Link to={`/product/${product._id}`}>

                      <h2 className="
                        text-lg
                        font-bold
                        text-gray-800
                        line-clamp-2
                        min-h-[56px]
                        hover:text-blue-600
                        transition
                      ">
                        {product.title || "Product"}
                      </h2>

                    </Link>


                    {/* PRICE */}

                    <div className="flex items-center gap-3 mt-3">

                      <span className="
                        text-2xl
                        font-extrabold
                        text-blue-600
                      ">
                        ₹{discountPrice}
                      </span>

                      {product.discount > 0 && (
                        <span className="
                          text-sm
                          text-gray-400
                          line-through
                        ">
                          ₹{product.price}
                        </span>
                      )}

                    </div>


                    {/* STOCK */}

                    <div className="flex items-center gap-2 mt-3">

                      <PackageOpen
                        size={16}
                        className={
                          product.stock > 0
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      />

                      <span
                        className={
                          product.stock > 0
                            ? "text-sm text-green-600 font-medium"
                            : "text-sm text-red-500 font-medium"
                        }
                      >
                        {product.stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>

                    </div>


                    {/* ACTIONS */}

                    <div className="grid grid-cols-2 gap-3 mt-5">

                      <button
                        disabled={product.stock === 0}
                        onClick={() =>
                          dispatch(
                            addToCart({
                              productId: product._id,
                              quantity: 1,
                            })
                          )
                        }
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          bg-blue-600
                          hover:bg-blue-700
                          disabled:bg-gray-300
                          disabled:cursor-not-allowed
                          text-white
                          py-2.5
                          rounded-xl
                          font-semibold
                          text-sm
                          transition
                        "
                      >

                        <ShoppingCart size={17} />

                        Add Cart

                      </button>


                      <button
                        onClick={() =>
                          dispatch(removeWishlist(item._id))
                        }
                        className="
                          flex
                          items-center
                          justify-center
                          gap-2
                          border
                          border-red-200
                          text-red-600
                          hover:bg-red-50
                          py-2.5
                          rounded-xl
                          font-semibold
                          text-sm
                          transition
                        "
                      >

                        <Trash2 size={17} />

                        Remove

                      </button>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}


        {/* ============================
            SHOP MORE
        ============================ */}

        {items.length > 0 && (
          <div className="
            mt-12
            bg-gradient-to-r
            from-blue-50
            to-indigo-50
            rounded-2xl
            p-7
            border
            border-blue-100
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-5
          ">

            <div className="flex items-center gap-4">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
              ">
                <Sparkles size={23} />
              </div>

              <div>

                <h3 className="font-bold text-gray-800 text-lg">
                  Looking for something else?
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Explore more products from our collection.
                </p>

              </div>

            </div>

            <Link to="/shop">

              <button
                className="
                  flex
                  items-center
                  gap-2
                  bg-gray-900
                  hover:bg-gray-800
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                Continue Shopping

                <ArrowRight size={18} />
              </button>

            </Link>

          </div>
        )}

      </div>

    </div>
  );
}

export default Wishlist;