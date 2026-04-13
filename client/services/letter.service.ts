import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const letterService = {
  createDraft: async (data: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/letters/draft`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getAll: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/letters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  updateContent: async (id: string, content: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(`${API_URL}/letters/${id}`, { content }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  exportPDF: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/letters/${id}/export`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default letterService;
