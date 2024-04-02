const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// const Post = require('../models/Post');

const PostsController = require("../controllers/posts");

// router.post('/posts', upload.single('image'), async (req, res) => {
//     try {
//         const { message, userId } = req.body;
//         const image = req.file ? req.file.path : null; // Get the path to the uploaded image

//         const newPost = new Post({ message, userId, image });
//         await newPost.save();

//         res.status(201).json(newPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get("/", PostsController.getAllPosts);
router.post("/", upload.single("image"), PostsController.createPost);

module.exports = router;
