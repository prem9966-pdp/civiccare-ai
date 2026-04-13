import { Router } from "express";
import { registerUser, loginUser, getCurrentUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Test Route (Public)
router.get("/test", (req, res) => {
  console.log(`[AUTH] HIT: ${req.method} ${req.originalUrl} from ${req.ip}`);
  return res.status(200).json({
    success: true,
    message: "Auth route working correctly!"
  });
});


// Authentication Routes (Public)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.get("/me", authMiddleware, getCurrentUser);

export default router;