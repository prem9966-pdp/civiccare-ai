"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import authService from "@/services/auth.service";
import { IUser } from "@/types/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (values: any) => Promise<void>;
  register: (values: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/login", "/signup", "/register"];

  const refreshUser = React.useCallback(async () => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      const isPublicRoute = publicRoutes.includes(pathname);
      if (!user && !isPublicRoute) {
        console.log("Protecting route: User not found, redirecting to login");
        router.push("/login");
      }
    }
  }, [user, loading, pathname]);

  const login = React.useCallback(async (values: any) => {
    setLoading(true);
    const result = await authService.login(values);
    if (result.success) {
      setUser(result.user);
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [router]);

  const register = React.useCallback(async (values: any) => {
    setLoading(true);
    const result = await authService.register(values);
    if (result.success) {
      setUser(result.user);
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  }, [router]);

  const logout = React.useCallback(() => {
    authService.logout();
    setUser(null);
    toast.info("Logged out successfully");
    router.push("/login");
  }, [router]);

  const value = React.useMemo(() => ({
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    refreshUser
  }), [user, loading, login, register, logout, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
