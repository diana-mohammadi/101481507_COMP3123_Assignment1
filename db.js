import mongoose from "mongoose";
export async function connectDatabase(uri) {
    //strict query filtering to prevent typos
    mongoose.set("strictQuery",true);
    //connect to mongodb atlas
    await mongoose.connect(uri);
    console.log("Mongodb connected")

    
}