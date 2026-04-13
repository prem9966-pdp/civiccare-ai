import { Router } from "express";
import * as notificationController from "../controllers/notification.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Secure Access
router.use(authMiddleware);

router.get("/", notificationController.listNotifications);
router.patch("/:id/read", notificationController.markRead);
router.patch("/read-all", notificationController.markAllRead);
router.get("/timeline", notificationController.getTimeline);

export default router;
