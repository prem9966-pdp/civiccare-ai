export type UserRole = 'user' | 'admin';

export interface IUserProfile {
  age?: number;
  gender?: string;
  location?: string;
  income?: number;
  category?: string;
  disabilityStatus?: boolean;
}

export interface IBaseResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
