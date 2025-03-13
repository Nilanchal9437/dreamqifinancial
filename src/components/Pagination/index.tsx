import React from "react";

interface PaginationProps {
  total: number;
  limit: number;
  startingAfter: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  total,
  limit,
  startingAfter,
  onChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        className={`px-3 py-2 text-sm font-medium border rounded-md transition ${
          startingAfter === 1
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "hover:bg-gray-200"
        }`}
        disabled={startingAfter === 1}
        onClick={() => onChange(startingAfter - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`px-3 py-2 text-sm font-medium border rounded-md transition ${
              startingAfter === pageNumber
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className={`px-3 py-2 text-sm font-medium border rounded-md transition ${
          startingAfter === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "hover:bg-gray-200"
        }`}
        disabled={startingAfter === totalPages}
        onClick={() => onChange(startingAfter + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
