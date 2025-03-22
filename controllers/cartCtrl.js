const Cart = require('../models/cart');
const product = require('../models/product');

// Add Item to Cart  
const addToCart = async (req, res) => {  
    const { userId, productId, quantity } = req.body; // Assuming userId is passed for session management  
    
    try {  
        const product = await product.findById(productId);  
        if (!product) {  
            return res.status(404).json({ message: 'Product not found' });  
        }  

        let cart = await cart.findOne({ userId });  

        // If cart doesn't exist, create a new one  
        if (!cart) {  
            cart = new Cart({ userId, items: [] });  
        }  

        // Check if item already exists in the cart  
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);  
        
        if (itemIndex > -1) {  
            // Update the quantity if the item is already in the cart  
            cart.items[itemIndex].quantity += quantity;  
        } else {  
            // Add new item to the cart  
            cart.items.push({ productId, quantity });  
        }  

        await cart.save();  
        res.status(200).json({ message: 'Item added to cart', cart });  
    } catch (error) {  
        res.status(500).json({ message: 'Error adding item to cart', error: error.message });  
    }  
};  

// Remove Item from Cart  
const removeFromCart = async (req, res) => {  
    const { userId, productId } = req.body;  

    try {  
        const cart = await Cart.findOne({ userId });  

        if (!cart) {  
            return res.status(404).json({ message: 'Cart not found' });  
        }  

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);  
        await cart.save();  

        res.status(200).json({ message: 'Item removed from cart', cart });  
    } catch (error) {  
        res.status(500).json({ message: 'Error removing item from cart', error: error.message });  
    }  
};  

// Update Item Quantity in Cart  
const updateCartItemQuantity = async (req, res) => {  
    const { userId, productId, quantity } = req.body;  

    try {  
        const cart = await Cart.findOne({ userId });  

        if (!cart) {  
            return res.status(404).json({ message: 'Cart not found' });  
        }  

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);  

        if (itemIndex > -1) {  
            if (quantity <= 0) {  
                // If quantity is less than or equal to 0, remove the item  
                cart.items.splice(itemIndex, 1);  
            } else {  
                // Update the quantity  
                cart.items[itemIndex].quantity = quantity;  
            }  
        }  
        
        await cart.save();  
        res.status(200).json({ message: 'Cart updated', cart });  
    } catch (error) {  
        res.status(500).json({ message: 'Error updating cart', error: error.message });  
    }  
};  

// Get Cart Items  
const getCartItems = async (req, res) => {  
    const { userId } = req.params;  

    try {  
        const cart = await Cart.findOne({ userId }).populate('items.productId');  
        if (!cart) {  
            return res.status(404).json({ message: 'Cart not found' });  
        }  
        res.status(200).json(cart);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });  
    }  
};  

// Export cart controllers  
module.exports = {  
    addToCart,  
    removeFromCart,  
    updateCartItemQuantity,  
    getCartItems  
};  