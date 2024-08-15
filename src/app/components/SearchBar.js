// src/app/components/SearchBar.js
"use client";
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const search = useSpreadsheetStore((state) => state.search);
  const resetSearch = useSpreadsheetStore((state) => state.resetSearch);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    search(e.target.value);
  };

  const handleReset = () => {
    setQuery('');
    resetSearch();
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search cells..."
        className="p-2 border w-full"
      />
      <button
        onClick={handleReset}
        className="ml-2 p-2 bg-gray-300 rounded"
      >
        Clear
      </button>
    </div>
  );
}