import { Router } from "express";
import * as grievanceController from "../controllers/grievance.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Secure all routes with auth middleware
router.use(authMiddleware);

// Routes
router.post("/", grievanceController.createGrievance);
router.get("/history", grievanceController.getMyGrievances);
router.get("/:id", grievanceController.getGrievanceById);

export default router;
