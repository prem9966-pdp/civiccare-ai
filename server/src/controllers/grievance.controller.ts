import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import Grievance from "../models/grievance.model";

/**
 * @desc Create a new grievance submission
 * @route POST /api/v1/grievance
 */
export const createGrievance = asyncHandler(async (req: Request, res: Response) => {
  const { title, category, department, description, location } = req.body;
  const userId = (req as any).user.id;

  if (!title || !category || !department || !description || !location) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required."));
  }

  const grievance = await Grievance.create({
    title,
    category,
    department,
    description,
    location,
    user: userId
  });

  return res.status(201).json(new ApiResponse(201, grievance, "Grievance submitted successfully."));
});

/**
 * @desc Get current user's submitted grievances
 * @route GET /api/v1/grievance/my
 */
export const getMyGrievances = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const grievances = await Grievance.find({ user: userId }).sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, grievances, "User grievances retrieved."));
});

/**
 * @desc Get single grievance details
 * @route GET /api/v1/grievance/:id
 */
export const getGrievanceById = asyncHandler(async (req: Request, res: Response) => {
  const grievance = await Grievance.findById(req.params.id);

  if (!grievance) {
    return res.status(404).json(new ApiResponse(404, null, "Grievance not found."));
  }

  // Security: Check if user owns the grievance
  if (grievance.user.toString() !== (req as any).user.id) {
    return res.status(403).json(new ApiResponse(403, null, "Unauthorized access help request."));
  }

  return res.status(200).json(new ApiResponse(200, grievance, "Grievance details retrieved."));
});
