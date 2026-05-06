// server/middleware/upload.js
import multer from "multer";

// Usa almacenamiento en memoria (RAM)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

