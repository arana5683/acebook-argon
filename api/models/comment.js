const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
body: String,
firstName: String,
lastName: String,
userId: String,
parentId: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;