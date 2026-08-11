
import {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../redux/adminSlice";

import {
  getCategories,
} from "../../redux/categorySlice";

import {
  getBrands,
} from "../../redux/brandSlice";

function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedProduct,
    loading,
  } = useSelector(
    (state) => state.admin
  );

  const {
    categories = [],
  } = useSelector(
    (state) => state.category
  );

  const {
    brands = [],
  } = useSelector(
    (state) => state.brand
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
    brand: "",
    thumbnail: "",
    images: [],
    variants: [
      {
        size: "",
        color: "",
        stock: "",
      },
    ],
    specifications: [
      {
        key: "",
        value: "",
      },
    ],
  });

  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getCategories());
    dispatch(getBrands());
  }, [dispatch, id]);

  // ===============================
  // SET PRODUCT DATA
  // ===============================

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        title: selectedProduct.title || "",
        description:
          selectedProduct.description || "",
        price: selectedProduct.price || "",
        discountPrice:
          selectedProduct.discountPrice || "",
        stock: selectedProduct.stock || "",
        category:
          selectedProduct.category?._id || "",
        brand:
          selectedProduct.brand?._id || "",
        thumbnail:
          selectedProduct.thumbnail?.url || "",
        images:
          selectedProduct.images || [],
        variants:
          selectedProduct.variants?.length
            ? selectedProduct.variants
            : [
                {
                  size: "",
                  color: "",
                  stock: "",
                },
              ],
        specifications:
          selectedProduct.specifications?.length
            ? selectedProduct.specifications
            : [
                {
                  key: "",
                  value: "",
                },
              ],
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // VARIANT CHANGE
  // ===============================

  const variantChange = (index, e) => {
    const data = [...form.variants];

    data[index][e.target.name] =
      e.target.value;

    setForm({
      ...form,
      variants: data,
    });
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        {
          size: "",
          color: "",
          stock: "",
        },
      ],
    });
  };

  // ===============================
  // SPECIFICATION
  // ===============================

  const specificationChange = (
    index,
    e
  ) => {
    const data = [
      ...form.specifications,
    ];

    data[index][e.target.name] =
      e.target.value;

    setForm({
      ...form,
      specifications: data,
    });
  };

  const addSpecification = () => {
    setForm({
      ...form,
      specifications: [
        ...form.specifications,
        {
          key: "",
          value: "",
        },
      ],
    });
  };

  // ===============================
  // SUBMIT
  // ===============================

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        id,
        productData: form,
      })
    ).then(() => {
      navigate("/admin/products");
    });
  };

  // ===============================
  // LOADING
  // ===============================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">

        <div className="flex min-h-[500px] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-4 h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <h2 className="font-semibold text-slate-700">
              Loading Product...
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Please wait while product details are loaded.
            </p>

          </div>

        </div>

      </div>
    );
  }

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
              Edit Product
            </span>

          </div>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Edit Product
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update product information, pricing,
                variants and specifications.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/products")
              }
              className="w-fit rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100"
            >
              ← Back to Products
            </button>

          </div>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={submitHandler}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                ✏️
              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  Basic Information
                </h2>

                <p className="text-sm text-slate-400">
                  Update the main product details.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Title
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="5"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

              </div>

            </div>

          </section>

          <div className="border-t border-slate-100" />

          {/* =========================
              PRICING
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-bold text-slate-900">
                Pricing & Inventory
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Manage product price and available stock.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {/* Price */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                    ₹
                  </span>

                  <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />

                </div>

              </div>

              {/* Discount */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Discount Price
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                    ₹
                  </span>

                  <input
                    name="discountPrice"
                    value={form.discountPrice}
                    onChange={handleChange}
                    placeholder="Discount Price"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />

                </div>

              </div>

              {/* Stock */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Stock
                </label>

                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

              </div>

            </div>

          </section>

          <div className="border-t border-slate-100" />

          {/* =========================
              CATEGORY & BRAND
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-bold text-slate-900">
                Category & Brand
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Update the product classification.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                >

                  <option value="">
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option
                      key={cat._id}
                      value={cat._id}
                    >
                      {cat.name}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Brand
                </label>

                <select
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                >

                  <option value="">
                    Select Brand
                  </option>

                  {brands.map((brand) => (
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

          <div className="border-t border-slate-100" />

          {/* =========================
              THUMBNAIL
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6">

              <h2 className="font-bold text-slate-900">
                Product Thumbnail
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Update the product thumbnail URL.
              </p>

            </div>

            <div className="grid gap-6 md:grid-cols-[160px_1fr] md:items-center">

              {/* Preview */}

              <div className="flex justify-center">

                {form.thumbnail ? (

                  <img
                    src={form.thumbnail}
                    alt={form.title}
                    className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-sm"
                  />

                ) : (

                  <div className="flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-3xl">
                    🖼️
                  </div>

                )}

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Thumbnail URL
                </label>

                <input
                  name="thumbnail"
                  value={form.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

              </div>

            </div>

          </section>

          <div className="border-t border-slate-100" />

          {/* =========================
              VARIANTS
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <h2 className="font-bold text-slate-900">
                  Product Variants
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add size, color and stock variations.
                </p>

              </div>

              <button
                type="button"
                onClick={addVariant}
                className="w-fit rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                + Add Variant
              </button>

            </div>

            <div className="space-y-4">

              {form.variants.map(
                (variant, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >

                    <div className="mb-3 flex items-center justify-between">

                      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Variant {index + 1}
                      </span>

                    </div>

                    <div className="grid gap-4 md:grid-cols-3">

                      <input
                        name="size"
                        value={variant.size}
                        onChange={(e) =>
                          variantChange(
                            index,
                            e
                          )
                        }
                        placeholder="Size"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />

                      <input
                        name="color"
                        value={variant.color}
                        onChange={(e) =>
                          variantChange(
                            index,
                            e
                          )
                        }
                        placeholder="Color"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />

                      <input
                        name="stock"
                        value={variant.stock}
                        onChange={(e) =>
                          variantChange(
                            index,
                            e
                          )
                        }
                        placeholder="Stock"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

          <div className="border-t border-slate-100" />

          {/* =========================
              SPECIFICATIONS
          ========================= */}

          <section className="p-5 sm:p-7">

            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <h2 className="font-bold text-slate-900">
                  Specifications
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Add technical or product specifications.
                </p>

              </div>

              <button
                type="button"
                onClick={addSpecification}
                className="w-fit rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                + Add Specification
              </button>

            </div>

            <div className="space-y-4">

              {form.specifications.map(
                (spec, index) => (

                  <div
                    key={index}
                    className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2"
                  >

                    <div>

                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Specification Name
                      </label>

                      <input
                        name="key"
                        value={spec.key}
                        onChange={(e) =>
                          specificationChange(
                            index,
                            e
                          )
                        }
                        placeholder="e.g. Material"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />

                    </div>

                    <div>

                      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Value
                      </label>

                      <input
                        name="value"
                        value={spec.value}
                        onChange={(e) =>
                          specificationChange(
                            index,
                            e
                          )
                        }
                        placeholder="e.g. Stainless Steel"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </section>

          {/* =========================
              FOOTER
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
              className="rounded-xl bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;

