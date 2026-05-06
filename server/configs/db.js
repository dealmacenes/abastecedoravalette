// server/config/db.js

import mongoose from "mongoose";
import "dotenv/config";

//Conexion a MongoDB
const connectDB = async () => {
  try {
    mongoose.connection.on('connected', ()=> console.log("✅ MongoDB Atlas conectado con éxito")
    )
    await mongoose.connect(`${process.env.DB_URI}/main`); 
  } catch (error) {
    console.error("❌ Error al conectar MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
