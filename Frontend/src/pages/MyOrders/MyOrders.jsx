import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { Package } from "lucide-react";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            if (!token) return;
            const response = await axios.post(url + "/api/order/userorder", {}, { headers: { token } });
            setData(response.data.data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <Package size={32} className="order-icon" />
                            <p>
                                {order.items.map((item) => `${item.name} x ${item.quantity}`).join(", ")}
                            </p>
                            <p>₹{order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p className="order-status">
                                <span className="status-dot">&#x25cf;</span> {order.status}
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
