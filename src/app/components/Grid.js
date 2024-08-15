"use client";
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';
import Cell from './Cell';

export default function Grid({ currentPage = 0, pageSize = 100 }) {
    const cells = useSpreadsheetStore((state) => state.cells);
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
  
    return (
      <div className="grid grid-cols-10 gap-1 border">
        {cells.slice(startIndex, endIndex).map((value, index) => (
          !value.hidden && <Cell key={index + startIndex} index={index + startIndex} value={value} />
        ))}
      </div>
    );
}
