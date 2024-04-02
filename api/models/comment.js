const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
body: String,
firstName: String,
lastName: String,
userID: String,
parentID: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

new Comment({body: "First Comment", 
firstName: "Guy",
lastName: "incognito",
userID: "ID", 
parentID: "660155fa0a81a51974be11c8"}).save();

module.exports = Comment;