const Comment = require("../models/comment");
const User = require("../models/user");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
    const comments = await Comment.find({parentId: req.query.postId});
    const token = generateToken(req.user_id);
    res.status(200).json({comments: comments, token: token});
};

const postNewComment = async (req, res) => {
    const { body, parentId } = req.body;
    const user = await User.findById(req.user_id);
    const comment = new Comment({
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        body: body,
        parentId: parentId
    })
    comment.save();
    const newToken = generateToken(req.user_id);
    res.status(201).json({ message: "Comment created", token: newToken });
}

const commentsController = {
    getAllComments: getAllComments,
    postNewComment: postNewComment
};

module.exports = commentsController;