 

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import { connectToMongoDB } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// রাউট ইম্পোর্ট  
import authRoutes from "./routes/auth.routs.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from './routes/order.routes.js';
console.log("🔥🔥🔥 ORDER ROUTES FILE LOADED CORRECTLY 🔥🔥🔥"); 
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// 🌐 এলাউড ডোমেনগুলোর লিস্ট
const allowedOrigins = [
  'https://fashionclassybd.com',
  'https://www.fashionclassybd.com',
  'https://admin.fashionclassybd.com',
  'https://admin-fc.onrender.com',
  'https://fc-client-side.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174'
];

// CORS Middleware (Dynamic origin checking)
app.use(cors({
  origin: function (origin, callback) {
    // !origin দেওয়া হয়েছে যাতে Postman/Mobile browser/Server-to-server রিকোয়েস্ট ব্লক না হয়
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS Not Allowed for this origin: ' + origin));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database Connection
connectToMongoDB();

// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);  
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/orders", orderRoutes);

// app.get("/", (req, res) => {
//   res.send("Fashion Classy API Running...");
// });

app.get("/", (req, res) => {
  res.send("Fashion Classy API Running...");
});

// 🚨 Global Error Handler — সব রাউট ও মিডলওয়্যারের (multer/cloudinary সহ) 
// এরর এখানে ধরা পড়বে এবং JSON আকারে exact message পাঠাবে
app.use((err, req, res, next) => {
  console.error("🚨 GLOBAL ERROR HANDLER:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong on the server",
  });
});

export default app;

 