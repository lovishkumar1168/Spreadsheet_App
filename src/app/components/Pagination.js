"use client";

import { useState } from 'react';
import Grid from './Grid';

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 100;
  const totalPages = Math.ceil(1000 / pageSize); // Assuming we have 1000 cells.

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (e) => {
    const pageNumber = parseInt(e.target.value, 10) - 1;
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <Grid currentPage={currentPage} pageSize={pageSize} />

      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} className="p-2 bg-gray-200">Previous</button>

        <div className="flex items-center space-x-2">
          <span>Page</span>
          <input
            type="number"
            value={currentPage + 1}
            onChange={handlePageChange}
            className="w-12 text-center p-1 border"
            min="1"
            max={totalPages}
          />
          <span>of {totalPages}</span>
        </div>

        <button onClick={handleNextPage} className="p-2 bg-gray-200">Next</button>
      </div>
    </div>
  );
}