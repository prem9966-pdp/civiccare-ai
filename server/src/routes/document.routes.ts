import { Router } from "express";
import * as documentController from "../controllers/document.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadMiddleware } from "../middleware/upload.middleware";

const router = Router();

// Secure Content Access
router.use(authMiddleware);

router.post("/upload", uploadMiddleware.single("file"), documentController.uploadDocument);
router.get("/", documentController.getMyDocuments);
router.get("/checklist/:schemeId", documentController.getChecklist);
router.delete("/:id", documentController.deleteDocument);

export default router;
