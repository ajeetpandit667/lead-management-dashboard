import React from 'react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) {
    return null;
  }

  const pages = [];
  for (let i = 1; i <= pagination.pages; i++) {
    pages.push(i);
  }

  // Show only 5 page numbers at a time
  let startPage = Math.max(1, pagination.page - 2);
  let endPage = Math.min(pagination.pages, startPage + 4);
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  return (
    <div className="pagination">
      <button
        disabled={pagination.page === 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        ← Previous
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pages.slice(startPage - 1, endPage).map((page) => (
        <button
          key={page}
          className={pagination.page === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {endPage < pagination.pages && (
        <>
          {endPage < pagination.pages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(pagination.pages)}>
            {pagination.pages}
          </button>
        </>
      )}

      <button
        disabled={pagination.page === pagination.pages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Next →
      </button>

      <span>Page {pagination.page} of {pagination.pages}</span>
    </div>
  );
}
