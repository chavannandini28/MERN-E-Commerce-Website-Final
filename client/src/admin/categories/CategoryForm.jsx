
import { useState, useEffect } from "react";

const CategoryForm = ({
  initialData = {},
  onSubmit,
  loading,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setPreview(initialData.image?.url || "");
    }
  }, [initialData]);

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    if (image) {
      formData.append("image", image);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-7"
    >
      {/* Category Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Category Name
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Electronics"
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <p className="mt-1.5 text-xs text-slate-400">
          Enter a clear name for your product category.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Description
        </label>

        <textarea
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about this category..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <p className="mt-1.5 text-xs text-slate-400">
          Give customers a brief overview of this category.
        </p>
      </div>

      {/* Category Image */}
      <div>
        <label className="block text-sm font-semibold text-slate-800 mb-2">
          Category Image
        </label>

        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 transition hover:border-indigo-300 hover:bg-indigo-50/30">
          <div className="flex flex-col md:flex-row gap-5 items-center">

            {/* Image Preview */}
            <div className="flex-shrink-0">
              {preview ? (
                <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1 text-center text-[11px] font-medium text-white">
                    Preview
                  </div>
                </div>
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-9 w-9"
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

                    <p className="mt-2 text-xs">
                      No image
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Area */}
            <div className="w-full flex-1">
              <label
                htmlFor="category-image"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                </div>

                <span className="mt-3 text-sm font-semibold text-slate-700">
                  Upload category image
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  Click to browse from your device
                </span>

                <span className="mt-2 text-[11px] text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </span>

                <input
                  id="category-image"
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  className="hidden"
                />
              </label>

              {image && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
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

                  <p className="truncate text-xs font-medium text-indigo-700">
                    {image.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider + Submit */}
      <div className="border-t border-slate-100 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-xs text-slate-400">
            Fields marked with{" "}
            <span className="text-red-500">*</span>{" "}
            are required.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
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

                Save Category
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;

