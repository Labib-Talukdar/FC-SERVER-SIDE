 
import Product from "../models/product.model.js"; // ✅ নাম মিলিয়ে ইমপোর্ট করো

const createProduct = async (productData) => {
    const product = new Product(productData); // ✅ এখন কাজ করবে
    return await product.save();
};

const getAllProducts = async (filter) => {
    const query = {};

    // if from frontend come to data filter
    if (filter.color) {
        query.colors = filter.color; // ⚠️ নিচে নোট দেখো - schema তে ফিল্ড নাম "colors" (plural)
    }

    // category filter
    if (filter.category) {       // ✅ filters না, filter (প্যারামিটারের নামের সাথে মিল রাখতে হবে)
         

        query.category = filter.category;
    }
    console.log("Mongoose Executing Query", query)

    const products = await Product.find(query);
    return await Product.find(query).sort({ createdAt: -1 });
};

const getAllCategories = async() => {
    const categories = await Product.distinct("category");
    return categories.filter(Boolean);
}

const getProductById = async(id) => {
    return await Product.findById(id);
}

export default { createProduct, getAllProducts,getAllCategories,getProductById };