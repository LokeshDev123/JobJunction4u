
import mongoose from "mongoose";

const dbToConnect=async()=>{
    try {
    
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Database connected successfully");
    } catch (error) {
        
        console.log(error);
    
    }
}

export default dbToConnect