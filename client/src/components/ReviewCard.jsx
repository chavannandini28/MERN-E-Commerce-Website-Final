
import {
  User,
  Trash2,
  Edit,
} from "lucide-react";

import Rating from "./Rating";

function ReviewCard({
  review,
  user,
  onDelete,
  onEdit,
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">

        <div className="flex items-center gap-3">

          {/* User Icon */}
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
            <User size={21} />
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-semibold text-gray-900">
              {review.name}
            </h3>

            <div className="mt-1">
              <Rating
                value={review.rating}
              />
            </div>
          </div>

        </div>

        {/* Actions */}
        {user?._id === review.user && (
          <div className="flex items-center gap-2">

            <button
              onClick={() => onEdit(review)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              title="Edit review"
            >
              <Edit size={17} />
            </button>

            <button
              onClick={() => onDelete(review._id)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
              title="Delete review"
            >
              <Trash2 size={17} />
            </button>

          </div>
        )}

      </div>

      {/* Review Comment */}
      <p className="mt-5 text-gray-700 leading-relaxed text-[15px]">
        {review.comment}
      </p>

      {/* Date */}
      <div className="mt-4 text-xs font-medium text-gray-400">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>

      {/* Verified Purchase */}
      {review.isVerifiedPurchase && (
        <span className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold border border-green-100">
          <span>✔</span>
          Verified Purchase
        </span>
      )}

    </div>
  );
}

export default ReviewCard;

