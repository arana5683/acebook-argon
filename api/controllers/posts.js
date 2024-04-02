const Post = require("../models/post");
const upload = require('../middleware/multer.js');
const { generateToken } = require("../lib/token");
const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};


const createPost = async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(req.user_id);
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const id = uuidv4();
  // this checks if there is a file - req.file shows processed by multer
  const post = new Post({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    message: message,
    image: imagePath
  })
  post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
};

module.exports = PostsController;

