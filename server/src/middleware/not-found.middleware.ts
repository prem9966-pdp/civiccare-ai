import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `Not Found: ${req.originalUrl}`);
  next(error);
};

export { notFoundMiddleware };
