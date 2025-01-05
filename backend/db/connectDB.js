import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connection SUCCESS ", conn.connection.host);
    } catch (error) {
        console.log("Error in connectDB", error.message);
        process.exit(1);
    }
}