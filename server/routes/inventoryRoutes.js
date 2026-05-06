// server/routes/adminRoutes.js
import express from "express";
import { protect } from "../middleware/auth.js";
import {
  addInventoryEntry,
  getInventoryHistory,
  getLatestInventory,
  getOutOfStockProducts,
  getLowMovementProducts,
  cleanOldInventoryEntries,
  deleteInventoryProduct,
} from "../controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/", protect, addInventoryEntry);
inventoryRouter.get("/history/:productId", protect, getInventoryHistory);
inventoryRouter.get("/latest", protect, getLatestInventory);
inventoryRouter.get("/out-of-stock", protect, getOutOfStockProducts);
inventoryRouter.get("/low-movement", protect, getLowMovementProducts);
inventoryRouter.delete("/clean-old", protect, cleanOldInventoryEntries);
inventoryRouter.delete("/:productId", protect, deleteInventoryProduct);

export default inventoryRouter;
