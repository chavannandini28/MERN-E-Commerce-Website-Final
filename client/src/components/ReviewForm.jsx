
import { useState } from "react";
import { Star } from "lucide-react";

function ReviewForm({
  onSubmit,
  loading,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select rating");
      return;
    }

    if (!comment.trim()) {
      alert("Please write review");
      return;
    }

    onSubmit({
      rating,
      comment,
    });

    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          Write a Review
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Share your experience with this product
        </p>
      </div>

      {/* Star Rating */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Your Rating
        </p>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="p-1 rounded-md hover:bg-yellow-50 transition-all duration-200"
            >
              <Star
                size={30}
                strokeWidth={1.8}
                className={`transition-all duration-200 ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400 scale-105"
                    : "text-gray-300 hover:text-yellow-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Review
        </label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 resize-none outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          rows="4"
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        className="mt-5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

export default ReviewForm;

