const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");

const getAllPosts = async (req, res) => {
  try {
  const posts = await Post.find().sort({dateTime: -1});
  const token = generateToken(req.user_id);
  res.status(200).json({ posts: posts, token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
  };

const createPost = async (req, res) => {
  const { message } = req.body;
  const user = await User.findById(req.user_id);
  const post = new Post({
    userId: user.id,
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

