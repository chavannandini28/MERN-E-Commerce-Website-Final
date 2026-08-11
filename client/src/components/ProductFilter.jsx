import {
  Search,
  Tag,
  Layers,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

const ProductFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  sort,
  setSort,
  categories,
  brands,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  resetFilters,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 space-y-6 sticky top-24">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <SlidersHorizontal size={20} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Filters
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Refine your products
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Search size={16} className="text-blue-600" />
          Search
        </label>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Layers size={16} className="text-blue-600" />
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">All Categories</option>

          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <Tag size={16} className="text-blue-600" />
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">All Brands</option>

          {brands.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <span className="text-blue-600 font-bold">₹</span>
          Price Range
        </label>

        <div className="flex gap-3">
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              ₹
            </span>

            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-3 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              ₹
            </span>

            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-3 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <SlidersHorizontal size={16} className="text-blue-600" />
          Sort Products
        </label>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none cursor-pointer transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">Newest</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 hover:border-red-500 py-3 rounded-xl font-semibold transition-all duration-300"
      >
        <RotateCcw size={17} />
        Clear Filters
      </button>

    </div>
  );
};

export default ProductFilter;