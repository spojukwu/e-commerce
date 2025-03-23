
const mongoose = require('mongoose');  

const productSchema = new mongoose.Schema({  
    name: { type: String, required: true, trim: true },  
    description: { type: String, required: true },  
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 }, // Stock level   
    images: [{ type: String }], // Array of image URLs  
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },  
    inventory: { type: Number, default: 0, min: 0 },  
    createdAt: { type: Date, default: Date.now },  
    updatedAt: { type: Date, default: Date.now }  
});  

module.exports = mongoose.model('Product', productSchema);  