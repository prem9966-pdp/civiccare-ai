import { api } from "./auth.service";

const hospitalService = {
  getHospitals: async (params: any) => {
    const response = await api.get("hospitals", { params });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`hospitals/${id}`);
    return response.data;
  }
};

export default hospitalService;
