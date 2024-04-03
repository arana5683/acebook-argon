const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.createPost);
router.put("/", PostsController.updatePostLikes);
router.get('/:postId/likeStatus', PostsController.getPostLikeStatus);

module.exports = router;
