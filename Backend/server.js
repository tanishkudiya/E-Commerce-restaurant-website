import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

// App config
const app = express();
const port = 8080;

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve Frontend
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Serve Admin Panel
app.use("/admin", express.static(path.join(_dirname, "/Admin/dist")));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "Admin", "dist", "index.html"));
});

// Health check route
app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
