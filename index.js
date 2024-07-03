import mongoose from "mongoose";

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB is Connected");
})
.catch((err)=>{
    console.log(err);
})