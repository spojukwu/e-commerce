const mongoose = require('mongoose');  

const orderSchema = new mongoose.Schema({  
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    products: [{   
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  
        quantity: { type: Number, required: true }  
    }],  
    totalAmount: { type: Number, required: true },  
    orderStatus: { type: String, default: 'pending' },  
    shippingAddress: { type: String, required: true },  
}, { timestamps: true });  

module.exports = mongoose.model('Order', orderSchema);