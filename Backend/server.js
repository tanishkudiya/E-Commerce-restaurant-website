import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import path from "path";

// App config
const app = express();
const port = 8080;

// Fix: Ensure correct path resolution
const __dirname = path.resolve();
const frontendPath = path.join(__dirname, "../Frontend/dist");
const adminPath = path.join(__dirname, "../Admin/dist");

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

// ✅ Serve Frontend
console.log("Serving Frontend from:", frontendPath);
app.use(express.static(frontendPath));

// ✅ Serve Admin Panel
console.log("Serving Admin Panel from:", adminPath);
app.use("/admin", express.static(adminPath));

// ✅ Handle routes correctly
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(adminPath, "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Health check route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
