const File = require("../models/fileModel");
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req,res)=>{
     try {
        //requesting the sample file and creating the path to upload the file
        const sampleFile = req.files.sampleFile;
        console.log(sampleFile);
        const uploadPath = __dirname + "/files"+ "bombyaa" + `.${sampleFile.name.split('.')[1]}`;
        //now moving the file to the designated path
        sampleFile.mv(uploadPath, (err)=>{
            return res.status(500).send(err)
        })

     } catch (error) {
        res.status(500).json({
            success : false ,
            message : "file not uploaded please try again later"
        })
     }
}
//////////////////////////////////////////////////////////
   async function isValidFile(type ,supportedType){
     const response =supportedType.includes(type);
     return response;
     }

    async function fileUploadToCloud(file,folder,quality){
        const option = {folder};
        option.resource_type = "auto";
        if(quality){
          option.quality = quality;
        }
        // else if(chunkSize){
        //     option.chunkSize = chunkSize;
        // }
        return await cloudinary.uploader.upload(file.tempFilePath,option)
    }
////////////////////////////////////////////////////////////    
exports.imageUpload = async (req,res) => {
    try {
        const {name ,email ,tags } = req.body;
        console.log(name,email,tags);
        //file requested
        const file = req.files.file;
        console.log(file);
       //supported types of images
        const supportedType = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        //if invalid image
        if(!isValidFile(fileType,supportedType)){
            res.status(400).json({
                success :false,
                message : "pleae enter valid image"
            })
        }
        // console.log(option);
        // console.log((file.tempFilePath));
        //if valid image then upload (createuploaderfunction)
        console.log("uploading the file");
        const data = await fileUploadToCloud(file,"bombyaa");
        console.log(data);
        //db entry
        const fileData = await File.create({
            name,tags,email,fileUrl:data.secure_url
           });
       
        res.status(200).json({
            success : true,
            fileUrl : data.secure_url,
            message : "image uploaded successfully"
        })

         } catch (error) {
         res.status(500).json({
            success : false ,
            message : error.message
         })
       }
}
/////////////////////////////////////////////////////////////////////////////
exports.videoUpload = async (req,res) => {
    try {
        const {name ,email ,tags } = req.body;
        console.log(name,email,tags);
        //file requested
        const file = req.files.file;
        console.log(file);
       //supported types of images
        const supportedType = ["mp4","mkv","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        //if invalid image
        if(!isValidFile(fileType,supportedType)){
            res.status(400).json({
                success :false,
                message : "pleae enter valid image"
            })
        }
        // console.log(option);
        // console.log((file.tempFilePath));
        //if valid image then upload (createuploaderfunction)
        console.log("uploading the file");
        const data = await fileUploadToCloud(file,"bombyaa");
        console.log(data);
        //db entry
       const fileData = File.create({
        name,email,tags,fileUrl : data.secure_url
       })
     
        res.status(200).json({
            success : true,
            fileUrl : data.secure_url,
            message : "image uploaded successfully"
        })

         } catch (error) { 
         res.status(500).json({
            success : false ,
            message : error.message
         })
       }
}

/////////////////////////////////////////////////////////////////////////////
exports.imgSizeReducer = async (req,res) => {
    try {
        const {name ,email ,tags } = req.body;//bhai jo schema model me ahi woho dalenge na 
        console.log(name,email,tags);
        //file requested
        const file = req.files.file;
        console.log(file);
       //supported types of images
        const supportedType = ["jpg","png","jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        //if invalid image
        if(!isValidFile(fileType,supportedType)){
            res.status(400).json({
                success :false,
                message : "pleae enter valid image"
            })
        }
        // console.log(option);
        // console.log((file.tempFilePath));
        //if valid image then upload (createuploaderfunction)
        console.log("uploading the file");
       // const fileReduced = await cloudinary.image(file, {width: 400, quality: "auto", fetch_format: "auto", crop: "scale"})
        const data = await fileUploadToCloud(file,"bombyaa",20);
        console.log(data);
        //db entry
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl : data.secure_url
        });
       
        res.status(200).json({
            success : true,
            fileUrl : data.secure_url,
            message : "image uploaded successfully"
        })

         } catch (error) {
         res.status(500).json({
            success : false ,
            message : error.message
         })
       }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// exports.imgSize= async (req,res) => {
//     try {
//         const {name ,email ,tags } = req.body;//bhai jo schema model me ahi woho dalenge na 
//         console.log(name,email,tags);
//         //file requested
//         const file = req.files.file;
//         console.log(file);
//        //supported types of images
//         const supportedType = ["jpg","png","jpeg"];
//         const fileType = file.name.split('.')[1].toLowerCase();
//         console.log(fileType);
//         //if invalid image
//         if(!isValidFile(fileType,supportedType)){
//             res.status(400).json({
//                 success :false,
//                 message : "pleae enter valid image"
//             })
//         }
//         // console.log(option);
//         // console.log((file.tempFilePath));
//         //if valid image then upload (createuploaderfunction)
//         console.log("uploading the file");
//        // const fileReduced = await cloudinary.image(file, {width: 400, quality: "auto", fetch_format: "auto", crop: "scale"})
//         const data = await fileUploadToCloud(file,"bombyaa",100,2000);
//         console.log(data);
//         //db entry
//         const fileData = await File.create({
//             name,
//             tags,
//             email,
//             fileUrl : data.secure_url
//         }) 
       
//         res.status(200).json({
//             success : true,
//             fileUrl : data.secure_url,
//             message : "image uploaded successfully"
//         })

//          } catch (error) {
//          res.status(500).json({
//             success : false ,
//             message : error.message
//          })
//        }
// }

            