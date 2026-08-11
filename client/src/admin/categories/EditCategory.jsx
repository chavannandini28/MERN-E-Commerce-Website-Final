
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import CategoryForm from "./CategoryForm";

import {
  getCategory,
  updateCategory,
  clearCategoryError,
  clearSelectedCategory,
} from "../../redux/categorySlice";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedCategory,
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(id));

    return () => {
      dispatch(clearSelectedCategory());
      dispatch(clearCategoryError());
    };
  }, [dispatch, id]);

  const submitHandler = async (formData) => {
    const result = await dispatch(
      updateCategory({
        id,
        categoryData: formData,
      })
    );

    if (updateCategory.fulfilled.match(result)) {
      navigate("/admin/categories");
    }
  };

  if (loading && !selectedCategory) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-800">
              Loading Category
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while we load the category information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-8.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Edit Category
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update category information and image.
              </p>
            </div>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-700 shadow-sm">

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
                Unable to update category
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* Category Summary */}
        {selectedCategory && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

              {/* Image */}
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {selectedCategory.image?.url ? (
                  <img
                    src={selectedCategory.image.url}
                    alt={selectedCategory.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-7h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Currently Editing
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedCategory.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update the category details below and save your changes.
                </p>
              </div>

              {/* ID */}
              <div className="rounded-xl bg-indigo-50 px-4 py-3">
                <p className="text-xs font-medium text-indigo-500">
                  Category ID
                </p>

                <p className="mt-1 text-xs font-semibold text-indigo-700">
                  {selectedCategory._id?.slice(-8)}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Form Card */}
        {selectedCategory && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Card Header */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-white text-indigo-600 shadow-sm">
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-8.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"
                    />
                  </svg>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Category Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Modify the information and image for this category.
                  </p>
                </div>

              </div>
            </div>

            {/* Form */}
            <div className="p-5 sm:p-7">
              <CategoryForm
                initialData={selectedCategory}
                onSubmit={submitHandler}
                loading={loading}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default EditCategory;

