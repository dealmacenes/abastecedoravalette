// server/middleware/auth.js
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Primero intentamos leer el token desde las cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // 2. Si no está en cookies, buscamos en el header Authorization
  else if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim(); 
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No autorizado, token ausente" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token inválido o expirado" });
  }
};
