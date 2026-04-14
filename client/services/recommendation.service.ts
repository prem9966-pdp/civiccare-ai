import { api } from "./auth.service";

const recommendationService = {
  getPersonalizedMatches: async () => {
    // Backend mount is /api/v1/recommendation
    const response = await api.post("recommendation"); 
    return response.data;
  },

  getHistory: async () => {
    // Current backend doesn't have a history route for recommendation separately, 
    // but the user might have intended it. For now, sticking to standard paths.
    const response = await api.get("recommendation/history");
    return response.data;
  }
};

export default recommendationService;
