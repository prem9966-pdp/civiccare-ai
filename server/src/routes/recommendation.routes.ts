import { Router } from "express";
import { getRecommendations } from "../controllers/recommendation.controller";

const router = Router();

// Recommendation Route (Public for discovery)
router.post("/", getRecommendations);

export default router;
