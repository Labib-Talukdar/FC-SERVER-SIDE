// import { adminLoginService } from "../services/auth.service.js";
// import cookieOptions from "../config/cookieOptions.js";

// export const adminLogin = async (req,res) => {
//     try{
//         const result = await adminLoginService(req.body);

//         const productionCookieOptions = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none",
//             maxAge: 24 * 60 * 60 * 1000
//         }

//         res 
//             .cookie("token", result.token,cookieOptions )
//             .status(200)
//             .json({
//                 success:true,
//                 message:result.message,
//                 admin: result.admin
//             });

        
//     }catch (error) {
//   console.log("Error in adminLogin:", error.message);
//   res.status(error.status || 500).json({
//     success: false,
//     message:error.message || "Internal Server Error"
//   });
 
// }
// };












import { adminLoginService } from "../services/auth.service.js";

export const adminLogin = async (req, res) => {
  try {
    const result = await adminLoginService(req.body);

    // ✅ সঠিক কুকি অপশন
    const cookieOptions = {
      httpOnly: true,
      secure: true,       // Cross-site (Render to custom domain)-এর জন্য আবশ্যক
      sameSite: "none",   // 'none' না দিলে ব্রাউজার কুকি ব্লক করে দেয়
      maxAge: 24 * 60 * 60 * 1000, // ১ দিন
    };

    // ✅ সঠিকভাবে 'cookieOptions' পাস করা হলো
    return res
      .cookie("token", result.token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: result.message,
        admin: result.admin,
      });

  } catch (error) {
    console.error("Error in adminLogin:", error.message);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};