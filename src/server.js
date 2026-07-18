 
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log("আমার সিক্রেট চাবি হলো:", process.env.JWT_SECRET);
});