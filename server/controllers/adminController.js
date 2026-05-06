// server/controllers/adminController.js
import User from "../models/User.js";


const allowedRoles = ["support", "moderator"];

export const changeUserRole = async (req, res) => {
  try {
    const requester = req.user; // viene desde middleware protect

    if (requester.role !== "admin") {
      return res.status(403).json({ success: false, message: "Acceso denegado" });
    }

    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
      return res.status(400).json({ success: false, message: "Faltan parámetros" });
    }

    if (!allowedRoles.includes(newRole)) {
      return res.status(400).json({ success: false, message: "Rol no permitido" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      message: `Rol del usuario cambiado a ${newRole}`,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
