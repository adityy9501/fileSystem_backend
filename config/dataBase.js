const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL ,{
        //  useNewUrlParser : true,
        //  useUnifiedTopology : true,

    })
    .then(()=>{
        console.log("Db connection successful");
    })
    .catch((err)=>{
        console.error(err);
        console.log(err.message);
        process.exit(1)
    } )
}
// const mongoose=require('mongoose');

// mongoose.connect(DATABASE_URL,{
//     //  useNewUrlParser:true,
//     //  useUnifiedTopology:true
// })

// const db=mongoose.connection;

// db.on('connected',()=>{
//     console.log('connected to mongoDB server');
// });
// db.on('error',(err)=>{
//     console.log("mongodb connectiion error",err);
// });
// db.on('disconnect',()=>{
//     console.log("mongodb server disconnected");

// });
// module.exports=db;