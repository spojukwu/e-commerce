const express = require("express")
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require("../controllers/category");

const router = express.Router(); 


// Category routes  
router.post('/categories', createCategory);  
router.get('/categories', getAllCategories);  
router.get('/categories/:id', getCategoryById);  
router.put('/categories/:id', updateCategory);  
router.delete('/categories/:id', deleteCategory);


module.exports = { categoryRoutes }; 