
// import express from 'express';
// import mongoose from "mongoose";
// const router = express.Router();
// import productController, { createProduct } from "../controllers/product.controller.js";
// // import upload from '../middlewares/upload.middleware.js';
// import { upload } from '../middlewares/cloudinary.js';
// import productModel from '../models/product.model.js';
// import { fileURLToPath } from "url";
// import fs from "fs";
// import path from "path";

 
// const cpUpload = upload.fields([
//     { name: "mainImage", maxCount: 1 },
//     { name: "galleryImages", maxCount: 3 }
// ]);


// router.post('/create', upload.single('mainImage'), createProduct)


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 🎯 প্রোডাক্ট ডিলিট করার API
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

 
//     const TargetModel = mongoose.model("Product") || mongoose.model("product");

 
//     const product = await TargetModel.findById(id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found!" });
//     }

 
//     if (product.mainImage) {
//       const imagePath = path.join(__dirname, "../../uploads", product.mainImage); 

//       fs.access(imagePath, fs.constants.F_OK, (err) => {
//         if (!err) {
//           fs.unlink(imagePath, (unlinkErr) => {
//             if (unlinkErr) console.error("Error deleting image file:", unlinkErr);
//             else console.log("Product image successfully deleted from server.");
//           });
//         }
//       });
//     }

//     // ৩. ডাটাবেজ থেকে প্রোডাক্ট রিমুভ করা
//     await TargetModel.findByIdAndDelete(id);

//     res.status(200).json({
//       success: true,
//       message: "Product and its image deleted successfully! 🗑️"
//     });

//   } catch (error) {
//     console.error("🚨 Delete Route Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// });



// // ১. প্রোডাক্ট অ্যাড করার রাউট (POST /api/products/add)
// if (productController && productController.addProduct) {
//     router.post("/add", cpUpload, productController.addProduct);
// } else {
//     console.error("❌ Error: productController.addProduct খুঁজে পাওয়া যাচ্ছে না!");
// }


// // category list route
// if(productController && productController.getAllCategories) {
//     router.get("/categories", productController.getAllCategories);
// } else {
//     console.error("❌ Error: productController.getCategories খুঁজে পাওয়া যাচ্ছে না!")
// }


// // ২. প্রোডাক্ট তুলে আনার রাউট (GET /api/products)
// if (productController && productController.getProducts) {
//     router.get("/", productController.getProducts); 
// } else {
//     console.error("❌ Error: productController.getProducts খুঁজে পাওয়া যাচ্ছে না!");
// }

// //single id
// if(productController && productController.getProductById){
//     router.get("/single/:id", productController.getProductById);
// } else {
//     console.error(" Error: productController.getProductController not found");
// }

 





// // 🎯 প্রোডাক্ট আপডেট করার সঠিক ব্যাকএন্ড রাউট
// router.put("/update/:id", upload.single("mainImage"), async (req, res) => {
//   try {
//     const { id } = req.params;

//     // ফ্রন্টএন্ড থেকে আসা সাধারণ ডাটাগুলো রিসিভ করা
//     const { title, sku, price, category, fabric, inStock } = req.body;

//     // ১. সাইজ এবং কালার হ্যান্ডেল করা (যদি স্ট্রিং আকারে আসে তবে পার্স করা, নাহলে সরাসরি নেওয়া)
//     let sizes = [];
//     let colors = [];

//     if (req.body.sizes) {
//       try {
//         sizes = typeof req.body.sizes === "string" ? JSON.parse(req.body.sizes) : req.body.sizes;
//       } catch (e) {
//         sizes = req.body.sizes; // পার্স না হলে যা আছে তাই
//       }
//     }

//     if (req.body.colors) {
//       try {
//         colors = typeof req.body.colors === "string" ? JSON.parse(req.body.colors) : req.body.colors;
//       } catch (e) {
//         colors = req.body.colors;
//       }
//     }

 
//     let updatedFields = {
//       title,
//       sku,
//       price: Number(price),
//       category,
//       fabric,
//       inStock: inStock === "true" || inStock === true,
//       sizes,
//       colors
//     };

//     if (req.file) {
    
//       updatedFields.mainImage = req.file.path || req.file.filename; 
//     }

    
//     const updatedProduct = await productModel.findByIdAndUpdate(
//       id,
//       { $set: updatedFields },
//       { new: true, runValidators: true } // নতুন ডাটা রিটার্ন করবে এবং ভ্যালিডেশন চেক করবে
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found!" });
//     }
 
//     res.status(200).json({
//       success: true,
//       message: "Product updated successfully! 🎉",
//       data: updatedProduct
//     });

//   } catch (error) {
//     console.error("🚨 Backend Update Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message
//     });
//   }
// });

// export default router;  




























import express from 'express';
import productController from "../controllers/product.controller.js";
import { upload } from '../middlewares/cloudinary.js';
import productModel from '../models/product.model.js';

const router = express.Router();

// 📸 Cloudinary Multer Configuration for Multiple Fields
const cpUpload = upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 3 }
]);

// 📌 ১. প্রোডাক্ট যোগ করার রাউট (POST /api/products/add)
router.post("/add", cpUpload, productController.addProduct);

// 📌 ২. একক ফাইল আপলোডের মাধ্যমে ক্রিয়েট করা (POST /api/products/create)
router.post('/create', upload.single('mainImage'), productController.createProduct);

// 📌 ৩. সব প্রোডাক্ট লিস্ট গেট করা (GET /api/products)
router.get("/", productController.getProducts); 

// 📌 ৪. ক্যাটাগরি লিস্ট পাওয়া (GET /api/products/categories)
router.get("/categories", productController.getAllCategories);

// 📌 ৫. নির্দিষ্ট একটি প্রোডাক্ট গেট করা (GET /api/products/single/:id)
router.get("/single/:id", productController.getProductById);

// 📌 ৬. প্রোডাক্ট ডিলিট করার API (DELETE /api/products/delete/:id)
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    // ডাটাবেজ থেকে প্রোডাক্ট রিমুভ করা
    await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully! 🗑️"
    });

  } catch (error) {
    console.error("🚨 Delete Route Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

// 📌 ৭. প্রোডাক্ট আপডেট করার রাউট (PUT /api/products/update/:id)
router.put("/update/:id", upload.single("mainImage"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, sku, price, category, fabric, inStock } = req.body;

    let sizes = [];
    let colors = [];

    if (req.body.sizes) {
      try {
        sizes = typeof req.body.sizes === "string" ? JSON.parse(req.body.sizes) : req.body.sizes;
      } catch (e) {
        sizes = req.body.sizes;
      }
    }

    if (req.body.colors) {
      try {
        colors = typeof req.body.colors === "string" ? JSON.parse(req.body.colors) : req.body.colors;
      } catch (e) {
        colors = req.body.colors;
      }
    }

    let updatedFields = {
      title,
      sku,
      price: price ? Number(price) : undefined,
      category,
      fabric,
      inStock: inStock === "true" || inStock === true,
      sizes,
      colors
    };

    if (req.file) {
      updatedFields.mainImage = req.file.path || req.file.filename; 
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully! 🎉",
      data: updatedProduct
    });

  } catch (error) {
    console.error("🚨 Backend Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
});

export default router;