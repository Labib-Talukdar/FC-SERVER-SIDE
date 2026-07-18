import jwt from "jsonwebtoken";

 

export const generateToken = (admin) => {
        const JWT_SECRET = process.env.JWT_SECRET;

    return jwt.sign(

        {
            id:admin._id,
            email: admin.email
        },

        process.env.JWT_SECRET,

        {
            expiresIn:"7d"
        }
    );
};