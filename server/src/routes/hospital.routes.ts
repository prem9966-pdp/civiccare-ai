import { Router } from "express";
import * as hospitalController from "../controllers/hospital.controller";

const router = Router();

// Publicly accessible discovery nodes
router.get("/", hospitalController.listHospitals);
router.get("/:id", hospitalController.getDetails);

export default router;
