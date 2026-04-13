import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new ApiError(401, "Authentication required");
  }

  if (req.user.role !== "admin") {
    throw new ApiError(403, "Forbidden: Administrative privileges required");
  }

  next();
};
