import { Router } from "express";
import * as adminController from "../controllers/admin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

/**
 * @route   GET /api/v1/admin/test
 * @desc    Test admin access
 * @access  Admin Only
 */
router.get("/test", authMiddleware, authorize(["admin"]), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin access granted! Authentication and Role-based authorization are working.",
    user: {
      id: req.user?._id,
      name: req.user?.name,
      role: req.user?.role
    }
  });
});

// Apply global protection for all subsequent admin routes
router.use(authMiddleware, authorize(["admin"]));

router.get("/summary", adminController.getDashboardSummary);
router.get("/users", adminController.getUsersAudit);
router.get("/complaints", adminController.getComplaints);

// Catalog Operations (CRUD)
router.post("/schemes/upsert", adminController.upsertScheme);
router.delete("/schemes/:id", adminController.deleteScheme);

router.post("/hospitals/upsert", adminController.upsertHospital);
router.delete("/hospitals/:id", adminController.deleteHospital);

export default router;
