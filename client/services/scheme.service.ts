import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5050/api/v1";

const schemeService = {
  getSchemes: async (params: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/schemes`, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  },

  getSchemeById: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/schemes/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    return response.data;
  },

  toggleSave: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/schemes/${id}/save`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default schemeService;
