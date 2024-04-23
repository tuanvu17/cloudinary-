const express = require('express');
const router = express.Router();


const {upload, removeImages, uploadImages,} = require("../utils/cloudinary");


router.post('/upload',upload.array("images", 10), uploadImages);
router.delete('/remove/:publicID',removeImages);

module.exports = router;
