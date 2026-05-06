// server/controllers/productController.js
import Product from "../models/Product.js";
import cloudinary from "../configs/cloudinary.js";

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const { name, brand, barcode, category, suggestedPrice } = req.body;

    // valida que llegue file
    if (!req.file || !req.file.buffer) {
      return res
        .status(400)
        .json({ success: false, message: "No se recibió imagen de producto" });
    }

    // sube el buffer a Cloudinary usando upload_stream
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "deAlmacenes/products" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res
            .status(500)
            .json({ success: false, message: "Error al subir imagen" });
        }

        // crea el producto en BD
        try {
          const product = await Product.create({
            name,
            brand,
            barcode,
            category,
            suggestedPrice,
            imageUrl: result.secure_url,
            imagePublicId: result.public_id,
            createdBy: req.user._id,
          });
          return res.status(201).json({ success: true, product });
        } catch (dbErr) {
          console.error("DB Error:", dbErr);
          return res
            .status(500)
            .json({ success: false, message: dbErr.message });
        }
      }
    );

    // inicia el stream
    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Controller Error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

// Obtener todos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json({ success: true, products });
  } catch (error) {
    console.error("getAllProducts Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Obtener por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    res.json({ success: true, product });
  } catch (error) {
    console.error("getProductById Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod)
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });

    // Si llega nueva imagen, elimino anterior y subo buffer
    if (req.file && req.file.buffer) {
      // 1) destruyo anterior
      await cloudinary.uploader.destroy(prod.imagePublicId);

      // 2) subo nuevo
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "deAlmacenes/products" },
          (error, result) => {
            if (error) return reject(error);
            prod.imageUrl = result.secure_url;
            prod.imagePublicId = result.public_id;
            resolve();
          }
        );
        stream.end(req.file.buffer);
      });
    }

    // Actualizo campos de texto
    ["name", "brand", "barcode", "category", "suggestedPrice"].forEach((key) => {
      if (req.body[key] !== undefined) {
        prod[key] = req.body[key];
      }
    });

    await prod.save();
    res.json({ success: true, product: prod });
  } catch (error) {
    console.error("updateProduct Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    if (!prod)
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });

    // destruyo en Cloudinary
    await cloudinary.uploader.destroy(prod.imagePublicId);
    // elimino de BD
    await prod.deleteOne();

    res.json({ success: true, message: "Producto eliminado" });
  } catch (error) {
    console.error("deleteProduct Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
