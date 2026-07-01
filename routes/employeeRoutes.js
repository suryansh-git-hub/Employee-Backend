import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  filterEmployee
} from "../controllers/employeeController.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware,adminMiddleware, upload.single("profileImage"),
createEmployee);
router.get("/", getAllEmployees);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.get("/:id", getEmployeeById);
router.put("/:id", authMiddleware, adminMiddleware,updateEmployee);
router.delete("/:id",authMiddleware, adminMiddleware,deleteEmployee);

export default router;