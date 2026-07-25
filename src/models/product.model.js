
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {type: String, require: true, trim: true},
        sku: {type: String, require: true, unique: true, trim: true},
        price:{type: Number, require: true,},
        category:{type: String, require: true},
        subCategory: {
            type: String,
            default:""
        },
        fabric: {type:String},
        shirtDetails: {type: String},
        dupattaDetails:{type: String},
        trouserDetails:{type: String},
        sizes: [{type: String}], // Array of strings (s,m,....)
        colors: [{type:String}], // Array of strings for frontend filtering
        inStock: {type:Boolean, default: true},
        mainImage: {type: String, require: true}, // Main cover Image URL
        galleryImages: [{ type: String}] // Array of 3 sub-gallery image URLs
    }, 
    {timestamp: true}
);

 
export default mongoose.model("Product",productSchema)

 