import React, { useState } from "react";
import { X, Upload } from "lucide-react";
import { CATEGORIES, MAX_FILE_SIZE } from "../../utils/constants";

const UploadModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 50MB limit");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setName(selectedFile.name);
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);

    try {
      await onUpload(formData);
      onClose();
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/20">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Upload Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* File Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Select File
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-zinc-400 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-lg file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-zinc-800 file:text-white 
                  hover:file:bg-zinc-700 cursor-pointer transition-all"
                disabled={uploading}
              />
            </div>
            {file && (
              <p className="mt-2 text-[11px] text-zinc-500 font-mono italic">
                Ready to upload: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Project Proposal"
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-zinc-600 focus:outline-none placeholder:text-zinc-700 transition-all"
              disabled={uploading}
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-zinc-600 focus:outline-none appearance-none cursor-pointer text-sm"
                disabled={uploading}
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-900">
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-600">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-xs animate-shake">
              {error}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-4 py-2.5 border border-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading || !file}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:bg-zinc-700 text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Upload className="w-4 h-4" />
              <span>{uploading ? "Uploading..." : "Start Upload"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
