
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  Sparkles,
  Tag,
  Star,
} from "lucide-react";

import { getProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { products = [], loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Featured products
  const featuredProducts = useMemo(() => {
    return products.slice(0, 8);
  }, [products]);

  // Best selling / popular products
  const popularProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const ratingA = a.averageRating || a.rating || 0;
        const ratingB = b.averageRating || b.rating || 0;

        return ratingB - ratingA;
      })
      .slice(0, 4);
  }, [products]);

  // Categories
  const categories = useMemo(() => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const category = product.category;

      if (category?.name) {
        if (!categoryMap.has(category.name)) {
          categoryMap.set(category.name, {
            name: category.name,
            image:
              category.image?.url ||
              category.thumbnail?.url ||
              product.thumbnail?.url ||
              "/no-image.png",
          });
        }
      }
    });

    return Array.from(categoryMap.values()).slice(0, 4);
  }, [products]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full" />
          <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-white rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}

            <div>

              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">

                <Sparkles size={18} />

                <span className="text-sm font-medium">
                  New Collection Available
                </span>

              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">

                Shop Smart.
                <br />

                <span className="text-blue-200">
                  Live Better.
                </span>

              </h1>

              <p className="mt-6 text-lg text-blue-100 max-w-xl leading-8">

                Discover quality products, amazing deals and everything
                you need in one place. Shop your favorites with confidence.

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
                >
                  Shop Now

                  <ArrowRight size={20} />

                </Link>

                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/10 px-7 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Explore Products
                </Link>

              </div>

            </div>

            {/* Hero Visual */}

            <div className="hidden lg:flex justify-center">

              <div className="relative w-[430px] h-[430px]">

                <div className="absolute inset-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" />

                <div className="absolute inset-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">

                  <ShoppingBag
                    size={150}
                    strokeWidth={1.2}
                    className="text-white"
                  />

                </div>

                <div className="absolute top-8 right-5 bg-white text-gray-800 rounded-2xl px-5 py-4 shadow-xl">

                  <p className="text-xs text-gray-500">
                    Special Offer
                  </p>

                  <p className="text-2xl font-extrabold">
                    50% OFF
                  </p>

                </div>

                <div className="absolute bottom-10 left-0 bg-white text-gray-800 rounded-2xl px-5 py-4 shadow-xl">

                  <div className="flex items-center gap-2">

                    <Star
                      size={18}
                      className="text-yellow-500"
                      fill="currentColor"
                    />

                    <span className="font-bold">
                      4.9/5
                    </span>

                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Trusted shopping
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-6 py-7">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">

                <Truck size={24} />

              </div>

              <div>

                <h3 className="font-bold">
                  Free Delivery
                </h3>

                <p className="text-sm text-gray-500">
                  On selected orders
                </p>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">

                <ShieldCheck size={24} />

              </div>

              <div>

                <h3 className="font-bold">
                  Secure Payment
                </h3>

                <p className="text-sm text-gray-500">
                  100% secure checkout
                </p>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">

                <Tag size={24} />

              </div>

              <div>

                <h3 className="font-bold">
                  Best Prices
                </h3>

                <p className="text-sm text-gray-500">
                  Great deals everyday
                </p>

              </div>

            </div>


            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">

                <Headphones size={24} />

              </div>

              <div>

                <h3 className="font-bold">
                  24/7 Support
                </h3>

                <p className="text-sm text-gray-500">
                  We're here to help
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      {categories.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex justify-between items-end mb-8">

            <div>

              <p className="text-blue-600 font-semibold mb-2">
                Explore
              </p>

              <h2 className="text-3xl font-extrabold text-gray-900">
                Shop By Category
              </h2>

            </div>

            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              View All
              <ArrowRight size={18} />
            </Link>

          </div>


          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            {categories.map((category, index) => (

              <Link
                key={index}
                to={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group relative h-52 rounded-2xl overflow-hidden bg-gray-200"
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 text-white">

                  <h3 className="text-xl font-bold">
                    {category.name}
                  </h3>

                  <p className="text-sm text-white/80 mt-1">
                    Explore Collection
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </section>

      )}


      {/* =====================================================
          PROMO BANNER
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute -left-20 -bottom-32 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative px-8 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Tag size={20} />

                <span className="font-semibold">
                  Limited Time Offer
                </span>

              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold">
                Great Deals Are Waiting
              </h2>

              <p className="text-blue-100 mt-3">
                Find your favorite products at prices you'll love.
              </p>

            </div>

            <Link
              to="/shop"
              className="shrink-0 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
            >
              Shop Deals
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}

      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-end mb-8">

            <div>

              <p className="text-blue-600 font-semibold mb-2">
                Our Collection
              </p>

              <h2 className="text-3xl font-extrabold text-gray-900">
                Featured Products
              </h2>

              <p className="text-gray-500 mt-2">
                Handpicked products just for you.
              </p>

            </div>

            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold"
            >
              View All
              <ArrowRight size={18} />
            </Link>

          </div>


          {loading ? (

            <Loader />

          ) : featuredProducts.length === 0 ? (

            <div className="text-center py-16">

              <ShoppingBag
                size={60}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-xl font-bold mt-5">
                No Products Available
              </h3>

              <p className="text-gray-500 mt-2">
                Products will appear here once added.
              </p>

            </div>

          ) : (

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {featuredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          POPULAR PRODUCTS
      ===================================================== */}

      {!loading && popularProducts.length > 0 && (

        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex justify-between items-end mb-8">

            <div>

              <p className="text-purple-600 font-semibold mb-2">
                Customer Favorites
              </p>

              <h2 className="text-3xl font-extrabold text-gray-900">
                Popular Products
              </h2>

            </div>

            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-blue-600 font-semibold"
            >
              Browse More
              <ArrowRight size={18} />
            </Link>

          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {popularProducts.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

          </div>

        </section>

      )}


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <ShoppingBag
            size={42}
            className="mx-auto mb-5"
          />

          <h2 className="text-3xl md:text-4xl font-extrabold">
            Ready to Start Shopping?
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Explore our complete collection and discover products
            you'll love.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3.5 rounded-xl font-bold transition"
          >
            Start Shopping

            <ArrowRight size={20} />

          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;

