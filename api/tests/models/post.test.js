require("../mongodb_helper");

const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("has a message", () => {
    const post = new Post({ message: "some message" });
    expect(post.message).toEqual("some message");
  });

  it("has a userId", () => {
    const post = new Post({ message: "some message", userId: "hi87hgfskuef7i" });
    expect(post.userId).toEqual("hi87hgfskuef7i");
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ message: "some message", userId: "hi87hgfskuef7i" });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].userId).toEqual("hi87hgfskuef7i");
  });
});
