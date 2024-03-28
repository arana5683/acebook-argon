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
parentID: "660155fa0a81a51974be11c8"}).save();

module.exports = Comment;