
import productService from "../services/product.service.js";

// product add control
// const addProduct = async (req,res,next) => {
//     try {
//         const productData =  {...req.body};

//         if(typeof productData.sizes === "string") productData.sizes = JSON.parse(productData.sizes);
//         if(typeof productData.colors === "string") productData.colors = JSON.parse(productData.colors);

//          //set main image path
//          if(req.files && req.files["mainImage"]) {
//             productData.mainImage = `/uploads/${req.files["mainImage"][0].filename}`;

//          }else {
//             return res.status(400).json({success:false, message: "Main image is"})
//          }

//          // all gallery image file path set the array
//          if(req.files && req.files["galleryImages"]) {
//             productData.galleryImages = req.files["galleryImages"].map(
//                 (file) => `/uploads/${file.filename}`
//             );
//          } else{
//             productData.galleryImages = [];
//          }
         
 

//         // SKU duplicate check
//         const newProduct = await productService.createProduct(productData);

//         res.status(201).json({
//             success: true,
//             message: "Product published successfully with images! ",
//             data: newProduct,
//         });    
//     } catch (error) {
//         next(error);
//     }
// };


// product add control (Cloudinary Support)
const addProduct = async (req, res, next) => {
  try {
    const productData = { ...req.body };

    if (typeof productData.sizes === "string") productData.sizes = JSON.parse(productData.sizes);
    if (typeof productData.colors === "string") productData.colors = JSON.parse(productData.colors);

    // 💡 Main Image set - Cloudinary URL পাওয়া যাবে path ফিল্ডে
    if (req.files && req.files["mainImage"]) {
      productData.mainImage = req.files["mainImage"][0].path; // 👈 /uploads/ বাদ দিয়ে path দেওয়া হলো
    } else {
      return res.status(400).json({ success: false, message: "Main image is required!" });
    }

    // 💡 Gallery Images set - Cloudinary URLs
    if (req.files && req.files["galleryImages"]) {
      productData.galleryImages = req.files["galleryImages"].map((file) => file.path);
    } else {
      productData.galleryImages = [];
    }

    const newProduct = await productService.createProduct(productData);

    res.status(201).json({
      success: true,
      message: "Product published successfully with Cloudinary images!",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};



// product send of frontend controller
const getProducts = async (req,res,next) => {
    try{
        const {color, category} = req.query;

        const products = await productService.getAllProducts({color,category});

       return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error)
    }
};

//category list controller
const getAllCategories = async(req,res,next) => {
    try {
        const categories = await productService.getAllCategories();

        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch(error) {
        next(error)
    }
};

const getProductById = async (req,res,next) => {
    try {
        // const product = await Product.findById(req.params.id);
        const product = await productService.getProductById(req.params.id)
        if(!product) 
            return res.status(404).json({success: false, message: "product not found"})
    return res.status(200).json({success: true,data: product});
    } catch (error) {
         next(error)
    }
}


 // প্রোডাক্ট আপডেট করার কন্ট্রোলার
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ফ্রন্টএন্ড থেকে পাঠানো সব ডাটা রিসিভ করা
    const updatedData = {
      title: req.body.title,
      sku: req.body.sku,
      price: Number(req.body.price),
      category: req.body.category,
      fabric: req.body.fabric,
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [], // অ্যারে আকারে কনভার্ট
      colors: req.body.colors ? JSON.parse(req.body.colors) : [],
      inStock: req.body.inStock === 'true' || req.body.inStock === true
    };

     // if image upload main image
    if (req.files && req.files['mainImage']) {
      updatedData.mainImage = `/uploads/${req.files['mainImage'][0].filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const createProduct = async(req,res)=> {
    try{
        const mainImageUrl = req.file ? req.file.path: "";

        console.log("Cloudinary URL check:", mainImageUrl);

        const productData = {
            ...req.body,
            mainImage: mainImageUrl,
        };

        const newProduct = await productService.createProduct(productData);


        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: newProduct
        });
    } catch(error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



 
export default {addProduct,getProducts,getAllCategories,getProductById,updateProduct}