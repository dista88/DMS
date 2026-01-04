import React from "react";
import { Search, Filter, Upload } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onUploadClick,
}) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 mb-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Input Group */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Filter and Action Group */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-10 py-2.5 bg-black border border-zinc-800 rounded-lg text-white appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all cursor-pointer text-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-zinc-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onUploadClick}
            className="flex items-center space-x-2 px-6 py-2.5 bg-white hover:bg-zinc-200 text-black rounded-lg transition-all font-semibold text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
