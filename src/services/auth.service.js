 
import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const adminLoginService = async (loginData) => {
  console.log("Input Login Data:", loginData);

  const { email, password } = loginData;

  const adminCollection = db.collection("admins");

  // ১. প্রথমে ইমেইল দিয়ে ডাটাবেজে খুঁজুন
  const admin = await adminCollection.findOne({ email });

  if (!admin) {
    throw new Error("Invalid Email");
  }

  // 🔍 ২. ডিবাগ করার জন্য টার্মিনালে চেক করুন (লগইন ঠিক হয়ে গেলে লগগুলো ফেলে দিতে পারেন)
  console.log("Input Password:", password);
  console.log("DB Hashed Password:", admin.password);

  // ৩. Bcrypt দিয়ে পাসওয়ার্ড মেলান
  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  console.log("Is Match Result?:", isPasswordMatch);

  if (!isPasswordMatch) {
    throw new Error("Invalid Password");
  }

  // ৪. ইমেইল ও পাসওয়ার্ড দুটিই ভ্যালিড হওয়ার পর টোকেন জেনারেট করুন
  const token = generateToken(admin);

  return {
    success: true,
    message: "Login Successful",
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    },
    token
  };
};



