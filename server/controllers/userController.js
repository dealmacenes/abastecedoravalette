// server/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Generate JWT Token for new users
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      userName: user.userName,
    },
    process.env.JWT_SECRET
  );
};

// Create user: /api/user/register
export const registerUser = async (req, res) => {
  try {
    let { name, userName, email, password } = req.body;

    email = email.toLowerCase().trim();
    userName = userName.toLowerCase().trim();

    // Validaciones
    if (!name)
      return res.status(400).json({
        success: false,
        message: `El campo "Nombre" requerido.`,
      });
    if (!userName)
      return res.status(400).json({
        success: false,
        message: `El campo "Nombre de usuario" requerido.`,
      });
    if (userName.length < 4)
      return res.status(400).json({
        success: false,
        message: "El nombre de usuario debe contener al menos 4 caracteres.",
      });
    if (!email)
      return res.status(400).json({
        success: false,
        message: `El campo "Correo electrónico" requerido.`,
      });
    if (!password)
      return res.status(400).json({
        success: false,
        message: `El campo "Contraseña" requerido.`,
      });
    if (password.length < 8)
      return res.status(400).json({
        success: false,
        message: "La contraseña debe contener al menos 8 caracteres.",
      });

    const userEmailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ userName });

    if (userEmailExists)
      return res.status(409).json({
        success: false,
        message: "El Correo electrónico ya está registrado",
      });
    if (userNameExists)
      return res.status(409).json({
        success: false,
        message: "Ese nombre de usuario ya está en uso",
      });

    // Iniciar con el registro
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser);

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
    
    res.json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login user: /api/user/login
export const loginUser = async (req, res) => {
  try {
    // Iniciar busqueda email o username
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Faltan campos obligatorios",
      });
    }

    // Normalizar email o username
    const identifierNorm = identifier.toLowerCase().trim();
    const query = identifierNorm.includes("@")
      ? { email: identifierNorm }
      : { userName: identifierNorm };

    // Validaciones
    const user = await User.findOne(query);

    if (!user)
      return res
        .status(500)
        .json({ success: false, message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(500)
        .json({ success: false, message: "Contraseña incorrecta" });

    const token = generateToken(user);

    res.cookie("token", token, {
      path: "/" ,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    });
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get user data using token JWT: /api/user/:token
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Logout Admin : /api/admin/logout
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "Sesion cerrada correctamente" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};