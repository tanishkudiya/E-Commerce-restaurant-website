import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Package } from 'lucide-react';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch orders");
    }
  };

  const statusHandler = async(event, orderId)=>{
    const response = await axios.post(url + "/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-item">
              <Package size={36}  className='order-icon'/>
              <div>
                <p className="order-item-food">
                  {order.items.map((item, idx) =>
                    idx === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>
                <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                <div className="order-item-address">
                  {order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>{order.amount}</p>
              <select onChange={()=>statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delievery">Out for delievery</option>
                <option value="Delievered">Delievered</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
