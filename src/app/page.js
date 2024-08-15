"use client";
import Grid from './components/Grid';
import Toolbar from './components/Toolbar';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';


export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Spreadsheet App</h1>
      <Toolbar />
      <SearchBar />
      <Pagination />
    </div>
  );
}