"use client";
import { useSpreadsheetStore } from '../stores/useSpreadsheetStore';

export default function Toolbar() {
  const undo = useSpreadsheetStore((state) => state.undo);
  const redo = useSpreadsheetStore((state) => state.redo);

  return (
    <div className="flex space-x-4 mb-4">
      <button onClick={undo} className="p-2 bg-gray-200">Undo</button>
      <button onClick={redo} className="p-2 bg-gray-200">Redo</button>
    </div>
  );
}