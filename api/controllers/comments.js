const Comment = require("../models/comment");
const { generateToken } = require("../lib/token");

const getAllComments = async (req, res) => {
    const comments = await Comment.find();
    const token = generateToken(req.user_id);
    res.status(200).json("First comment");
};

const commentsController = {
    getAllComments: getAllComments,
};

module.exports = commentsController;