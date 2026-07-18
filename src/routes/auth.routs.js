import express from "express"
import { adminLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/admin-login", adminLogin,
    (req,res)=> {
        res.json({
            message:"user login"
        })
    }
);


export default router