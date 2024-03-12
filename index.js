const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000 ;
//for parsing req,body (using middleware)
app.use(express.json());

//fileupload middleware
const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
//routing
const route = require("./routes/fileRoute")
app.use("/api/v1/upload",route);
//connecting the cloudinary
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();



//db connection
const db = require("./config/dataBase");
db.connect();



app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})