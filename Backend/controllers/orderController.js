import userModel from "../models/userModel.js";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "https://e-commerce-restaurant-website-3-frontend.onrender.com/"; // Centralized for reuse

// 🛒 Place Order API
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Create new order
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.price * 100, // Convert to paise
            },
            quantity: item.quantity,
        }));

        // ✅ Apply delivery charge only if total amount is ≤ ₹200
        if (amount <= 200) {
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: { name: "Delivery Charges" },
                    unit_amount: 40 * 100, // Convert to paise
                },
                quantity: 1,
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}&userId=${userId}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}&userId=${userId}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Order placement failed" });
    }
};

// ✅ Verify Order (After Payment)
const verifyOrder = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            // ✅ Clear cart only when payment is successful
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({ success: true, message: "Payment successful" });
        } else {
            // ❌ If payment fails, order is deleted but cart remains unchanged
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order canceled but cart is unchanged" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Verification error" });
    }
};

// 📦 Fetch User Orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error retrieving orders" });
    }
};

// 📋 Admin - List All Orders
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error listing orders:", error);
        res.status(500).json({ success: false, message: "Error retrieving orders" });
    }
};

// 🔄 Update Order Status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
