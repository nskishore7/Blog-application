import mongoose from "mongoose";

export async function dbConnection(){
    try {
        await mongoose.connect("mongodb://localhost:27017/Project")
        console.log("mongodb connected")
    } catch (error) {
        console.log("db connection failed")
    }
}