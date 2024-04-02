const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  message: { type: String, required: true },
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);


module.exports = Post;
