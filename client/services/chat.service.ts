import { api } from "./auth.service";

const chatService = {
  sendMessage: async (content: string, sessionId?: string) => {
    const response = await api.post(`/chat/send`, { content, sessionId });
    return response.data;
  },

  getSessions: async () => {
    const response = await api.get(`/chat/sessions`);
    return response.data;
  },

  getSessionById: async (id: string) => {
    const response = await api.get(`/chat/sessions/${id}`);
    return response.data;
  }
};

export default chatService;
