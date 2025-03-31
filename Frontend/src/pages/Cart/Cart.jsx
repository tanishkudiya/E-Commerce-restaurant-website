import React, { useContext } from 'react';
import "./Cart.css";
import { StoreContext } from '../../context/StoreContext';
import { Trash2 } from "lucide-react"; // Import delete icon
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div className='carting'>
      <div className="cart container">
        <div className="cart-items">
          <div className="cart-items-header">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr className="cart-divider" />

          {Object.values(cartItems).reduce((total, qty) => total + qty, 0) === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty 🛒</h3>
              <p>Looks like you haven’t added anything to your cart yet.</p>
            </div>
          ) : (
            food.map((item) =>
              cartItems[item._id] > 0 && (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={ url + "/images/" + item.image } alt={item.name} className="cart-item-image" />
                    <p>{item.name}</p>
                    <p>₹{item.price.toFixed(2)}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <hr />
                </div>
              )
            )
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() > 200 ? 0 : 40}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  ₹{getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() > 200
                      ? getTotalCartAmount()
                      : getTotalCartAmount() + 40}
                </b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>Proceed to CheckOut</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a Promo Code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='Promo Code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
