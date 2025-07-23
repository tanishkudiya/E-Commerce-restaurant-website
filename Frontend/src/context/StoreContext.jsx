import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food as foodData } from "../../data/data";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart data from localStorage on initial render
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const url = "http://localhost:8080";

    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [foodItems, setFoodItems] = useState(foodData || []);


    // Add item to cart
    const addToCart = async (itemId) => {
        if(token){
            setCartItems((prev) => {
                const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
                localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage
                return updatedCart;
            });
    
            if (token) {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            }
        }
    };

    // Remove item from cart (Prevent negative values)
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (!prev[itemId] || prev[itemId] <= 1) {
                delete updatedCart[itemId]; // Remove item if count ≤ 1
            } else {
                updatedCart[itemId] = prev[itemId] - 1;
            }
            localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Save to localStorage
            return updatedCart;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const itemInfo = foodItems.find((product) => product._id === itemId);
            return itemInfo ? total + itemInfo.price * quantity : total;
        }, 0);
    };

    // Fetch food list from API
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodItems(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Update token in localStorage when it changes
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    // Load cart data from API if logged in
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            const cartData = response.data.cartData || {};
            setCartItems(cartData);
            localStorage.setItem("cartItems", JSON.stringify(cartData)); // Store in localStorage
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Load food list and cart data on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Error loading data:", error);
            }
        };

        loadData();
    }, []); // Runs only once on component mount

    // Update localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const contextValue = {
        food: foodItems,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
