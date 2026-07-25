
// import productService from "../services/product.service.js";
 
// const addProduct = async (req, res, next) => {
//   try {
//     const productData = { ...req.body };

//     if (typeof productData.sizes === "string") productData.sizes = JSON.parse(productData.sizes);
//     if (typeof productData.colors === "string") productData.colors = JSON.parse(productData.colors);

//     // 💡 Main Image set - Cloudinary URL পাওয়া যাবে path ফিল্ডে
//     if (req.files && req.files["mainImage"]) {
//       productData.mainImage = req.files["mainImage"][0].path; // 👈 /uploads/ বাদ দিয়ে path দেওয়া হলো
//     } else {
//       return res.status(400).json({ success: false, message: "Main image is required!" });
//     }

//     // 💡 Gallery Images set - Cloudinary URLs
//     if (req.files && req.files["galleryImages"]) {
//       productData.galleryImages = req.files["galleryImages"].map((file) => file.path);
//     } else {
//       productData.galleryImages = [];
//     }

//     const newProduct = await productService.createProduct(productData);

//     res.status(201).json({
//       success: true,
//       message: "Product published successfully with Cloudinary images!",
//       data: newProduct,
//     });
//   } catch (error) {
//     next(error);
//   }
// };



// // product send of frontend controller
// const getProducts = async (req,res,next) => {
//     try{
//         const {color, category} = req.query;

//         const products = await productService.getAllProducts({color,category});

//        return res.status(200).json({
//             success: true,
//             count: products.length,
//             data: products,
//         });
//     } catch (error) {
//         next(error)
//     }
// };

// //category list controller
// const getAllCategories = async(req,res,next) => {
//     try {
//         const categories = await productService.getAllCategories();

//         res.status(200).json({
//             success: true,
//             data: categories,
//         });
//     } catch(error) {
//         next(error)
//     }
// };

// const getProductById = async (req,res,next) => {
//     try {
//         // const product = await Product.findById(req.params.id);
//         const product = await productService.getProductById(req.params.id)
//         if(!product) 
//             return res.status(404).json({success: false, message: "product not found"})
//     return res.status(200).json({success: true,data: product});
//     } catch (error) {
//          next(error)
//     }
// }


//  // প্রোডাক্ট আপডেট করার কন্ট্রোলার
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // ফ্রন্টএন্ড থেকে পাঠানো সব ডাটা রিসিভ করা
//     const updatedData = {
//       title: req.body.title,
//       sku: req.body.sku,
//       price: Number(req.body.price),
//       category: req.body.category,
//       fabric: req.body.fabric,
//       sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [], // অ্যারে আকারে কনভার্ট
//       colors: req.body.colors ? JSON.parse(req.body.colors) : [],
//       inStock: req.body.inStock === 'true' || req.body.inStock === true
//     };

//      // if image upload main image
//     if (req.files && req.files['mainImage']) {
//       updatedData.mainImage = `/uploads/${req.files['mainImage'][0].filename}`;
//     }

//     const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({ success: true, message: "Product updated successfully", data: product });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };


// export const createProduct = async(req,res)=> {
//     try{
//         const mainImageUrl = req.file ? req.file.path: "";

//         console.log("Cloudinary URL check:", mainImageUrl);

//         const productData = {
//             ...req.body,
//             mainImage: mainImageUrl,
//         };

//         const newProduct = await productService.createProduct(productData);


//         res.status(201).json({
//             success: true,
//             message: "Product created successfully!",
//             data: newProduct
//         });
//     } catch(error) {
//         res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



 
// export default {addProduct,getProducts,getAllCategories,getProductById,updateProduct}


 

































import productService from "../services/product.service.js";

// ১. প্রোডাক্ট যোগ করার কন্ট্রোলার (Cloudinary Support সহ)
const addProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    // JSON parsing for arrays from FormData
    if (typeof productData.sizes === "string") {
      productData.sizes = JSON.parse(productData.sizes);
    }
    if (typeof productData.colors === "string") {
      productData.colors = JSON.parse(productData.colors);
    }

    // Data type conversions
    if (productData.price) {
      productData.price = Number(productData.price);
    }
    if (productData.inStock !== undefined) {
      productData.inStock = productData.inStock === "true" || productData.inStock === true;
    }

    // Main Cover Image Check
    if (req.files && req.files["mainImage"] && req.files["mainImage"][0]) {
      productData.mainImage = req.files["mainImage"][0].path;
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Main cover image is required!" 
      });
    }

    // Gallery Images Check
    if (req.files && req.files["galleryImages"]) {
      productData.galleryImages = req.files["galleryImages"].map((file) => file.path);
    } else {
      productData.galleryImages = [];
    }

    const newProduct = await productService.createProduct(productData);

    return res.status(201).json({
      success: true,
      message: "Product published successfully with Cloudinary images!",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ২. সিঙ্গেল ফাইল প্রোডাক্ট তৈরি (বিকল্প)
const createProduct = async (req, res, next) => {
  try {
    const mainImageUrl = req.file ? req.file.path : "";

    const productData = {
      ...req.body,
      mainImage: mainImageUrl,
    };

    const newProduct = await productService.createProduct(productData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ৩. প্রোডাক্ট গেট করা
const getProducts = async (req, res, next) => {
  try {
    const { color, category } = req.query;
    const products = await productService.getAllProducts({ color, category });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ৪. ক্যাটাগরি লিস্ট গেট করা
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await productService.getAllCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// ৫. আইডি দিয়ে প্রোডাক্ট খোঁজা
const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

// ৬. প্রোডাক্ট আপডেট করা
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedData = {
      title: req.body.title,
      sku: req.body.sku,
      price: req.body.price ? Number(req.body.price) : undefined,
      category: req.body.category,
      fabric: req.body.fabric,
      shirtDetails: req.body.shirtDetails,
      dupattaDetails: req.body.dupattaDetails,
      trouserDetails: req.body.trouserDetails,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      colors: req.body.colors ? JSON.parse(req.body.colors) : [],
      inStock: req.body.inStock === "true" || req.body.inStock === true,
    };

    if (req.files && req.files["mainImage"] && req.files["mainImage"][0]) {
      updatedData.mainImage = req.files["mainImage"][0].path;
    }

    const product = await productService.updateProduct(id, updatedData);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Named Export (যা এরর দূর করবে)
export {
  addProduct,
  createProduct,
  getProducts,
  getAllCategories,
  getProductById,
  updateProduct,
};

// Default Export
export default {
  addProduct,
  createProduct,
  getProducts,
  getAllCategories,
  getProductById,
  updateProduct,
};