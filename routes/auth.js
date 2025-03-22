const express = require('express');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const User = require('../models/user');  
const Roles = require('../middlewares/roles'); // Import roles enum  

const router = express.Router();  
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';  

// Register  
router.post('/register',);  



module.exports = router;