const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const User = require('../models/user');  
const Roles = require('../middlewares/roles'); // Import roles enum 
const { generateOtp, sendOtp } = require('../middlewares/sendOtp');



const welcome = async(req, res) => {
    try {
        return res.status(200).json({ message: "Welcome to Ecommerce" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};  

const regfxn = async (req, res) => {  
    const { name, email, password, phoneNumber, role } = req.body;  

    // Validate role  
    if (role && !Object.values(Roles).includes(role)) {  
        return res.status(400).send('Invalid role');  
    }  

    try { 
        // Check if the user already exists  
        const userExists = await User.findOne({ email });  

        if (userExists) {  
            return res.status(400).json({ message: 'User already exists' });  
        }  
        
        const hashedPassword = await bcrypt.hash(password, 10);  
        const user = new User({  
            name,  
            email,  
            password: hashedPassword,  
            role: role || Roles.CUSTOMER // Use enum  
        });  
        await user.save();  

            // Generate OTP and set expiration  
            const otp = generateOtp(); // Call the function to generate a new OTP  
            const otpExpiration = Date.now() + 300000; // OTP valid for 5 minutes   
    
            // Update user with OTP and its expiration  
            user.otp = otp;  
            user.otpExpiration = otpExpiration;  
            await user.save(); // Save user again to update with OTP and expiration  
    
            // Send OTP to the user  
            await sendOtp(user); // Pass the user object  
    
        res.status(201).send('User registered successfully');  
    } catch (error) {  
        res.status(400).send(error.message);  
    }  
};

//login users
const loginUser = async (req, res) => {  
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });  
        if (!user) return res.status(400).send('Invalid credentials.');  

        // Check verification  
        if (!user.verified) {  
            return res.status(403).send('Please verify your account.');  
        }  

        // Check password  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) return res.status(400).send('Invalid password.');  

        const accessToken = generateAccessToken(user)  
        const refreshToken = generateRefreshToken(user);
        
        // Login successful  
        res.send({message: 'Login successful', access_token: accessToken, refresh_token: refreshToken} );
    } catch (error) {
        res.status(400).send(error.message);
    } 
};

//verify otp
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });  
        if (!user) return res.status(400).send('User not found.');  

        // Check if OTP is correct and hasn't expired  
        if (user.otp !== otp || Date.now() > user.otpExpiration) {  
            return res.status(400).send('Invalid or expired OTP.');  
        }  
        user.verified = true;
        user.otp = undefined;
        user.otpExpiration = undefined;
        await user.save();

        // Generate JWT tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({ message: 'OTP verified successfully, account activated', accessToken, refreshToken });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};