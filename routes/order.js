const express = require('express');  
const router = express.Router();  
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('./path/to/crudOperations');  

// Define your routes  
router.post('/orders', createOrder);  
router.get('/orders', getAllOrders);  
router.get('/orders/:id', getOrderById);  
router.put('/orders/:id', updateOrder);  
router.delete('/orders/:id', deleteOrder);  

module.exports = router;  