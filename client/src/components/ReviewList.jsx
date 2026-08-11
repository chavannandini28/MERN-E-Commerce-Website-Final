
import ReviewCard from "./ReviewCard";

function ReviewList({
  reviews,
  user,
  onDelete,
  onEdit,
}) {
  return (
    <div className="space-y-5 mt-6">
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white border border-gray-100 rounded-2xl text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <span className="text-2xl">💬</span>
          </div>

          <p className="text-gray-700 font-semibold text-base">
            No reviews yet
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Be the first to share your experience.
          </p>
        </div>
      ) : (
        reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            user={user}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default ReviewList;

