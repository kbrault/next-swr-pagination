import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  maxVisiblePages : number
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages, prevPage, nextPage, maxVisiblePages }) => {
  const generatePageButtons = () => {
    const pageButtons = [];

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (endPage < maxVisiblePages && totalPages > maxVisiblePages) {
      endPage = maxVisiblePages;
    }

    if (startPage > 1) {
      pageButtons.push(
        <React.Fragment key={1}>
          <button onClick={() => setPage(1)} className="mx-1 py-2 px-2 bg-gray-200 text-gray-700">
            1
          </button>
          <span className="mx-1 py-2 px-2">...</span>
        </React.Fragment>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`mx-1 py-2 px-2 ${i === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(
        <React.Fragment key={totalPages}>
          <span className="mx-1 py-2 px-2">...</span>
          <button onClick={() => setPage(totalPages)} className="mx-1 py-2 px-2 bg-gray-200 text-gray-700">
            {totalPages}
          </button>
        </React.Fragment>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-between mt-4">
      <button onClick={prevPage} disabled={page === 1} className="bg-blue-500 text-white py-2 px-2 disabled:bg-gray-300 disabled:text-gray-700">
        Previous
      </button>
      <div>
        {generatePageButtons()}
      </div>
      <button onClick={nextPage} disabled={page === totalPages} className="bg-blue-500 text-white py-2 px-2 disabled:bg-gray-300 disabled:text-gray-700">
        Next
      </button>
    </div>
  );
};

export default Pagination;
