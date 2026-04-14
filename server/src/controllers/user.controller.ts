import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { userService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { updateProfileSchema } from "../validators/user.validator";

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Not authorized");
  }

  const result = updateProfileSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, "Validation failed", result.error.errors);
  }

  const updatedUser = await userService.updateProfile(req.user._id.toString(), result.data);

  return res.status(200).json(
    new ApiResponse(200, updatedUser, "Profile updated successfully")
  );
});

export const getDashboardSummary = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Not authorized");
  }

  const summary = await userService.getDashboardSummary(req.user._id.toString());

  return res.status(200).json(
    new ApiResponse(200, summary, "Dashboard summary retrieved successfully")
  );
});
