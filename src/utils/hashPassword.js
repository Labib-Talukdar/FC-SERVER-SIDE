// import dotenv from "dotenv";
import bcrypt from "bcrypt"

 
const password ="GN765@GN"

const hash = await bcrypt.hash(password,10)
console.log(hash)

 