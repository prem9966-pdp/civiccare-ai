import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { notificationService } from "../services/notification.service";
import { historyService } from "../services/history.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from '../utils/ApiError';

export const listNotifications = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  const notifications = await notificationService.getUserNotifications(req.user._id.toString());

  return res.status(200).json(
    new ApiResponse(200, notifications, "Notifications retrieved")
  );
});

export const markRead = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "Auth required");
  const notification = await notificationService.markAsRead(req.user._id.toString(), req.params.id);

  return res.status(200).json(
    new ApiResponse(200, notification, "Notification marked as read")
  );
});

export const markAllRead = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    await notificationService.markAllAsRead(req.user._id.toString());

    return res.status(200).json(
      new ApiResponse(200, null, "All notifications cleared")
    );
});

export const getTimeline = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "Auth required");
    const timeline = await historyService.getActivityTimeline(req.user._id.toString());

    return res.status(200).json(
      new ApiResponse(200, timeline, "Combined activity timeline generated")
    );
});
