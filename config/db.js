const mongoose = require("mongoose")


const connectToDatabase = async()=>{
try {
    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("MongoDB connected!")
    })

} catch (error) {  
    console.error('MongoDB connection failed:', error.message);  
    process.exit(1);  
}  
}

module.exports = connectToDatabase