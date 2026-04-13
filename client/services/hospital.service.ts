import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const hospitalService = {
  getHospitals: async (params: any) => {
    try {
      const response = await axios.get(`${API_URL}/hospitals`, {
        params
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hospital ${id}:`, error);
      throw error;
    }
  }
};

export default hospitalService;
