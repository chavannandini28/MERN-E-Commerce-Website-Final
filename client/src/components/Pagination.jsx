const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="
      flex
      justify-center
      items-center
      gap-2
      mt-10
      flex-wrap
      px-4
    ">

      {/* Previous */}

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`
          px-5
          py-2.5
          rounded-xl
          border
          font-medium
          text-sm
          transition-all
          duration-200
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm"
          }
        `}
      >
        ← Previous
      </button>


      {/* Page Numbers */}

      <div className="
        flex
        items-center
        gap-2
        bg-gray-50
        p-1.5
        rounded-2xl
        border
        border-gray-200
      ">

        {Array.from(
          { length: totalPages },
          (_, index) => (

            <button
              key={index}
              onClick={() =>
                onPageChange(index + 1)
              }
              className={`
                w-10
                h-10
                rounded-xl
                font-semibold
                text-sm
                transition-all
                duration-200

                ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                    : "bg-transparent text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                }
              `}
            >
              {index + 1}
            </button>

          )
        )}

      </div>


      {/* Next */}

      <button
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        className={`
          px-5
          py-2.5
          rounded-xl
          border
          font-medium
          text-sm
          transition-all
          duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm"
          }
        `}
      >
        Next →
      </button>

    </div>
  );
};

export default Pagination;