import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import helmet from "helmet"
import "dotenv/config"
import "mongoose"
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import productRouter from "./routes/productRoutes.js";
import inventoryRouter from "./routes/inventoryRoutes.js";


const app = express();
const PORT = process.env.PORT
const allowedOrigins = ["http://localhost:1990", "https://dealmacenes.vercel.app", "http://192.168.0.103:1990"]

app.use(express.json())
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(helmet())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // para form-data

// API Status feedback
app.get("/", (req, res)=> res.send("API Status: OK"))

// Rutas
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use("/api/products", productRouter);
app.use("/api/inventory", inventoryRouter);


//Iniciamos la conexion con Mongo y enlazamos con el puerto.
await connectDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor levantado en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


