const mongoose = require('mongoose');  

const calculateShippingCost = (weight, distance, shippingMethod) => {  
    let baseCost = 5.00; // Base cost  
  
    // Example of distance-based cost calculations  
    if (distance > 500) {  
        baseCost += 5.00; // Additional cost for long distances  
    }  
  
    switch (shippingMethod) {  
        case 'express':  
            baseCost += 10.00; // Additional cost for express shipping  
            break;  
        case 'next-day':  
            baseCost += 20.00; // Premium for next-day delivery  
            break;  
        default: // Standard  
            baseCost += 0.00; // No additional cost  
            break;  
    }  
  
    return baseCost; // Return total calculated shipping cost  
};  


const shippingOptionSchema = new mongoose.Schema({  
    method: { type: String, required: true }, // e.g., Standard, Express, Next-Day  
    baseCost: { type: Number, required: true }, // Base cost for that shipping method  
    estimatedDeliveryTime: { type: String, required: true }, // E.g., 5-7 days  
});  

module.exports = mongoose.model('ShippingOption', shippingOptionSchema);  