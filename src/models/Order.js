 

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        shippingArea: { type: String },
        fullAddress: { type: String, required: true },
        orderNote: { type: String },
        paymentMethod: { type: String }
    },
    items: [
        {
            _id: { type: String },
            title: { type: String },
            size: { type: String },
            color: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            mainImage: { type: String }
        }
    ],
    status: {
        type: String,
        
        default: "pending",
        lowercase:true 
    },


    subtotal: { type: Number },
    shippingCharge: { type: Number },
    grandTotal: { type: Number },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);