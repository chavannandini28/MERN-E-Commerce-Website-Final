
import {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  useParams
} from "react-router-dom";

import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Check,
  Package,
  RotateCcw
} from "lucide-react";

import {
  toast
} from "react-toastify";

import {
  getSingleProduct
} from "../redux/productSlice";

import {
  addToCart
} from "../redux/cartSlice";

import {
  addWishlist
} from "../redux/wishlistSlice";

import {
  getProductReviews,
  createReview,
  deleteReview
} from "../redux/reviewSlice";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import ReviewSummary from "../components/ReviewSummary";
import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

const ProductDetails = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    singleProduct,
    loading,
    products
  } = useSelector(
    state => state.product
  );

  const { user } = useSelector(
    state => state.auth
  );

  const {
    reviews,
    averageRating,
    totalReviews,
    loading: reviewLoading
  } = useSelector(
    state => state.reviews
  );

  const [
    selectedImage,
    setSelectedImage
  ] = useState("");

  const [
    quantity,
    setQuantity
  ] = useState(1);

  useEffect(() => {

    dispatch(
      getSingleProduct(id)
    );

  }, [
    dispatch,
    id
  ]);

  useEffect(() => {

    if (singleProduct?._id) {

      dispatch(
        getProductReviews(
          singleProduct._id
        )
      );

    }

  }, [
    singleProduct,
    dispatch
  ]);

  // =====================================
  // SET MAIN IMAGE
  // =====================================

  useEffect(() => {

    if (singleProduct) {

      const image =
        singleProduct?.thumbnail?.url;

      if (
        image &&
        image.trim() !== ""
      ) {

        setSelectedImage(
          `http://localhost:5000/${image.replaceAll("\\", "/")}`
        );

      } else {

        setSelectedImage(
          "/no-image.png"
        );

      }

    }

  }, [
    singleProduct
  ]);

  // =====================================
  // PRODUCT IMAGES
  // =====================================

  const productImages = [
    singleProduct?.thumbnail?.url,
    ...(singleProduct?.images || [])
      .map(img => img.url)
  ]
    .filter(Boolean)
    .map(
      img =>
        `http://localhost:5000/${img.replaceAll("\\", "/")}`
    );

  // =====================================
  // DISCOUNT
  // =====================================

  const discountPrice =
    singleProduct?.price -
    (
      singleProduct?.price *
      (singleProduct?.discount || 0)
    ) /
    100;

  // =====================================
  // QUANTITY
  // =====================================

  const increaseQty = () => {

    if (
      quantity <
      singleProduct.stock
    ) {

      setQuantity(
        quantity + 1
      );

    }

  };

  const decreaseQty = () => {

    if (quantity > 1) {

      setQuantity(
        quantity - 1
      );

    }

  };

  // =====================================
  // CART
  // =====================================

  const handleCart = () => {

    dispatch(
      addToCart({
        productId:
          singleProduct._id,
        quantity
      })
    );

    toast.success(
      "Added to cart"
    );

  };

  // =====================================
  // WISHLIST
  // =====================================

  const handleWishlist = () => {

    dispatch(
      addWishlist(
        singleProduct._id
      )
    );

    toast.success(
      "Added to wishlist"
    );

  };

  // =====================================
  // REVIEW
  // =====================================

  const submitReview = async (data) => {

    if (!user) {

      toast.error(
        "Please login to submit review"
      );

      return;

    }

    try {

      await dispatch(
        createReview({
          productId:
            singleProduct._id,
          rating: data.rating,
          comment: data.comment
        })
      ).unwrap();

      toast.success(
        "Review added successfully"
      );

      dispatch(
        getProductReviews(
          singleProduct._id
        )
      );

    } catch (error) {

      toast.error(
        error || "Review failed"
      );

    }

  };

  // =====================================
  // DELETE REVIEW
  // =====================================

  const handleDeleteReview = async (
    reviewId
  ) => {

    try {

      await dispatch(
        deleteReview(reviewId)
      ).unwrap();

      toast.success(
        "Review deleted"
      );

      dispatch(
        getProductReviews(
          singleProduct._id
        )
      );

    } catch (error) {

      toast.error(
        error || "Delete failed"
      );

    }

  };

  // =====================================
  // LOADER
  // =====================================

  if (
    loading ||
    !singleProduct?._id
  ) {

    return <Loader />;

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 md:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ===============================
            PRODUCT MAIN CARD
        =============================== */}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 p-5 md:p-8 lg:p-10">

            {/* ===============================
                IMAGE GALLERY
            =============================== */}

            <div>

              <div className="relative bg-gray-50 rounded-2xl h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden">

                {/* Discount Badge */}

                {singleProduct.discount > 0 && (

                  <span className="absolute top-5 left-5 z-10 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">

                    {singleProduct.discount}% OFF

                  </span>

                )}

                <img
                  src={
                    selectedImage ||
                    "/no-image.png"
                  }
                  alt={
                    singleProduct.title
                  }
                  className="max-h-full max-w-full object-contain p-8 hover:scale-105 transition-transform duration-500"
                />

              </div>

              {/* Thumbnails */}

              <div className="flex gap-3 mt-5 overflow-x-auto pb-2">

                {productImages.map(
                  (img, index) => (

                    <button
                      key={index}
                      onClick={() =>
                        setSelectedImage(img)
                      }
                      className={`
                        flex-shrink-0
                        w-20
                        h-20
                        rounded-xl
                        overflow-hidden
                        border-2
                        transition-all
                        duration-200
                        ${
                          selectedImage === img
                            ? "border-blue-600 ring-2 ring-blue-100"
                            : "border-gray-200 hover:border-blue-400"
                        }
                      `}
                    >

                      <img
                        src={img}
                        alt="product"
                        className="w-full h-full object-cover"
                      />

                    </button>

                  )
                )}

              </div>

            </div>

            {/* ===============================
                PRODUCT INFORMATION
            =============================== */}

            <div className="flex flex-col">

              {/* Brand / Category */}

              <div className="flex items-center gap-2 mb-3">

                <Package
                  size={18}
                  className="text-blue-600"
                />

                <span className="text-sm font-medium text-gray-500">
                  Premium Product
                </span>

              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">

                {singleProduct.title}

              </h1>

              {/* Rating */}

              <div className="flex items-center gap-3 mt-5">

                <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-lg">

                  <Star
                    size={18}
                    fill="currentColor"
                    className="text-yellow-500"
                  />

                  <span className="ml-1 font-semibold text-gray-800">
                    {averageRating
                      ? Number(
                          averageRating
                        ).toFixed(1)
                      : "0.0"}
                  </span>

                </div>

                <span className="text-gray-500 text-sm">
                  {totalReviews} Reviews
                </span>

              </div>

              {/* Price */}

              <div className="mt-7 flex items-center gap-4 flex-wrap">

                <span className="text-4xl font-extrabold text-blue-600">

                  ₹
                  {Math.round(
                    discountPrice
                  )}

                </span>

                {singleProduct.discount >
                  0 && (

                  <span className="text-xl text-gray-400 line-through">

                    ₹
                    {singleProduct.price}

                  </span>

                )}

              </div>

              {/* Description */}

              <p className="mt-6 text-gray-600 leading-7 text-base">

                {
                  singleProduct.shortDescription
                }

              </p>

              {/* Stock */}

              <div className="mt-6">

                {singleProduct.stock > 0 ? (

                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                    <Check size={16} />

                    In Stock
                    {" "}
                    ({singleProduct.stock} available)

                  </div>

                ) : (

                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">

                    Out Of Stock

                  </div>

                )}

              </div>

              {/* Quantity */}

              <div className="mt-7">

                <p className="font-semibold text-gray-800 mb-3">
                  Quantity
                </p>

                <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden">

                  <button
                    onClick={
                      decreaseQty
                    }
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition"
                  >

                    <Minus size={18} />

                  </button>

                  <span className="w-14 text-center font-bold text-lg">

                    {quantity}

                  </span>

                  <button
                    onClick={
                      increaseQty
                    }
                    className="w-11 h-11 flex items-center justify-center hover:bg-gray-100 transition"
                  >

                    <Plus size={18} />

                  </button>

                </div>

              </div>

              {/* Action Buttons */}

              <div className="flex gap-3 mt-8">

                <button
                  onClick={
                    handleCart
                  }
                  disabled={
                    singleProduct.stock === 0
                  }
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl flex justify-center items-center gap-2 font-semibold shadow-lg shadow-blue-100 transition-all duration-300"
                >

                  <ShoppingCart
                    size={21}
                  />

                  Add To Cart

                </button>

                <button
                  onClick={
                    handleWishlist
                  }
                  className="w-14 border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 rounded-xl flex items-center justify-center transition-all duration-300"
                >

                  <Heart
                    className="text-red-500"
                    size={22}
                  />

                </button>

              </div>

              {/* Benefits */}

              <div className="grid grid-cols-3 gap-3 mt-8">

                <div className="bg-blue-50 rounded-xl p-4 text-center">

                  <Truck
                    size={24}
                    className="mx-auto text-blue-600 mb-2"
                  />

                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Free Delivery
                  </p>

                </div>

                <div className="bg-green-50 rounded-xl p-4 text-center">

                  <ShieldCheck
                    size={24}
                    className="mx-auto text-green-600 mb-2"
                  />

                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Secure Payment
                  </p>

                </div>

                <div className="bg-purple-50 rounded-xl p-4 text-center">

                  <RotateCcw
                    size={24}
                    className="mx-auto text-purple-600 mb-2"
                  />

                  <p className="text-xs md:text-sm font-medium text-gray-700">
                    Easy Returns
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ===============================
            DESCRIPTION
        =============================== */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mt-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Description
          </h2>

          <p className="text-gray-600 leading-8">
            {singleProduct.description}
          </p>

        </div>

        {/* ===============================
            REVIEWS
        =============================== */}

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mt-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-7">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                See what customers think about this product
              </p>

            </div>

            <div className="flex items-center gap-2 text-yellow-500">

              <Star
                size={22}
                fill="currentColor"
              />

              <span className="font-bold text-gray-800">
                {averageRating
                  ? Number(
                      averageRating
                    ).toFixed(1)
                  : "0.0"}
              </span>

            </div>

          </div>

          <ReviewSummary
            averageRating={
              averageRating
            }
            totalReviews={
              totalReviews
            }
          />

          <div className="mt-8">

            {user ? (

              <ReviewForm
                onSubmit={
                  submitReview
                }
                loading={
                  reviewLoading
                }
              />

            ) : (

              <div className="border border-blue-100 bg-blue-50 rounded-2xl p-5 text-blue-700">

                Please login to write a review.

              </div>

            )}

          </div>

          <div className="mt-8">

            <ReviewList
              reviews={reviews}
              user={user}
              onDelete={
                handleDeleteReview
              }
            />

          </div>

        </div>

        {/* ===============================
            RELATED PRODUCTS
        =============================== */}

        <div className="mt-12">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Related Products
              </h2>

              <p className="text-gray-500 mt-1">
                You may also like these products
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {products
              ?.filter(
                item =>
                  item._id !==
                  singleProduct._id
              )
              .slice(0, 4)
              .map(
                product => (

                  <ProductCard
                    key={
                      product._id
                    }
                    product={
                      product
                    }
                  />

                )
              )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductDetails;
