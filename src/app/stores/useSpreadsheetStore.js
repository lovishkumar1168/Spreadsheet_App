// stores/useSpreadsheetStore.js
import { create } from 'zustand';

export const useSpreadsheetStore = create((set) => ({
  cells: Array(1000).fill({ content: '', alignment: 'left', fontSize: '14px' }), // Default font size
  history: [],
  redoStack: [],

  updateCell: (index, value) => set((state) => {
    const isEvenIndex = index % 2 === 0;
    const isNumeric = !isNaN(value) && !isNaN(parseFloat(value));
    const isAlphabetic = /^[a-zA-Z]*$/.test(value);

    if ((isEvenIndex && isAlphabetic) || (!isEvenIndex && isNumeric)) {
      const newHistory = [...state.history, state.cells];
      return {
        cells: state.cells.map((cell, i) =>
          i === index ? { ...cell, content: value } : cell
        ),
        history: newHistory,
        redoStack: [],
      };
    } else {
      // Optionally, handle invalid input or show a message to the user
      console.warn('Invalid input: Cell does not match the required format.');
      return state;
    }
  }),

  updateAlignment: (index, alignment) => set((state) => {
    const newHistory = [...state.history, state.cells];
    return {
      cells: state.cells.map((cell, i) =>
        i === index ? { ...cell, alignment } : cell
      ),
      history: newHistory,
      redoStack: [],
    };
  }),

  updateFontSize: (index, fontSize) => set((state) => {
    const newHistory = [...state.history, state.cells];
    return {
      cells: state.cells.map((cell, i) =>
        i === index ? { ...cell, fontSize } : cell
      ),
      history: newHistory,
      redoStack: [],
    };
  }),

  undo: () => set((state) => {
    if (state.history.length > 0) {
      const previousHistory = state.history.slice(0, -1);
      const previousState = state.history[state.history.length - 1];
      return {
        cells: previousState,
        history: previousHistory,
        redoStack: [...state.redoStack, state.cells],
      };
    }
    return state;
  }),

  redo: () => set((state) => {
    if (state.redoStack.length > 0) {
      const nextState = state.redoStack[state.redoStack.length - 1];
      const newRedoStack = state.redoStack.slice(0, -1);
      return {
        cells: nextState,
        history: [...state.history, state.cells],
        redoStack: newRedoStack,
      };
    }
    return state;
  }),

  search: (query) => set((state) => {
    if (!query) return { cells: state.cells };
    const lowerCaseQuery = query.toLowerCase();
    return {
      cells: state.cells.map((cell) => ({
        ...cell,
        hidden: !cell.content.toLowerCase().includes(lowerCaseQuery),
      })),
    };
  }),

  resetSearch: () => set((state) => ({
    cells: state.cells.map((cell) => ({
      ...cell,
      hidden: false,
    })),
  })),
}));