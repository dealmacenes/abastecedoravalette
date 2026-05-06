// controllers/inventoryItemController.js
import InventoryItem from "../models/InventoryItem.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// 1. Agregar un item al inventario del usuario (nueva entrada histórica)
export const addInventoryEntry = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, customPrice, stock, onSale, salePercent } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const newEntry = new InventoryItem({
      user: userId,
      product: productId,
      customPrice,
      stock,
      onSale,
      salePercent,
    });

    await newEntry.save();

    res.status(201).json({ message: "Inventario actualizado", entry: newEntry });
  } catch (error) {
    console.error("Error al agregar al inventario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 2. Historial completo de un producto para el usuario (todas las ediciones previas)
export const getInventoryHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const include = req.query.include === "product";

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    let historyQuery = InventoryItem.find({ user: userId, product: productId })
      .sort({ createdAt: -1 });

    if (include) historyQuery = historyQuery.populate("product");

    const history = await historyQuery;

    res.status(200).json(history);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 3. Última entrada por producto (para la vista de inventario en panel)
export const getLatestInventory = async (req, res) => {
  try {
    const userId = req.user._id;

    const latestEntries = await InventoryItem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$product",
          latestEntry: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$latestEntry" }
      }
    ]);

    // Populate los productos solo después del aggregation
    await InventoryItem.populate(latestEntries, { path: "product" });

    res.status(200).json(latestEntries);
  } catch (error) {
    console.error("Error al obtener inventario más reciente:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 4. Productos con stock en 0 (última entrada por producto)
export const getOutOfStockProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    const latestEntries = await InventoryItem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$product",
          latestEntry: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$latestEntry" } },
      { $match: { stock: { $lte: 0 } } }
    ]);

    await InventoryItem.populate(latestEntries, { path: "product" });

    res.status(200).json(latestEntries);
  } catch (error) {
    console.error("Error al obtener productos sin stock:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 5. Productos con pocas interacciones (menos de X entradas en total)
export const getLowMovementProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    const threshold = parseInt(req.query.threshold || "2");

    const result = await InventoryItem.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$product",
          count: { $sum: 1 },
          latestEntry: { $last: "$$ROOT" }
        }
      },
      { $match: { count: { $lte: threshold } } },
      { $replaceRoot: { newRoot: "$latestEntry" } }
    ]);

    await InventoryItem.populate(result, { path: "product" });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener productos con bajo movimiento:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 6. Limpieza automática (eliminar registros de hace > 6 meses)
export const cleanOldInventoryEntries = async (req, res) => {
  try {
    const userId = req.user._id;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const result = await InventoryItem.deleteMany({
      user: userId,
      createdAt: { $lt: sixMonthsAgo }
    });

    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error al eliminar registros antiguos:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// 7. Eliminar todas las entradas de inventario de un producto para un usuario
export const deleteInventoryProduct = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "ID de producto inválido" });
    }

    const result = await InventoryItem.deleteMany({
      user: userId,
      product: productId,
    });

    return res
      .status(200)
      .json({ message: "Producto eliminado del inventario", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error al eliminar producto del inventario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
