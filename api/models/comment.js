const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
body: String,
firstName: String,
lastName: String,
userID: String,
parentID: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

// Test comments below - adjust their ParentID to match a postID in your posts database to see them on post.

// new Comment({body: "First Comment", 
// firstName: "Guy",
// lastName: "incognito",
// userID: "ID", 
// parentID: "660155fa0a81a51974be11c8"}).save();

// new Comment({body: "Nice post!", 
// firstName: "Larry", 
// lastName: "Facebook", 
// parentID: "660159280a81a51974be11e6", 
// userID: "ID"}).save()

module.exports = Comment;