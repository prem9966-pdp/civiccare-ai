import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { ENV } from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";

const generateToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    ENV.JWT_SECRET as string,
    { expiresIn: "7d" }
  );
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  let { name, email, password } = req.body;

  // 1. Normalize Inputs
  email = email?.toLowerCase().trim();
  console.log(`[AUTH DEBUG] Registering user: ${email}`);

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }

  // 2. Check existence
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(`[AUTH DEBUG] User already exists: ${email}`);
    throw new ApiError(400, "User with this email already exists");
  }

  // 3. Create User (Middleware handles hashing)
  console.log(`[AUTH DEBUG] About to call User.create for: ${email}`);
  const user = await User.create({ name, email, password });
  console.log(`[AUTH DEBUG] User created in DB. ID: ${user._id}`);

  // 4. Generate Token (Centralized)
  const token = generateToken(user._id.toString());

  return res.status(201).json(
    new ApiResponse(201, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    }, "User registered successfully")
  );
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  let { email, password } = req.body;

  // 1. Normalize Inputs
  email = email?.toLowerCase().trim();
  console.log(`[AUTH DEBUG] Login Attempt for: ${email}`);

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // 2. Find User (MUST select password)
  const user = await User.findOne({ email }).select("+password");
  
  if (!user) {
    console.log(`[AUTH DEBUG] User NOT FOUND in database for email: ${email}`);
    throw new ApiError(401, "Invalid credentials");
  }

  // 3. Verify Password (Using instance method)
  console.log(`[AUTH DEBUG] Found user, comparing password...`);
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    console.log(`[AUTH DEBUG] Password DOES NOT MATCH for: ${email}`);
    throw new ApiError(401, "Invalid credentials");
  }

  // 4. Generate Token
  const token = generateToken(user._id.toString());
  console.log(`[AUTH DEBUG] Login successful for: ${email}`);

  return res.status(200).json(
    new ApiResponse(200, {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    }, "Login successful")
  );
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  if (!userId) {
    throw new ApiError(401, "Not authorized");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, user, "Current user fetched successfully")
  );
});