import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "@/types/auth";

interface AuthStore {
  user: IUser | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
