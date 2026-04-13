// For now, simple placeholder. Using real library is better but needs install.
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const rateLimitMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // In production: use express-rate-limit
  // const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  next();
};

export { rateLimitMiddleware };
