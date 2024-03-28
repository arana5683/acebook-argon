const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
body: String,
userName: String,
userID: String,
parentID: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

new Comment({body: "First Comment", 
userName: "AwesomeUser", 
userID: "ID", 
parentID: ""}).save();

module.exports = Comment;