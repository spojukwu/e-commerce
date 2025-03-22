const express = require('express');  
  
const { addToCart, removeFromCart, updateCartItemQuantity, getCartItems } = require('../controllers/cartCtrl');
const router = express.Router(); 


// Routes  
router.post('/cart/add', addToCart);  
router.delete('/cart/remove', removeFromCart);  
router.put('/cart/update', updateCartItemQuantity);  
router.get('/cart/:userId', getCartItems);  

module.exports = router;  