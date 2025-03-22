const Product = require('./models/Product'); 

// Create a Product  
const createProduct = async (req, res) => {  
    try {  
        const { name, description, price, images, category, inventory } = req.body;  
        const newProduct = new Product({  
            name,  
            description,  
            price,  
            images,  
            category,  
            inventory  
        });  
        const savedProduct = await newProduct.save();  
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });  
    } catch (error) {  
        res.status(500).json({ message: 'Error creating product', error: error.message });  
    }  
};  

// Read all Products  
const getAllProducts = async (req, res) => {  
    try {  
        const products = await Product.find().populate('category');  
        res.status(200).json(products);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching products', error: error.message });  
    }  
};  

// Read a single Product by ID  
const getProductById = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const product = await Product.findById(id).populate('category');  
        if (!product) {  
            return res.status(404).json({ message: 'Product not found' });  
        }  
        res.status(200).json(product);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching product', error: error.message });  
    }  
};  

// Update a Product  
const updateProduct = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { name, description, price, images, category, inventory } = req.body;  
        const updatedProduct = await Product.findByIdAndUpdate(  
            id,  
            { name, description, price, images, category, inventory, updatedAt: Date.now() },  
            { new: true, runValidators: true }  
        ).populate('category');  
        if (!updatedProduct) {  
            return res.status(404).json({ message: 'Product not found' });  
        }  
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });  
    } catch (error) {  
        res.status(500).json({ message: 'Error updating product', error: error.message });  
    }  
};  

// Delete a Product  
const deleteProduct = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const deletedProduct = await Product.findByIdAndDelete(id);  
        if (!deletedProduct) {  
            return res.status(404).json({ message: 'Product not found' });  
        }  
        res.status(200).json({ message: 'Product deleted successfully' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error deleting product', error: error.message });  
    }  
};  

module.exports = {  
    createProduct,  
    getAllProducts,  
    getProductById,  
    updateProduct,  
    deleteProduct  
};  