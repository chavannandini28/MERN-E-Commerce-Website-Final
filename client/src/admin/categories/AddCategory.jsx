
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CategoryForm from "./CategoryForm";

import {
  createCategory,
  clearCategoryError,
} from "../../redux/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loading,
    error,
    categories,
  } = useSelector((state) => state.category);

  const submitHandler = async (formData) => {
    const result = await dispatch(createCategory(formData));

    if (createCategory.fulfilled.match(result)) {
      navigate("/admin/categories");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearCategoryError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Add Category
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new product category for your store.
              </p>
            </div>
          </div>
        </div>

        {/* Category Stats */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Existing Categories
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {categories?.length || 0}
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
              Ready
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Add a new category below
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-700 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mt-0.5 flex-shrink-0"
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
                Unable to create category
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Card Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm border border-indigo-100">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Category Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the details for your new category.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-7">
            <CategoryForm
              onSubmit={submitHandler}
              loading={loading}
            />
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Make sure the category information is correct before saving.
        </div>

      </div>
    </div>
  );
};

export default AddCategory;

