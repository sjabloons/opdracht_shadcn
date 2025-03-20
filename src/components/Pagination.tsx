import { PaginationProps } from "@/types";
import { useEffect } from "react";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(1);
    }
  }, [totalPages, currentPage, onPageChange]);
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= maxVisiblePages) {
      pages.push(...Array.from({ length: maxVisiblePages }, (_, i) => i + 1));
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - maxVisiblePages + 1) {
      pages.push(1, "...");
      pages.push(
        ...Array.from(
          { length: maxVisiblePages },
          (_, i) => totalPages - maxVisiblePages + i + 1,
        ),
      );
    } else {
      pages.push(1, "...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...", totalPages);
    }
    return pages;
  };
  console.log(getPageNumbers());

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(totalPages - totalPages + 1)}
        disabled={currentPage === 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Previous
      </button>

      <p>
        Page {currentPage} of {totalPages}
      </p>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Next
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded border px-3 py-1 disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};
export default Pagination;
