import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://sarfarazahmed1012:IpVzfaYSa2aIZy7o@cluster0.mlfbx.mongodb.net/graphql");
        console.log("MongoDB connection SUCCESS ", conn.connection.host);
    } catch (error) {
        console.log("Error in connectDB", error.message);
        process.exit(1);
    }
}