import React, { useContext } from "react";
import "./FoodItem.css";
import { Minus, Plus, ShoppingCart } from "lucide-react"; // Importing Lucide Icon
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, image, description }) => {

  const { addToCart, cartItems, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={url + "/images/" + image} className="food-item-image" alt={name} />
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-description">{description}</p>

        <div className="price-cart">
          <p className="food-item-price">₹{price}/-</p>

          {/* Add to Cart Button */}
          {
            !cartItems[id] ?
              <button className="add-to-cart-btn add" onClick={() => addToCart(id)}>
                <ShoppingCart size={20} /> Add to Cart
              </button> :
              <div className="food-item-counter">
                <div onClick={() => removeFromCart(id)}><Minus size={20} /></div>
                <p>{cartItems[id]}</p>
                <div onClick={() => addToCart(id)}> <Plus size={20} /> </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
