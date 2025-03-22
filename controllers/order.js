const Order = require('./models/Order');  

// Create an Order  
const createOrder = async (req, res) => {  
    try {  
        const { user, products, totalAmount, shippingAddress } = req.body;  
        const newOrder = new Order({ user, products, totalAmount, shippingAddress });  
        await newOrder.save();  
        res.status(201).json({ message: 'Order created successfully', order: newOrder });  
    } catch (error) {  
        res.status(500).json({ message: 'Error creating order', error: error.message });  
    }  
};  

// Read all Orders  
const getAllOrders = async (req, res) => {  
    try {  
        const orders = await Order.find().populate('user').populate('products.product');  
        res.status(200).json(orders);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching orders', error: error.message });  
    }  
};  

// Read a single Order by ID  
const getOrderById = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const order = await Order.findById(id).populate('user').populate('products.product');  
        
        if (!order) {  
            return res.status(404).json({ message: 'Order not found' });  
        }  
        
        res.status(200).json(order);  
    } catch (error) {  
        res.status(500).json({ message: 'Error fetching order', error: error.message });  
    }  
};  

// Update an Order  
const updateOrder = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const { orderStatus, shippingAddress } = req.body; // Destructure the fields you want to update  
        const updatedOrder = await Order.findByIdAndUpdate(  
            id,  
            { orderStatus, shippingAddress },  
            { new: true, runValidators: true }  
        );  

        if (!updatedOrder) {  
            return res.status(404).json({ message: 'Order not found' });  
        }  

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });  
    } catch (error) {  
        res.status(500).json({ message: 'Error updating order', error: error.message });  
    }  
};  

// Delete an Order  
const deleteOrder = async (req, res) => {  
    try {  
        const { id } = req.params;  
        const deletedOrder = await Order.findByIdAndDelete(id);  

        if (!deletedOrder) {  
            return res.status(404).json({ message: 'Order not found' });  
        }  

        res.status(200).json({ message: 'Order deleted successfully' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error deleting order', error: error.message });  
    }  
};  

// Export the CRUD operations  
module.exports = {  
    createOrder,  
    getAllOrders,  
    getOrderById,  
    updateOrder,  
    deleteOrder,  
};  