import { adminLoginService } from "../services/auth.service.js";
import cookieOptions from "../config/cookieOptions.js";

export const adminLogin = async (req,res) => {
    try{
        const result = await adminLoginService(req.body);

        res 
            .cookie("token", result.token,cookieOptions )
            .status(200)
            .json({
                success:true,
                message:result.message,
                admin: result.admin
            });

        
    }catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Data:", error.response?.data);

  alert(error.response?.data?.message || "Login Failed");
}
}