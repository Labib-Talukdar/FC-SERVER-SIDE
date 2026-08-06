 
import productService from "../services/product.service.js";

// 📌 ১. প্রোডাক্ট যোগ করা
const addProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    // 👈 subCategory ব্যাকএন্ডে Safe String হিসেবে রাখার জন্য (Optional Check)
    if (!productData.subCategory) {
      productData.subCategory = "";
    }

    // সাইজ ও কালার পার্সিং (Safe JSON Parsing)
    if (typeof productData.sizes === "string") {
      try { productData.sizes = JSON.parse(productData.sizes); } catch (e) { productData.sizes = []; }
    }
    if (typeof productData.colors === "string") {
      try { productData.colors = JSON.parse(productData.colors); } catch (e) { productData.colors = []; }
    }

    // টাইপ কনভার্সন
    if (productData.price) productData.price = Number(productData.price);

    // new product create time originalPrice ke number e cast kora
    if(productData.originalPrice) {
      productData.originalPrice = Number(productData.originalPrice);

    }else{
      productData.originalPrice = 0;
    }


    productData.inStock = productData.inStock === "true" || productData.inStock === true;

    // মেইন ইমেজ চেক
    if (req.files && req.files["mainImage"] && req.files["mainImage"][0]) {
      productData.mainImage = req.files["mainImage"][0].path;
    } else {
      return res.status(400).json({
        success: false,
        message: "Main cover image is required!"
      });
    }

    // গ্যালারি ইমেজ চেক
    if (req.files && req.files["galleryImages"] && req.files["galleryImages"].length > 0) {
      productData.galleryImages = req.files["galleryImages"].map((file) => file.path);
    } else {
      productData.galleryImages = [];
    }

    const newProduct = await productService.createProduct(productData);

    return res.status(201).json({
      success: true,
      message: "Product published successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.error("🚨 CRITICAL BACKEND ERROR IN ADD PRODUCT:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create product in database",
    });
  }
};

// 📌 ২. সব প্রোডাক্ট লিস্ট আনা (ফিল্টার সহ - subCategory যোগ করা হয়েছে)
const getProducts = async (req, res, next) => {
  try {
    // 👈 subCategory কুয়েরি প্যারামিটার রিসিভ করা হচ্ছে
    const { color, category, subCategory } = req.query;

    const products = await productService.getAllProducts({ color, category, subCategory });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("🚨 GET PRODUCTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch products",
    });
  }
};

// 📌 ৩. ক্যাটাগরি লিস্ট আনা
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await productService.getAllCategories();

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("🚨 GET CATEGORIES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories",
    });
  }
};

// 📌 ৪. নির্দিষ্ট একটি প্রোডাক্ট আনা
const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("🚨 GET PRODUCT BY ID ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch product",
    });
  }
};

export default { addProduct, getProducts, getAllCategories, getProductById };