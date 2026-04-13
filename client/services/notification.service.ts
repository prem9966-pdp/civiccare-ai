import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const notificationService = {
  getNotifications: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  markRead: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(`${API_URL}/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  markAllRead: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.patch(`${API_URL}/notifications/read-all`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getTimeline: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/notifications/timeline`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default notificationService;
