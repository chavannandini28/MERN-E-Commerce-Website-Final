
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BrandForm from "./BrandForm";

import {
  getBrand,
  updateBrand,
  clearBrandError,
  clearSelectedBrand,
} from "../../redux/brandSlice";

const EditBrand = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedBrand,
    loading,
    error,
  } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrand(id));

    return () => {
      dispatch(clearSelectedBrand());
      dispatch(clearBrandError());
    };
  }, [dispatch, id]);

  const submitHandler = async (formData) => {
    const result = await dispatch(
      updateBrand({
        id,
        brandData: formData,
      })
    );

    if (updateBrand.fulfilled.match(result)) {
      navigate("/admin/brands");
    }
  };

  if (loading && !selectedBrand) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex min-h-[420px] flex-col items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-800">
                Loading Brand
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Please wait while we load the brand information...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.5-8.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 8.5-8.5z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Edit Brand
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Update your brand information and logo
              </p>
            </div>
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
                Unable to update brand
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Brand Info Summary */}
        {selectedBrand && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {selectedBrand.logo?.url ? (
                  <img
                    src={selectedBrand.logo.url}
                    alt={selectedBrand.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.7}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 12h16M4 17h16"
                    />
                  </svg>
                )}
              </div>

              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Currently Editing
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedBrand.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Make your changes below and save them when you're finished.
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 px-4 py-3">
                <p className="text-xs font-medium text-indigo-500">
                  Brand ID
                </p>

                <p className="mt-1 text-xs font-semibold text-indigo-700">
                  {selectedBrand._id?.slice(-8)}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* Form Card */}
        {selectedBrand && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-5 py-5 sm:px-7">
              <h2 className="text-lg font-semibold text-slate-900">
                Brand Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the details below and save your changes.
              </p>
            </div>

            <div className="p-5 sm:p-7">
              <BrandForm
                initialData={selectedBrand}
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

export default EditBrand;
