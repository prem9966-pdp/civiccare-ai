import { api } from "./auth.service";
import { ProfileValues } from "@/lib/validation/user";
import { IBaseResponse } from "@shared/types";

const userService = {
  updateProfile: async (values: ProfileValues): Promise<IBaseResponse> => {
    const response = await api.put("user/profile", values);
    return response.data;
  },

  getSummary: async (): Promise<IBaseResponse> => {
    const response = await api.get("user/summary");
    return response.data;
  }
};

export default userService;
