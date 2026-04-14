import { api } from "./auth.service";

const grievanceService = {
  submitGrievance: async (data: any) => {
    const response = await api.post("grievance", data);
    return response.data;
  },

  getMyGrievances: async () => {
    const response = await api.get("grievance/history");
    return response.data;
  },

  getGrievanceById: async (id: string) => {
    const response = await api.get(`grievance/${id}`);
    return response.data;
  }
};

export default grievanceService;
