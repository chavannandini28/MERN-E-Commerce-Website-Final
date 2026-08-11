
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, Search, PackageOpen } from "lucide-react";

import { getProducts } from "../redux/productSlice";

import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

const Shop = () => {
  const dispatch = useDispatch();

  const { products, loading } = useSelector(
    (state) => state.product
  );

  // ============================
  // Filters
  // ============================

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ============================
  // Pagination
  // ============================

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 9;

  // ============================
  // Fetch Products
  // ============================

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ============================
  // Reset Pagination When Filters Change
  // ============================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    category,
    brand,
    sort,
    minPrice,
    maxPrice,
  ]);

  // ============================
  // Categories
  // ============================

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((item) => item.category?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ============================
  // Brands
  // ============================

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((item) => item.brand?.name)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // ============================
  // Filter Products
  // ============================

  let filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category
      ? product.category?.name === category
      : true;

    const matchBrand = brand
      ? product.brand?.name === brand
      : true;

    const matchMinPrice =
      minPrice === ""
        ? true
        : product.price >= Number(minPrice);

    const matchMaxPrice =
      maxPrice === ""
        ? true
        : product.price <= Number(maxPrice);

    return (
      matchSearch &&
      matchCategory &&
      matchBrand &&
      matchMinPrice &&
      matchMaxPrice
    );
  });

  // ============================
  // Sorting
  // ============================

  switch (sort) {
    case "low":
      filteredProducts.sort(
        (a, b) => a.price - b.price
      );
      break;

    case "high":
      filteredProducts.sort(
        (a, b) => b.price - a.price
      );
      break;

    case "az":
      filteredProducts.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    case "za":
      filteredProducts.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      break;

    default:
      break;
  }

  // ============================
  // Pagination
  // ============================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const indexOfLastProduct =
    currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

  // ============================
  // Reset Filters
  // ============================

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  // ============================
  // Active Filter Count
  // ============================

  const activeFilterCount = [
    search,
    category,
    brand,
    minPrice,
    maxPrice,
    sort,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============================
          HERO SECTION
      ============================ */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-14 md:py-20">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-sm font-medium text-white mb-5 backdrop-blur-sm">

              <PackageOpen size={17} />

              Explore Our Collection

            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">

              Shop Products

            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl leading-8 text-blue-100">

              Discover amazing products at the best prices.
              Find exactly what you need with powerful
              filters and easy shopping.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white backdrop-blur-sm">

                <PackageOpen size={20} />

                <span className="font-semibold">
                  {products.length}+ Products
                </span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white backdrop-blur-sm">

                <Search size={20} />

                <span className="font-semibold">
                  Easy Search
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================
          MAIN CONTENT
      ============================ */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">

        <div className="grid lg:grid-cols-4 gap-7 lg:gap-8">

          {/* ============================
              FILTER SIDEBAR
          ============================ */}

          <aside className="lg:col-span-1">

            <div className="lg:sticky lg:top-24">

              <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                  <SlidersHorizontal
                    size={20}
                    className="text-blue-600"
                  />

                  <h2 className="text-lg font-bold text-gray-800">
                    Filters
                  </h2>

                </div>

                {activeFilterCount > 0 && (
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}

              </div>

              <ProductFilter
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                sort={sort}
                setSort={setSort}
                categories={categories}
                brands={brands}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                resetFilters={resetFilters}
              />

            </div>

          </aside>

          {/* ============================
              PRODUCTS SECTION
          ============================ */}

          <main className="lg:col-span-3">

            {/* Header */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <p className="text-sm text-gray-500 mb-1">
                    Browse our collection
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">

                    Products

                    <span className="ml-2 text-blue-600">
                      ({filteredProducts.length})
                    </span>

                  </h2>

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2.5 rounded-xl">

                  <PackageOpen size={17} />

                  Showing{" "}
                  {currentProducts.length} products

                </div>

              </div>

            </div>

            {/* ============================
                ACTIVE FILTERS
            ============================ */}

            {activeFilterCount > 0 && (

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-6">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="text-sm font-semibold text-gray-600 mr-1">
                    Active filters:
                  </span>

                  {search && (
                    <span className="bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      Search: {search}
                    </span>
                  )}

                  {category && (
                    <span className="bg-green-50 border border-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      {category}
                    </span>
                  )}

                  {brand && (
                    <span className="bg-purple-50 border border-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      {brand}
                    </span>
                  )}

                  {minPrice && (
                    <span className="bg-yellow-50 border border-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      Min ₹{minPrice}
                    </span>
                  )}

                  {maxPrice && (
                    <span className="bg-orange-50 border border-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium">
                      Max ₹{maxPrice}
                    </span>
                  )}

                  <button
                    onClick={resetFilters}
                    className="ml-auto text-sm font-semibold text-red-500 hover:text-red-600 transition"
                  >
                    Clear All
                  </button>

                </div>

              </div>

            )}

            {/* ============================
                LOADING
            ============================ */}

            {loading ? (

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center">

                <Loader />

              </div>

            ) : filteredProducts.length === 0 ? (

              /* ============================
                  EMPTY STATE
              ============================ */

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 sm:p-16 text-center">

                <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                  <Search
                    size={34}
                    className="text-blue-500"
                  />

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-6">

                  No Products Found

                </h2>

                <p className="text-gray-500 mt-3 max-w-md mx-auto">

                  We couldn't find products matching
                  your current filters. Try changing
                  your search or clearing the filters.

                </p>

                <button
                  onClick={resetFilters}
                  className="mt-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl transition shadow-md hover:shadow-lg"
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <>
                {/* Product Grid */}

                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">

                  {currentProducts.map((product) => (

                    <div
                      key={product._id}
                      className="group"
                    >

                      <ProductCard
                        product={product}
                      />

                    </div>

                  ))}

                </div>

                {/* Pagination */}

                {totalPages > 1 && (

                  <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />

                  </div>

                )}

              </>

            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default Shop;
