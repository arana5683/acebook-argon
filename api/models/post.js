const mongoose = require("mongoose");

// A Schema defines the "shape" of entries in a collection. This is similar to
// defining the columns of an SQL Database.
const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  message: { type: String },
  image: { type: String},
  dateTime: { type: Number, default: Date.now },
  likes: {type: Array, default: []}
});

// We use the Schema to create the Post model. Models are classes which we can
// use to construct entries in our Database.
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;

