import { api } from "./auth.service";

const adminService = {
  getSummary: async () => {
    const response = await api.get("admin/summary");
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get("admin/users");
    return response.data;
  },

  getComplaints: async () => {
    const response = await api.get("admin/complaints");
    return response.data;
  },

  upsertScheme: async (data: any) => {
    const response = await api.post("admin/schemes/upsert", data);
    return response.data;
  },

  deleteScheme: async (id: string) => {
    const response = await api.delete(`admin/schemes/${id}`);
    return response.data;
  },

  upsertHospital: async (data: any) => {
    const response = await api.post("admin/hospitals/upsert", data);
    return response.data;
  },

  deleteHospital: async (id: string) => {
    const response = await api.delete(`admin/hospitals/${id}`);
    return response.data;
  }
};

export default adminService;
