const category = require('../models/category');
  

// Create a Category  
const createCategory = async (req, res) => {  
    try {  
        const { name, description } = req.body;  
        const newCategory = new category({ name, description });  
        const savedCategory = await newCategory.save();  
        res.status(201).json({ message: 'Category created successfully', category: savedCategory });  
    } catch (error) {  
        res.status(500).json({ message: 'Error creating category', error: error.message });  
    }  
};  

// Read all Categories  
const getAllCategories = async (req, res) => {  
    try {  
        const categories = await Category.find();  
        res.status(200).json(categories);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching categories', error: error.message });  
    }  
};  

// Read a single Category by ID  
const getCategoryById = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const category = await Category.findById(id);  
        if (!category) {  
            return res.status(404).json({ message: 'Category not found' });  
        }  
        res.status(200).json(category);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching category', error: error.message });  
    }  
};  

// Update a Category  
const updateCategory = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { name, description } = req.body;  
        const updatedCategory = await Category.findByIdAndUpdate(  
            id,  
            { name, description, updatedAt: Date.now() },  
            { new: true, runValidators: true }  
        );  
        if (!updatedCategory) {  
            return res.status(404).json({ message: 'Category not found' });  
        }  
        res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });  
    } catch (error) {  
        res.status(500).json({ message: 'Error updating category', error: error.message });  
    }  
};  

// Delete a Category  
const deleteCategory = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const deletedCategory = await Category.findByIdAndDelete(id);  
        if (!deletedCategory) {  
            return res.status(404).json({ message: 'Category not found' });  
        }  
        res.status(200).json({ message: 'Category deleted successfully' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error deleting category', error: error.message });  
    }  
};  

module.exports = {  
    createCategory,  
    getAllCategories,  
    getCategoryById,  
    updateCategory,  
    deleteCategory  
};  