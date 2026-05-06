// server/routes/productRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import { upload } from "../middleware/upload.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);

// ahora multer procesa `image`
router.post("/", protect, isAdmin, upload.single("image"), createProduct);
router.put(
  "/:id",
  protect,
  isAdmin,
  upload.single("image"),
  updateProduct
);
router.delete("/:id", protect, isAdmin, deleteProduct);

export default router;
