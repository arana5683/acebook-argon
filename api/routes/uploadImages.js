const express = require('express');
const router = express.Router();
const upload = require('./multerConfig'); // Import multer configuration


const ImageController = require("../controllers/uploadImages");

router.post("/", ImageController.uploadImage);


module.exports = router;