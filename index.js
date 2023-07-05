import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
dotenv.config();

const app = express();

app.use(bodyParser.json())
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO)
  
      console.log('MongoDB connected!!')
    } catch (err) {
      console.log('Failed to connect to MongoDB', err)
    }
}
app.listen(8800,()=>{
    connect();
    console.log("connected to server !")
});

app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);

//middleware

app.use((err,req,res,next) =>{
  const status = err.status || 500;
  const message = err.message || "something went wrong";

  return res.status(status).json({
    success:false,
    status,
    message,
  }); 
});




