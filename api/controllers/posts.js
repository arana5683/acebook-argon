const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
};

const createPost = async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(req.user_id);
  const post = new Post({
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    message: message,
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
