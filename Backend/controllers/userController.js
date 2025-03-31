import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Function to create JWT Token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Token expires in 7 days
};

// 🚀 Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate token
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 🚀 Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password length
        if (typeof password !== "string" || password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hash password securely
        const saltRounds = 10; // Ensure a valid number of rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const user = await newUser.save();

        // Generate token
        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export { loginUser, registerUser };
