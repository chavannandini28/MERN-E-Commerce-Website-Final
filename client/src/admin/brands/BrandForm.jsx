
import { useState, useEffect } from "react";

function BrandForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    country: "",
    logo: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        website: initialData.website || "",
        country: initialData.country || "",
        logo: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData((prev) => ({
        ...prev,
        logo: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("country", formData.country);

    if (formData.logo) {
      data.append("logo", formData.logo);
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      {/* Brand Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Brand Name
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Apple"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
        />

        <p className="mt-1.5 text-xs text-slate-400">
          Enter the official brand name.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Description
        </label>

        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short description about this brand..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
        />

        <p className="mt-1.5 text-xs text-slate-400">
          A short description helps customers understand the brand.
        </p>
      </div>

      {/* Website + Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Website
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              🌐
            </span>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Country
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              📍
            </span>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="e.g. USA"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 hover:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Brand Logo
        </label>

        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-300 hover:bg-indigo-50/30">
          <div className="flex flex-col sm:flex-row items-center gap-5">

            {/* Existing Logo */}
            {initialData?.logo?.url ? (
              <div className="flex-shrink-0">
                <div className="h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={initialData.logo.url}
                    alt="Brand"
                    className="h-full w-full object-contain p-2"
                  />
                </div>

                <p className="text-center text-xs text-slate-400 mt-2">
                  Current logo
                </p>
              </div>
            ) : (
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.7}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-7h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Upload Input */}
            <div className="flex-1 w-full">
              <label
                htmlFor="brand-logo"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-indigo-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16V4m0 0L8 8m4-4l4 4M5 20h14a2 2 0 002-2v-3a2 2 0 00-2-2h-1m-12 0H5a2 2 0 00-2 2v3a2 2 0 002 2z"
                  />
                </svg>

                <span className="text-sm font-medium text-slate-700">
                  Choose a logo
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </span>

                <input
                  id="brand-logo"
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>

              {formData.logo && (
                <p className="mt-2 text-xs text-indigo-600 font-medium">
                  Selected: {formData.logo.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-xs text-slate-400">
            Fields marked with <span className="text-red-500">*</span> are
            required.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-indigo-600"
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Save Brand
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default BrandForm;

