
 import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.zit20t1.mongodb.net/fc-admin?retryWrites=true&w=majority&appName=Cluster0`;

// Native MongoDB client (auth.service.js এর মতো raw driver ব্যবহারকারী ফাইলের জন্য)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const db = client.db("fc-admin"); // ✅ auth.service.js এর জন্য named export ফিরিয়ে আনা হলো

// Mongoose connection (Product model এর মতো mongoose.Schema ব্যবহারকারী ফাইলের জন্য)
export async function connectToMongoDB() {
  try {
    await client.connect(); // native client connect
    console.log("🔥 Successfully connected to MongoDB (native client)!");

    await mongoose.connect(uri); // mongoose connect
    console.log("🔥 Successfully connected to MongoDB via Mongoose!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}