// server/models/InventoryItem.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  customPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  onSale: { type: Boolean, default: false },
  salePercent: { type: Number, default: 0 }, // porcentaje de descuento
}, { timestamps: true });

export default mongoose.model("InventoryItem", inventorySchema);
