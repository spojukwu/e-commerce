const express = require ('express')
const mongoose = require('mongoose');  
const dotenv = require('dotenv').config(); 
const cors = require("cors")

const connectToDatabase = require('./config/db');
const connectToServer = require('./config/server');
//dotenv.config(); 
// Initialize express app
const server= express();


server.use(express.json());// For parsing application/json
server.use(cors())

connectToServer()
connectToDatabase()


server.use((req, res) => {  
    return res.status(404).json({ message: "Sorry, this endpoint doesn't exist." });  
});