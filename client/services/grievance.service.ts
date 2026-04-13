import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const grievanceService = {
  submitGrievance: async (data: any) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.post(`${API_URL}/grievance`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getMyGrievances: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/grievance/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getGrievanceById: async (id: string) => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/grievance/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default grievanceService;
