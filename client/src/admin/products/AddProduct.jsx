
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createProduct,
  getCategories,
  getBrands,
} from "../../redux/adminSlice";

import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categories = [],
    brands = [],
    loading,
    error,
  } = useSelector((state) => state.admin);

  const [thumbnail, setThumbnail] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    console.log("Category API DATA", categories);
    console.log("Brand API DATA", brands);
  }, [categories, brands]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    const result = await dispatch(createProduct(data));

    if (createProduct.fulfilled.match(result)) {
      navigate("/admin/products");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-5xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-7">

          <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="font-medium text-indigo-600">
              Add Product
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new product and add it to your store.
          </p>

        </div>

        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

            <span className="text-lg">
              ⚠️
            </span>

            <div>
              <p className="font-semibold">
                Unable to create product
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* =========================
            FORM CARD
        ========================= */}

        <form
          onSubmit={submitHandler}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Card Header */}

          <div className="border-b border-slate-100 bg-white px-5 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📦
              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  Product Information
                </h2>

                <p className="text-sm text-slate-400">
                  Enter the details of your new product.
                </p>

              </div>

            </div>

          </div>

          <div className="space-y-7 p-5 sm:p-7">

            {/* =========================
                BASIC INFORMATION
            ========================= */}

            <section>

              <div className="mb-5">

                <h3 className="text-base font-bold text-slate-800">
                  Basic Information
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Add the product name and descriptions.
                </p>

              </div>

              {/* Product Title */}

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Title
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                  placeholder="Enter product title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  required
                />

              </div>

              {/* Description */}

              <div className="mb-5">

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                  placeholder="Write a detailed product description..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  required
                />

              </div>

              {/* Short Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Short Description
                </label>

                <textarea
                  rows="3"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={changeHandler}
                  placeholder="Enter a short product summary..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

              </div>

            </section>

            {/* Divider */}

            <div className="border-t border-slate-100" />

            {/* =========================
                CATEGORY & BRAND
            ========================= */}

            <section>

              <div className="mb-5">

                <h3 className="text-base font-bold text-slate-800">
                  Category & Brand
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Choose where this product belongs.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* Category */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={changeHandler}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    required
                  >

                    <option value="">
                      Select Category
                    </option>

                    {categories?.map((cat) => (
                      <option
                        key={cat._id}
                        value={cat._id}
                      >
                        {cat.name}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Brand */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Brand
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={changeHandler}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    required
                  >

                    <option value="">
                      Select Brand
                    </option>

                    {brands?.map((brand) => (
                      <option
                        key={brand._id}
                        value={brand._id}
                      >
                        {brand.name}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

            </section>

            {/* Divider */}

            <div className="border-t border-slate-100" />

            {/* =========================
                PRICING & INVENTORY
            ========================= */}

            <section>

              <div className="mb-5">

                <h3 className="text-base font-bold text-slate-800">
                  Pricing & Inventory
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Set product pricing and available stock.
                </p>

              </div>

              <div className="grid gap-5 md:grid-cols-3">

                {/* Price */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Price
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={changeHandler}
                      placeholder="0"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                      required
                    />

                  </div>

                </div>

                {/* Discount Price */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Discount Price
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={changeHandler}
                      placeholder="0"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />

                  </div>

                </div>

                {/* Stock */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Stock
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={changeHandler}
                    placeholder="0"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    required
                  />

                </div>

              </div>

            </section>

            {/* Divider */}

            <div className="border-t border-slate-100" />

            {/* =========================
                THUMBNAIL
            ========================= */}

            <section>

              <div className="mb-5">

                <h3 className="text-base font-bold text-slate-800">
                  Product Thumbnail
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Upload a clear image for your product.
                </p>

              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40">

                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                  🖼️
                </div>

                <p className="font-semibold text-slate-700">
                  {thumbnail
                    ? thumbnail.name
                    : "Choose product image"}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG or JPEG
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setThumbnail(
                      e.target.files[0]
                    )
                  }
                  className="hidden"
                />

              </label>

            </section>

          </div>

          {/* =========================
              FOOTER ACTIONS
          ========================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-7">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Creating..."
                : "Create Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;

