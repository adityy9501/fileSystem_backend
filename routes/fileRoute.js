const express = require("express");
const router = express.Router();
const {localFileUpload,imageUpload,videoUpload,imgSizeReducer} = require("../controller/fileUploads")

router.post("/uploadFile",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imgSizeReduce",imgSizeReducer);

module.exports = router;