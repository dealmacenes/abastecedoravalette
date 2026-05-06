// server/routes/adminRoutes.js
import express from "express";
import { changeUserRole } from "../controllers/adminController.js";
import { isAdmin } from "../middleware/admin.js";
import { protect } from "../middleware/auth.js";

const adminRouter = express.Router()

adminRouter.put("/change-role", protect, isAdmin, changeUserRole);

export default adminRouter;
