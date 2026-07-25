 

// import express from 'express';
// import Order from '../models/Order.js';

// const router = express.Router();

// // ১. Save client order
// router.post('/create', async (req, res) => {
//     try {
//         const orderData = {
//             ...req.body,
//             status: req.body.status || 'pending'
//         };


//         const newOrder = new Order(req.body);
//         await newOrder.save();
//         res.status(201).json({ success: true, message: "Order placed successfully!", order: newOrder });
//     } catch (error) {
//         console.error("Order Creation Error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ২. Send all orders to admin panel 
// router.get('/all', async (req, res) => {
//     try {
//         const orders = await Order.find().sort({ createdAt: -1 });
//         res.status(200).json(orders);
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ৩. Admin dashboard count (total orders)
// router.get('/stats', async (req, res) => {
//     try {
//         const totalOrders = await Order.countDocuments();
//         res.status(200).json({ totalOrders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // ৪. অর্ডার স্টেটাস আপডেট করার API (Fixed)
// router.put('/:id/status', async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id, 
//       { status: req.body.status }, 
//       { new: true }
//     );
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to update status" });
//   }
// });

// // ৫. অর্ডার ডিলিট করার API (Fixed)
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Order.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Order deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ error: "Failed to delete order" });
// //   }
// // });



// // Product Router Example
// router.delete('/delete/:id', async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.status(200).json({ success: true, message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to delete product" });
//   }
// });

// export default router;

















 
 
 
 import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// ১. Save client order
router.post('/create', async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            status: req.body.status || 'pending'
        };

        const newOrder = new Order(orderData);
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

// ৪. অর্ডার স্টেটাস আপডেট করার API
router.put('/:id/status', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// ৫. অর্ডার ডিলিট করার API (Active)
// router.delete('/:id', async (req, res) => {
//   console.log("Sending delete request for ID:", orderId); // 👈 চেক ১
//   console.log("API BaseURL is:", API.defaults.baseURL);
//   try {
//     const deletedOrder = await Order.findByIdAndDelete(req.params.id);

//     if (!deletedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.status(200).json({ success: true, message: "Order deleted successfully" });
//   } catch (err) {
//     console.error("Delete Order Error:", err);
//     res.status(500).json({ success: false, message: "Failed to delete order" });
//   }
// });


// ৫. অর্ডার ডিলিট করার API
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Delete Request Received for ID:", id);

  try {
    // আইডি সঠিক Mongo ObjectId কি না চেক
    if (!id || id.length !== 24) {
      return res.status(400).json({ success: false, message: "Invalid Order ID format" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: "Order not found in database" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("🚨 BACKEND DELETE ERROR:", err);
    res.status(500).json({ success: false, message: err.message || "Failed to delete order" });
  }
});



export default router;