const mongoose = require('mongoose');  
const Roles = require('../middlewares/roles'); // Import the roles  

const userSchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true }, 
    verified: { type: Boolean, default: false },  
    otp: { type: String },  
    otpExpiration: { type: Date }, 
    role: { type: String, enum: [Roles.ADMIN, Roles.STAFF, Roles.CUSTOMER], default: Roles.CUSTOMER }// Enum here  
});  

module.exports = mongoose.model('User', userSchema);