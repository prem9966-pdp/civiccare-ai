import { UserRole } from "@shared/types";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
  profile?: {
    age?: number;
    location?: string;
    income?: number;
    phone?: string;
    city?: string;
  };
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  user: IUser;
  token: string;
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
