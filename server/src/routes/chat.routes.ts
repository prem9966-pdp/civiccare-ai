import { Router } from "express";
import * as chatController from "../controllers/chat.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Protected Routes
router.use(authMiddleware);

router.post("/send", chatController.postMessage);
router.get("/sessions", chatController.listSessions);
router.get("/sessions/:id", chatController.getSessionDetails);

export default router;
