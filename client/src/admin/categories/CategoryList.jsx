
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../../redux/categorySlice";

const CategoryList = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const deleteHandler = (id) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    dispatch(deleteCategory(id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Category Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage product categories and their products
              </p>
            </div>
          </div>

          <Link
            to="/admin/categories/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <span className="text-lg leading-none">+</span>
            Add Category
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Categories
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {categories.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Category Status
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {categories.length > 0 ? "Active" : "Empty"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Catalog
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {categories.length > 0 ? "Ready" : "No Data"}
            </p>
          </div>

        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-6">
            <h3 className="text-lg font-semibold text-slate-900">
              All Categories
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              View, edit, and manage your product categories.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading categories...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="m-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-0.5 h-5 w-5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m0 3h.008M10.29 3.86l-7.82 13.5A1.5 1.5 0 003.77 19.5h16.46a1.5 1.5 0 001.3-2.25l-7.82-13.5a1.5 1.5 0 00-2.6 0z"
                />
              </svg>

              <div>
                <p className="text-sm font-semibold">
                  Unable to load categories
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Table */}
          {!loading && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Image
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Description
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Products
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {categories.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-5 py-16 text-center"
                      >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                        </div>

                        <h4 className="mt-4 text-base font-semibold text-slate-800">
                          No Categories Found
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          Start by adding your first product category.
                        </p>

                        <Link
                          to="/admin/categories/add"
                          className="mt-5 inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Add Your First Category
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr
                        key={category._id}
                        className="group transition hover:bg-slate-50"
                      >

                        {/* Image */}
                        <td className="px-5 py-4">
                          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <img
                              src={
                                category.image?.url ||
                                "https://via.placeholder.com/60"
                              }
                              alt={category.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Name */}
                        <td className="px-5 py-4">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Category ID: {category._id?.slice(-6)}
                            </p>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="max-w-xs px-5 py-4">
                          <p className="line-clamp-2 text-sm text-slate-600">
                            {category.description || "No description available"}
                          </p>
                        </td>

                        {/* Products */}
                        <td className="px-5 py-4">
                          <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
                            {category.productCount || 0}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">

                            <Link
                              to={`/admin/categories/edit/${category._id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-8.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"
                                />
                              </svg>

                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                deleteHandler(category._id)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-9 0h14"
                                />
                              </svg>

                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  )}

                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!loading && categories.length > 0 && (
            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {categories.length}
                </span>{" "}
                {categories.length === 1 ? "category" : "categories"}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CategoryList;

