import { api } from "./auth.service";

const schemeService = {
  // Use the recommendation engine for matching schemes
  getRecommendations: async (data: any) => {
    const response = await api.post("recommendation", data);
    return response.data;
  },

  getSchemeById: async (id: string) => {
    const response = await api.get(`schemes/${id}`);
    return response.data;
  },

  toggleSave: async (id: string) => {
    const response = await api.post(`schemes/${id}/save`, {});
    return response.data;
  }
};

export default schemeService;
