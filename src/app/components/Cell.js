"use client";

import { useState, useRef } from 'react';
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';

export default function Cell({ index, value }) {
  const updateCell = useSpreadsheetStore((state) => state.updateCell);
  const updateAlignment = useSpreadsheetStore((state) => state.updateAlignment);
  const updateFontSize = useSpreadsheetStore((state) => state.updateFontSize);
  const [alignment, setAlignment] = useState(value.alignment);
  const inputRef = useRef(null);

  const handleAlignmentChange = (newAlignment) => {
    updateAlignment(index, newAlignment);
    setAlignment(newAlignment); // Update local alignment state
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  };

  return (
    <div className="flex flex-col items-center border p-2">
      <span className="text-xs text-gray-500 mb-1">Cell {index + 1}</span>
      <input
        ref={inputRef} // Set ref to the input field
        className="border p-2 w-full"
        value={value.content}
        onChange={(e) => updateCell(index, e.target.value)}
        style={{ 
          textAlign: alignment, 
          fontSize: value.fontSize // Set font size using inline style
        }}
      />
      <div className="flex space-x-1 mt-2">
        <button
          onClick={() => handleAlignmentChange('left')}
          className={`p-0 border rounded ${alignment === 'left' ? 'bg-gray-200' : ''}`}
        >
          L
        </button>
        <button
          onClick={() => handleAlignmentChange('center')}
          className={`p-0 border rounded ${alignment === 'center' ? 'bg-gray-200' : ''}`}
        >
          C
        </button>
        <button
          onClick={() => handleAlignmentChange('right')}
          className={`p-0 border rounded ${alignment === 'right' ? 'bg-gray-200' : ''}`}
        >
          R
        </button>
        <select
          onChange={(e) => updateFontSize(index, e.target.value)}
          value={value.fontSize}
          className="border p-1 rounded ml-1"
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
      </div>
    </div>
  );
}