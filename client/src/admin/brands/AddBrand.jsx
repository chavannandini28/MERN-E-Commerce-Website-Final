import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BrandForm from "./BrandForm";

import {
  createBrand,
  clearBrandError,
} from "../../redux/brandSlice";

const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.brand);

  const submitHandler = async (formData) => {
    const result = await dispatch(createBrand(formData));

    if (createBrand.fulfilled.match(result)) {
      navigate("/admin/brands");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(clearBrandError());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Add Brand
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Create a new brand for your store
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
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
              <p className="font-semibold text-sm">Unable to add brand</p>
              <p className="text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 sm:px-7 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Brand Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the details below to create your brand.
            </p>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-7">
            <BrandForm
              onSubmit={submitHandler}
              loading={loading}
            />
          </div>
        </div>

        {/* Bottom hint */}
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          Make sure the brand information is correct before submitting.
        </div>

      </div>
    </div>
  );
};

export default AddBrand;