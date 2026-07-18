
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import { connectToMongoDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// প্রোডাক্ট এবং অথ রাউট সঠিকভাবে ইম্পোর্ট  
import authRoutes from "./routes/auth.routs.js";
import productRoutes from "./routes/product.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
app.use(cors({
    origin: [
        'https://admin-fc.onrender.com',
        "https://fc-client-side.onrender.com/",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// database connection
connectToMongoDB();

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);  
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
    res.send("Fashion Classy Api Running...");
});

export default app;