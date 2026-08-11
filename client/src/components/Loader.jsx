const Loader = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            overflow-hidden
            animate-pulse
          "
        >
          {/* Image Skeleton */}
          <div className="h-64 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"></div>

          {/* Content Skeleton */}
          <div className="p-5 space-y-4">

            {/* Category */}
            <div className="h-3 bg-gray-200 rounded-full w-1/4"></div>

            {/* Product Title */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
            </div>

            {/* Rating */}
            <div className="flex gap-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </div>

            {/* Price */}
            <div className="h-7 bg-gray-200 rounded-lg w-2/5"></div>

            {/* Button */}
            <div className="h-11 bg-gray-200 rounded-xl w-full"></div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;