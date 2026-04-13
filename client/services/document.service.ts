import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const documentService = {
  upload: async (formData: FormData) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/documents/upload`, formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  },

  getAll: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/documents`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getChecklist: async (schemeId: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/documents/checklist/${schemeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  delete: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.delete(`${API_URL}/documents/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default documentService;
