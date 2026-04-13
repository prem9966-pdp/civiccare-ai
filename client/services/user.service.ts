import axios from "axios";
import { ProfileValues } from "@/lib/validation/user";
import { IBaseResponse } from "@shared/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5050/api/v1";

const userService = {
  updateProfile: async (values: ProfileValues): Promise<IBaseResponse> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.put(`${API_URL}/users/profile`, values, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  getSummary: async (): Promise<IBaseResponse> => {
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/users/summary`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default userService;
