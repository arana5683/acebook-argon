const Post = require("../models/post");
const upload = require('../middleware/multer.js');
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

const getAllPosts = async (req, res) => {
  try {
  
    const token = generateToken(req.user_id);
      
    if (req.query.profile == "true") {
        const posts = await Post.find({userId: req.user_id}).sort({dateTime: -1})
        res.status(200).json({ posts: posts, token: token });
    } else {
        const posts = await Post.find().sort({dateTime: -1});
        res.status(200).json({ posts: posts, token: token });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const createPost = async (req, res) => {

  const { message } = req.body;
  const user = await User.findById(req.user_id);
  console.log('createPost get req.file', req.file)
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  

  const id = uuidv4();
  // this checks if there is a file - req.file shows processed by multer
  const post = new Post({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    message: message,
    image: imagePath
  })
  await post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken, image: "Image Uploaded"});
};


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;

