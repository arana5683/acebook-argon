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
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    message: message,
  })
  post.save();
  const newToken = generateToken(req.user_id);
  res.status(201).json({ message: "Post created", token: newToken });
};

const updatePostLikes = async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (!post.likes.includes(userId)) {
      await post.updateOne({$push: {likes: userId}});
      res.status(200).json("The post has been liked");

    } else {
      await post.updateOne({$pull: {likes: userId}});
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};




const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePostLikes: updatePostLikes,
};



module.exports = PostsController;

