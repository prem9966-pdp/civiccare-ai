import { Router } from "express";
import * as schemeController from "../controllers/scheme.controller";
import { getRecommendations } from "../controllers/recommendation.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Recommendation/Matching logic (Form-based eligibility checker)
router.post("/match", getRecommendations);

// Publicly viewable, but optionally personalized if logged in
router.get("/", (req, res, next) => {
    // Optional authMiddleware but don't fail if no token
    if (req.headers.authorization) {
        return authMiddleware(req, res, next);
    }
    next();
}, schemeController.getSchemes);

router.get("/:id", (req, res, next) => {
    if (req.headers.authorization) {
        return authMiddleware(req, res, next);
    }
    next();
}, schemeController.getSchemeDetails);

// Bookmark Toggling (Requires Login)
router.post("/:id/save", authMiddleware, schemeController.toggleSave);

export default router;
