import React from "react";
import { File, Download, Edit2, Trash2, Calendar } from "lucide-react";
import { formatFileSize, formatDate } from "../../utils/constants";

const DocumentRow = ({ document, onEdit, onDelete, onDownload }) => {
  return (
    <tr className="hover:bg-zinc-800/40 transition-colors group border-b border-zinc-800/50">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-zinc-800 rounded-lg group-hover:bg-zinc-700 transition-colors">
            <File className="w-4 h-4 text-zinc-400 group-hover:text-white" />
          </div>
          <span className="font-medium text-white">{document.name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-full text-xs font-medium uppercase tracking-wider">
          {document.category}
        </span>
      </td>
      <td className="px-6 py-4 text-zinc-500 text-sm">
        {formatFileSize(document.file_size)}
      </td>
      <td className="px-6 py-4 text-zinc-500 text-sm">
        {document.uploaded_by_name}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center text-zinc-600 text-sm">
          <Calendar className="w-3.5 h-3.5 mr-2" />
          {formatDate(document.upload_date)}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end space-x-1">
          <button
            onClick={() => onDownload(document.id, document.original_name)}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(document)}
            className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-md transition-all"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(document.id)}
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default DocumentRow;
