import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { CATEGORIES } from "../../utils/constants";

const EditModal = ({ document, onClose, onSave }) => {
  const [name, setName] = useState(document.name);
  const [category, setCategory] = useState(document.category);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Document name is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await onSave(document.id, { name, category });
      onClose();
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    // Backdrop with heavier blur
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      {/* Modal Container */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/20">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Edit Document
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-zinc-600 focus:outline-none placeholder:text-zinc-700 transition-all"
              disabled={saving}
              placeholder="Update document name"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-white focus:ring-1 focus:ring-zinc-600 focus:outline-none appearance-none cursor-pointer text-sm"
                disabled={saving}
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-900">
                    {cat}
                  </option>
                ))}
              </select>
              {/* Custom arrow for select since appearance-none is used */}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-zinc-500">
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
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-xs">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 border border-zinc-800 text-zinc-400 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors disabled:opacity-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all disabled:opacity-50 text-sm font-bold"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
