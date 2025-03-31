import userModel from "../models/userModel.js"; 

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        // Fetch the user
        let userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Ensure cartData exists
        let cartData = await userData.cartData || {};

        // Update the cart
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        // Assign updated cartData back to userData
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({ success: true, message: "Added to Cart" });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



// remove items from user Cart
const removeFromCart = async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({ success: true, message: "Remove From Cart" });

    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// fetch user cart data
const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addToCart, removeFromCart, getCart};