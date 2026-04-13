import { Router } from "express";
import * as letterController from "../controllers/letter.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Secure Access
router.use(authMiddleware);

router.post("/draft", letterController.createDraft);
router.get("/", letterController.getMyLetters);
router.patch("/:id", letterController.updateLetterContent);
router.get("/:id/export", letterController.exportPDF);

export default router;
