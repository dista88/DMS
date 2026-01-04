import React from "react";
import { File, Filter, Activity } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";

const StatsCards = ({ totalDocuments, filteredCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Documents Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-700 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">
              Total Documents
            </p>
            <p className="text-4xl font-bold mt-3 text-white tracking-tight">
              {totalDocuments}
            </p>
          </div>
          <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 group-hover:bg-zinc-800 transition-colors">
            <File className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Categories Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-700 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">
              Active Categories
            </p>
            <p className="text-4xl font-bold mt-3 text-white tracking-tight">
              {CATEGORIES.length - 1}
            </p>
          </div>
          <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 group-hover:bg-zinc-800 transition-colors">
            <Filter className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* Results Count Card */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-700 group">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">
              Current View
            </p>
            <p className="text-4xl font-bold mt-3 text-white tracking-tight">
              {filteredCount}
            </p>
          </div>
          <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 group-hover:bg-zinc-800 transition-colors">
            <Activity className="w-5 h-5 text-zinc-400 group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
