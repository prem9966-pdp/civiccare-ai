import { api } from "./auth.service";

const letterService = {
  createDraft: async (data: any) => {
    const response = await api.post("letters/draft", data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("letters");
    return response.data;
  },

  updateContent: async (id: string, content: string) => {
    const response = await api.patch(`letters/${id}`, { content });
    return response.data;
  },

  exportPDF: async (id: string) => {
    const response = await api.get(`letters/${id}/export`);
    return response.data;
  }
};

export default letterService;
