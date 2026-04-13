import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

/**
 * Middleware to restrict access based on user roles
 * @param roles - Array of allowed roles (e.g., ['admin'])
 * @returns Express middleware function
 */
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Ensure user is authenticated (authMiddleware must run before this)
    if (!req.user) {
      throw new ApiError(401, "Authentication required to access this resource");
    }

    // 2. Check if the user's role is in the allowed roles list
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403, 
        `Forbidden: Access denied for role '${req.user.role}'. Required roles: [${roles.join(", ")}]`
      );
    }

    // 3. Authorized - proceed
    next();
  };
};
