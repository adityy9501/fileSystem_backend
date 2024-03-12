const cloudinary = require('cloudinary').v2
require("dotenv").config();

exports.cloudinaryConnect = ()=>{
    try {
        cloudinary.config({
               cloud_name : process.env.CLOUD_NAME,
               api_key : process.env.AP_KEY,
               api_secret :process.env.API_SECRET
        })
    } catch (error) {
        res.status(500).json({
        success : false ,
        message : "culd not connnect"
        })
    }
}