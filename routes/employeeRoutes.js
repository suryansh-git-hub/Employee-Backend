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

const router = express.Router();

router.post("/", upload.single("profileImage"),
createEmployee);
router.get("/", getAllEmployees);
router.get("/search", searchEmployee);
router.get("/filter", filterEmployee);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;