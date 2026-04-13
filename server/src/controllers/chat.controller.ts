import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { chatService } from "../services/chat.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from '../utils/ApiError';

export const postMessage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");

  const { content, sessionId } = req.body;
  if (!content) throw new ApiError(400, "Content cannot be empty");

  const result = await chatService.sendMessage(req.user._id, content, sessionId);

  return res.status(200).json(
    new ApiResponse(200, result, "Message processed successfully")
  );
});

export const listSessions = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");

  const sessions = await chatService.getSessions(req.user._id);

  return res.status(200).json(
    new ApiResponse(200, sessions, "Conversation list retrieved")
  );
});

export const getSessionDetails = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");

  const session = await chatService.getSessionById(req.user._id, req.params.id);

  return res.status(200).json(
    new ApiResponse(200, session, "Chat conversation retrieved")
  );
});
