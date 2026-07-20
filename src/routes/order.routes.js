// import express from 'express';
// import Order from '../models/Order.js';


// const router = express.Router();


// // save client order
// router.post('/create', async (req,res) => {
//     try{
//         const newOrder = new Order(req.body);
//         await newOrder.save();
//         res.status(201).json({success: true, message: "Order placed successfully!", order: newOrder});
//         res.status(201).json({success: true, message:error.message})
//     } catch (error) {
//         res.status(500).json({success: false, message:error.message})
//     }
// })


// // send all order admin panel 
// router.get('/all', async(req,res) => {
//     try{
//         const orders = await Order.find().sort({createdAt: -1});
//         res.status(200).json(orders);
//     } catch(error) {
//         res.status(5000).json({success: false, message: error.message});
//     }
// });


// // admin dashboard e count (total orders)
// router.get('/stats', async(req,res) => {
//     try{
//         const totalOrders = await Order.countDocuments();
//         res.status(200).json({totalOrders})
//     } catch(error) {
//         res.status(500).json({success: false, message: error.message});
//     }
// });

// export default router;






























import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// ১. Save client order
router.post('/create', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ success: true, message: "Order placed successfully!", order: newOrder });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ২. Send all orders to admin panel 
router.get('/all', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ৩. Admin dashboard count (total orders)
router.get('/stats', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ totalOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;