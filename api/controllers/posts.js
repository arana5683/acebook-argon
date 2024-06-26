const Post = require("../models/post");
const { generateToken } = require("../lib/token");
const User = require("../models/user");


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
  const imagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  

  // const id = uuidv4();
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

const getPostLikesArr = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    res.status(200).json({ likes: post.likes})

    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

  } catch (error) {
    console.error('Error:', error);
  }

}

const getPostLikeStatus = async (req, res) => {
  try {
      const postId = req.params.postId;
      const userId = req.user_id;
      const post = await Post.findById(postId);
      
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      const liked = post.likes.includes(userId);
      res.status(200).json({ liked });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


const PostsController = {
  getAllPosts: getAllPosts,
  createPost: createPost,
  updatePostLikes: updatePostLikes,
  getPostLikeStatus:getPostLikeStatus,
  getPostLikesArr: getPostLikesArr
};



module.exports = PostsController;

