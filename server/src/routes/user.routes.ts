import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Protected Routes
router.use(authMiddleware);

router.put("/profile", userController.updateProfile);
router.get("/summary", userController.getDashboardSummary);

export default router;
