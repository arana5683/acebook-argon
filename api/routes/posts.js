const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.put("/", PostsController.likePost);
router.get("/", PostsController.getPostId);

module.exports = router;
