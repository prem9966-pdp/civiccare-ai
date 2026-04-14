import { api } from "./auth.service";

const notificationService = {
  getNotifications: async () => {
    const response = await api.get("notification");
    return response.data;
  },

  markRead: async (id: string) => {
    const response = await api.patch(`notification/${id}/read`, {});
    return response.data;
  },

  markAllRead: async () => {
    const response = await api.patch("notification/read-all", {});
    return response.data;
  },

  getTimeline: async () => {
    const response = await api.get("notification/timeline");
    return response.data;
  }
};

export default notificationService;
