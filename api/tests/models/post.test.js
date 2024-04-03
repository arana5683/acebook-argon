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

  it("posts post in 'most recent' order", async () => {
    const post1 = new Post({ 
      userId: "hi87hgfskuef7i",
      firstName: "testFirstName",
      lastName: "testLastName",
      message: "some message"
    });
    await post1.save();
    const post2 = new Post({ 
      userId: "hello87hgfskuef7i",
      firstName: "testFirstName2",
      lastName: "testLastName2",
      message: "some message2"
    });
    await post2.save();
    const posts = await Post.find().sort({ dateTime: -1 });
    expect(posts[0].userId).toEqual(post2.userId);
    expect(posts[0].firstName).toEqual(post2.firstName);
    expect(posts[0].lastName).toEqual(post2.lastName);
    expect(posts[0].message).toEqual(post2.message);
    });

  it("can save a post", async () => {
    const post = new Post({ 
        userId: "hi87hgfskuef7i",
        firstName: "testFirstName",
        lastName: "testLastName",
        message: "some message"
      });

    await post.save();
    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].userId).toEqual("hi87hgfskuef7i");
  });
});
