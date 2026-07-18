import {db} from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const adminLoginService = async (loginData) => {
    console.log(loginData);

    const {email,password} = loginData;

    const adminCollection = db.collection("admins");

    const admin = await adminCollection.findOne({email});
    const token = generateToken(admin)

    if(!admin) {
        throw new Error("Invalid Email")
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        admin.password
    );

 

    if (!isPasswordMatch) {
        throw new Error("Invalid Password");
    }



    return{
        success:true,
        message:"Login Successful",
        admin: {
            id: admin._id,
            name: admin.name,
            email:admin.email
        },
        token
    };
};