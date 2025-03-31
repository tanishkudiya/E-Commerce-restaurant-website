import foodModel from "../models/foodModels.js";
import fs from "fs";

const addFood = async (req, res) => {
    console.log("Received Body:", req.body);
    console.log("Received File:", req.file); 

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: req.file.filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// all food list
const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
        console.log(foods);
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


// remove food item
const removeFood = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"});
        console.log(food);
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {addFood, listFood, removeFood}