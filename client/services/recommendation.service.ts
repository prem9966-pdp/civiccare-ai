import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5050/api/v1";

const recommendationService = {
  getPersonalizedMatches: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/recommendations/match`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getHistory: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/recommendations/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default recommendationService;
