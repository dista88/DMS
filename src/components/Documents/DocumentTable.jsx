import React from "react";
import { File } from "lucide-react";
import DocumentRow from "./DocumentRow";

const DocumentTable = ({ documents, onEdit, onDelete, onDownload }) => {
  return (
    <div className="bg-zinc-900/30 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-900/80 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Document
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Uploaded By
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {documents.map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                onEdit={onEdit}
                onDelete={onDelete}
                onDownload={onDownload}
              />
            ))}
          </tbody>
        </table>
      </div>

      {documents.length === 0 && (
        <div className="text-center py-20 bg-black/20">
          <File className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <p className="text-zinc-400 text-lg font-medium">
            No documents found
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentTable;
