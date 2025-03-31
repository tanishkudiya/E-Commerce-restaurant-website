import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://tanishkudiya365:Kf711hspLFz9ZCux@cluster0.xskys.mongodb.net/restaurant')
    .then(()=>{
        console.log("DB Connected");
    })
}