const Category = require("../model/category.model")
const mongoose = require("mongoose");


// @desc    Get all categories
// @route   GET /api/category
// @access  Public
exports.getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find({});
        
        if(!categories || categories.length === 0) {
            return res.status(400).json({success: false, message:"No categories found"})  
        }

        res.json({success: true, categories });
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
      }
}


// @desc    Get single category
// @route   GET /api/category/:id
// @access  Public
exports.getCategory = async(req,res) => {
    try {
        const {categoryId} = req.params

        var validId = mongoose.Types.ObjectId.isValid(categoryId);
        if(validId) {
        const category = await Category.findById(categoryId)
        return res.json({success: true, category });
        }   
        res.status(400).json({success: false, message:"Cannot find category"})    
    } catch (error) {
        res.status(500).json({success: false, message:error.message})
        console.log(error)
      }
}