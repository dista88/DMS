import { useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const useDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/documents");
      setDocuments(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDocument = async (formData) => {
    const response = await api.post("/documents/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setDocuments([response.data, ...documents]);
    return response.data;
  };

  const updateDocument = async (id, data) => {
    const response = await api.put(`/documents/${id}`, data);
    setDocuments(documents.map((doc) => (doc.id === id ? response.data : doc)));
    return response.data;
  };

  const deleteDocument = async (id) => {
    await api.delete(`/documents/${id}`);
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const downloadDocument = async (id, filename) => {
    const response = await api.get(`/documents/download/${id}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    updateDocument,
    deleteDocument,
    downloadDocument,
    refetch: fetchDocuments,
  };
};
