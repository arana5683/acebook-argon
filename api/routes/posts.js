const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer.js');

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", upload.single("image"), PostsController.createPost);

module.exports = router;
