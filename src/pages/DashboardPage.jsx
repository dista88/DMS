import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import SearchBar from "../components/Dashboard/SearchBar";
import StatsCards from "../components/Dashboard/StatsCards";
import DocumentTable from "../components/Documents/DocumentTable";
import UploadModal from "../components/Documents/UploadModal";
import EditModal from "../components/Documents/EditModal";
import { useDocuments } from "../hooks/useDocuments";

const DashboardPage = () => {
  const {
    documents,
    loading,
    error,
    uploadDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
  } = useDocuments();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.uploaded_by_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = async (formData) => {
    try {
      await uploadDocument(formData);
      setShowUploadModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  };

  const handleEdit = async (id, data) => {
    try {
      await updateDocument(id, data);
      setShowEditModal(false);
      setEditingDoc(null);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed: " + error.message);
      }
    }
  };

  const handleDownload = async (id, filename) => {
    try {
      await downloadDocument(id, filename);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed: " + error.message);
    }
  };

  const openEditModal = (doc) => {
    setEditingDoc(doc);
    setShowEditModal(true);
  };

  return (
    <MainLayout>
      {/* Container Background Fix */}
      <div className="min-h-[calc(100vh-64px)] bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onUploadClick={() => setShowUploadModal(true)}
          />

          <StatsCards
            totalDocuments={documents.length}
            filteredCount={filteredDocuments.length}
          />

          {loading ? (
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-12 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-zinc-500 border-t-white rounded-full animate-spin"></div>
                <div className="text-zinc-500 font-medium">
                  Loading documents...
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400">
              <span className="font-bold uppercase text-xs mr-2">Error:</span>{" "}
              {error}
            </div>
          ) : (
            <DocumentTable
              documents={filteredDocuments}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          )}

          {/* Modal Overlays */}
          {showUploadModal && (
            <UploadModal
              onClose={() => setShowUploadModal(false)}
              onUpload={handleUpload}
            />
          )}

          {showEditModal && editingDoc && (
            <EditModal
              document={editingDoc}
              onClose={() => {
                setShowEditModal(false);
                setEditingDoc(null);
              }}
              onSave={handleEdit}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
