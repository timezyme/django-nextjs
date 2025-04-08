// components/Pagination.tsx
'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-8 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded-md bg-surface-200 hover:bg-surface-300 transition-colors"
        >
          Previous
        </button>
      )}
      
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded-md bg-surface-200 hover:bg-surface-300 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
}