
import Rating from "./Rating";

function ReviewSummary({
  averageRating,
  totalReviews,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Customer Reviews
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          See what customers are saying
        </p>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-6">

        {/* Average Rating */}
        <div className="flex items-center justify-center min-w-[90px]">
          <span className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {averageRating}
          </span>
        </div>

        {/* Stars + Reviews */}
        <div className="border-l border-gray-100 pl-6">
          <Rating
            value={averageRating}
            reviews={totalReviews}
            size={22}
          />

          <p className="text-sm text-gray-500 mt-2">
            {totalReviews} customer ratings
          </p>
        </div>

      </div>
    </div>
  );
}

export default ReviewSummary;
