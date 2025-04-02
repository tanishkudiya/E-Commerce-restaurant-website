import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

//app config
const app = express();
const port = 8080;

const _dirname = path.resolve();

// middleware
app.use(express.json());

app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(express.static(path.join(_dirname,"/Frontend/dist")));
app.get('*',(req,res)=>{
    res.send(File(path.resolve(_dirname,"Frontend","dist","index.html")))
});

app.get("/",(req,res)=>{
    res.send("API Working");
})

app.listen(port,()=>{
    console.log("Server is working well");
})
