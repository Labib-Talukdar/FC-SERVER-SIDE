// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import multer from "multer";
// import dotenv from 'dotenv';

// dotenv.config();


 

// // cloudinary config
// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,

// })

// // set for multer cloudinaryStorage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params:{
//         folder: 'fashion-classy-products',
//         allowed_formats: ['jpg','png','jpeg','webp']
//     },
// });
 

// export const upload = multer({storage});
// export {cloudinary}











import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "fashion-classy-products",
    resource_type: "auto", // ইমেজ অটো ডিটেক্ট করবে
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // ১০ মেগাবাইট পর্যন্ত সেফ লিমিট
});

export { cloudinary };