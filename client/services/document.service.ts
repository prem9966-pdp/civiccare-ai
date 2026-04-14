import { api } from "./auth.service";

const documentService = {
  upload: async (formData: FormData) => {
    const response = await api.post("document/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("document");
    return response.data;
  },

  getChecklist: async (schemeId: string) => {
    const response = await api.get(`document/checklist/${schemeId}`);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`document/${id}`);
    return response.data;
  }
};

export default documentService;
