 
// import express from 'express';
// import Order from '../models/Order.js';

// const router = express.Router();

// // ১. Save client order
// router.post('/create', async (req, res) => {
//     try {
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



// // ১. অর্ডার স্টেটাস আপডেট করার API
// app.put('/api/orders/:id/status', async (req, res) => {
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

// // ২. অর্ডার ডিলিট করার API
// app.delete('/api/orders/:id', async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: "Order deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to delete order" });
//   }
// });








// export default router;



























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


















import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // BASE URL
  const BASE_URL = import.meta.env.VITE_API_URL || "https://fc-server-side.onrender.com";

  const [searchId, setSearchId] = useState(id || "");
  const [loading, setLoading] = useState(false);

  // 🎯১. currentProductId স্টেট (যা মিসিং হওয়ার কারণে ReferenceError আসছিল)
  const [currentProductId, setCurrentProductId] = useState(id || "");

  // প্রোডাক্টের অন্যান্য স্টেট
  const [title, setTitle] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [fabric, setFabric] = useState("");
  const [inStock, setInStock] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const availableColors = ["Red", "Emerald Green", "Maroon", "Navy Blue", "Black", "White"];

  // ফর্মে ডাটা বসানো এবং প্রোডাক্ট ID সেভ করার ফাংশন
  const fillFormFields = (product) => {
    setCurrentProductId(product._id); // 👈 আসল মঙ্গোডিবি ID সেভ হচ্ছে
    setTitle(product.title || "");
    setSku(product.sku || "");
    setPrice(product.price || "");
    setCategory(product.category || "");
    setFabric(product.fabric || "");
    setInStock(product.inStock !== undefined ? product.inStock : true);
    setSelectedSizes(product.sizes || []);
    setSelectedColors(product.colors || []);
    setExistingImage(product.mainImage || "");
  };

  // 🎯 ডাটা ফেচ করার স্মার্ট ফাংশন (ID বা SKU দুইটাই হ্যান্ডেল করবে)
  const fetchProductData = async (inputKey) => {
    if (!inputKey) return;
    setLoading(true);
    try {
      const isMongoDBId = /^[0-9a-fA-F]{24}$/.test(inputKey);

      if (isMongoDBId) {
        const response = await axios.get(`${BASE_URL}/api/products/single/${inputKey}`);
        const product = response.data.data || response.data.product || response.data;
        if (product) fillFormFields(product);
      } else {
        // SKU দিয়ে সার্চ করলে সব প্রোডাক্ট এনে ফিল্টার করবে
        const response = await axios.get(`${BASE_URL}/api/products`);
        const allProducts = response.data.data || response.data.products || response.data || [];

        const matchedProduct = allProducts.find(
          (p) => p.sku?.toString().trim().toLowerCase() === inputKey.trim().toLowerCase()
        );

        if (matchedProduct) {
          fillFormFields(matchedProduct);
        } else {
          alert("Product not found with this SKU!");
        }
      }
    } catch (error) {
      console.error("🚨 Error fetching product:", error);
      alert("Error loading product. Please check the ID or SKU.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductData(id);
    }
  }, [id]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      fetchProductData(searchId.trim());
    }
  };

  // 🎯২. ফিক্সড ডিলিট ফাংশন (ReferenceError এবং 404 সমস্যা সমাধান করা হয়েছে)
  const handleDeleteProduct = async () => {
    if (!currentProductId) {
      alert("No valid product loaded to delete!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");

    if (confirmDelete) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // সঠিকভাবে ব্যাকএন্ডের ডিলিট এন্ডপয়েন্টে হিট করা হচ্ছে
        const response = await axios.delete(`${BASE_URL}/api/products/delete/${currentProductId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });

        if (response.data.success || response.status === 200) {
          alert("Product deleted successfully! 🗑️");
          // ডিলিট সফল হওয়ার পর অল প্রোডাক্টস পেজে রিডাইরেক্ট (লগইন পেজে যাবে না)
          navigate('/admin/dashboard/products', { replace: true });
        }
      } catch (error) {
        console.error("Delete Failed:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Session expired or Unauthorized access!");
        } else {
          alert(error.response?.data?.message || "Failed to delete product.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const handleColorChange = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  // 🎯৩. আপডেট সাবমিট ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentProductId) {
      alert("Please load a valid product first before updating!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("sku", sku);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("fabric", fabric);
    formData.append("inStock", inStock);
    formData.append("sizes", JSON.stringify(selectedSizes));
    formData.append("colors", JSON.stringify(selectedColors));
    if (mainImage) formData.append("mainImage", mainImage);

    try {
      const res = await axios.put(`${BASE_URL}/api/products/update/${currentProductId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      if (res.data.success || res.status === 200) {
        alert("Product updated successfully! 🎉");
      }
    } catch (error) {
      console.error("🚨 Update Error:", error);
      alert(error.response?.data?.message || "Something went wrong while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-sans text-neutral-900 mt-10">
      {/* Search Bar */}
      <div className="mb-10 border border-dashed border-gray-300 p-4 bg-gray-50 rounded">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Paste Product ID or SKU here to edit..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black"
          />
          <button type="submit" className="bg-black text-white px-5 py-2 text-sm uppercase tracking-wider">
            Load Product
          </button>
        </form>
      </div>

      <h1 className="text-2xl font-light tracking-widest uppercase text-center mb-10">Edit Product Panel</h1>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Processing...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-100 p-8 bg-white shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">SKU</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full border border-gray-200 px-4 py-2.5 text-sm focus:border-black outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Stock Availability</label>
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value === "true")}
              className="w-full border border-gray-200 px-4 py-2.5 text-sm bg-white focus:border-black outline-none"
            >
              <option value="true">🟢 In Stock (Available)</option>
              <option value="false">🔴 Out of Stock (Sold Out)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-4">
              {availableSizes.map((size) => (
                <label key={size} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    className="accent-black"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Available Colors</label>
            <div className="flex flex-wrap gap-4">
              {availableColors.map((color) => (
                <label key={color} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                    className="accent-black"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Product Main Image</label>
            {existingImage && <p className="text-xs text-gray-400 mb-2 truncate">Current Image: {existingImage}</p>}
            <input type="file" onChange={(e) => setMainImage(e.target.files[0])} className="text-sm" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
            <button
              type="submit"
              className="flex-1 bg-neutral-950 text-white text-xs tracking-[0.2em] uppercase py-4 font-medium hover:bg-black transition-colors"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={handleDeleteProduct}
              className="flex-1 bg-red-600 text-white text-xs uppercase tracking-wider py-4 font-semibold hover:bg-red-700 transition-colors"
            >
              Delete Product
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;