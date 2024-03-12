const mongoose = require ("mongoose");
const nodemailer = require("nodemailer"); 
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name :{
        type : String ,
        required : true,
    },
    tags :{
        type : String,
    },
    email : {
        type : String,
    },
    fileUrl :{
        type : String,
    }
})

//post middleware 
fileSchema.post('save' , async function(doc){
 try {
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        host : process.env.MAIL_HOST,
        auth :{
            user : process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        },
       
     })
    
    
    //send mail
     let  info = await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: doc.email,
        subject:"img upload mail",
        text: "how are you", // plain text body
        html: `<h1>img uploaded</h1><a href="${doc.fileUrl}">${doc.fileUrl}</a> `
      });
 } catch (error) {
    console.log(error);
 }

});
module.exports =mongoose.model("File",fileSchema);