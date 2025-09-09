import mongoose from "mongoose"

export const connectdb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database Succesfully");
    }
    catch(error){
        console.error("Error connecting to mongodb", error);
        process.exit(1);
    }
}