// import dotenv from "dotenv";
import bcrypt from "bcrypt"

 
const password ="1234567"

const hash = await bcrypt.hash(password,10)
console.log(hash)

 