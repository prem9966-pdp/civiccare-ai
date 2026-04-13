import axios from "axios";
import { LoginValues, SignupValues } from "@/lib/validation/auth";
import { IAuthResponse, IUser } from "@/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add interceptor to include token in headers
api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const authService = {
  login: async (values: LoginValues): Promise<IAuthResponse> => {
    try {
        const response = await api.post("auth/login", {
            email: values.email,
            password: values.password,
        });

        const result = response.data;
        const { data, message, success } = result;
        
        if (success && data?.token) {
            // Map _id/id for consistency
            const user = { ...data.user, id: data.user?._id || data.user?.id };
            authService.persistAuth(user, data.token);
            
            return {
                success: true,
                message: message || "Successfully logged in",
                user,
                token: data.token,
            };
        }

        return {
            success: success || false,
            message: message || "Invalid credentials",
            user: data?.user || null,
            token: data?.token || "",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Login failed",
            user: null as any,
            token: "",
        };
    }
  },

  register: async (values: SignupValues): Promise<IAuthResponse> => {
    try {
        const response = await api.post("auth/register", {
            name: values.name,
            email: values.email,
            password: values.password,
        });

        const result = response.data;
        const { data, message, success } = result;

        if (success && data?.token) {
            const user = { ...data.user, id: data.user?._id || data.user?.id };
            authService.persistAuth(user, data.token);

            return {
                success: true,
                message: message || "Account created successfully",
                user,
                token: data.token,
            };
        }

        return {
            success: success || false,
            message: message || "Registration failed",
            user: data?.user || null,
            token: data?.token || "",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "Registration failed",
            user: null as any,
            token: "",
        };
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
    }
  },

  getCurrentUser: async (): Promise<IUser | null> => {
    try {
        const response = await api.get("auth/me");
        const result = response.data;
        const { data, success } = result;
        
        if (success && data) {
            const userData = data.user || data;
            const user = { ...userData, id: userData._id || userData.id };
            localStorage.setItem("user_data", JSON.stringify(user));
            return user;
        }
        return null;
    } catch (error) {
        authService.logout();
        return null;
    }
  },

  persistAuth: (user: any, token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(user));
    }
  }
};

export default authService;
export { api };


