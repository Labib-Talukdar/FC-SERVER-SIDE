// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customer: {
//         fullName: { type: String, required: true },
//         phone: { type: String, required: true },
//         email: { type: String },
//         shippingArea: { type: String },
//         fullAddress: { type: String, required: true },
//         orderNote: { type: String },
//         paymentMethod: { type: String }
//     },
//     items: [
//         {
//             productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
//             title: String,
//             _id: String,
//             size: String,
//             color:String,
//             price: Number,
//             quantity: Number
//         }
//     ],
//     subtotal:Number,
//     shippingCharge: Number,
//     grandTotal: Number,
//     totalAmount: {type: Number,required:true},
//     status:{type: String, default: "Pending"}
// }, {timestamps:true});

// export default mongoose.model("Order", orderSchema);













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
    subtotal: { type: Number },
    shippingCharge: { type: Number },
    grandTotal: { type: Number },
    status: { type: String, default: "Pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);