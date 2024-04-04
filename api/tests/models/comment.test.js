require("../mongodb_helper");

const Comment = require("../../models/comment");

describe("Comment model", () => {
    beforeEach(async () => {
        await Comment.deleteMany({});
    });

    it("has a body", () => {
        const comment = new Comment({ body: "some message" });
        expect(comment.body).toEqual("some message");
    });
    
    it("has a userId", () => {
        const comment = new Comment({ body: "some message", userId: "hi87hgfskuef7i" });
        expect(comment.userId).toEqual("hi87hgfskuef7i");
    });
    
    it("can list all comments", async () => {
        const comments = await Comment.find();
        expect(comments).toEqual([]);
    });
    
    it("can save a comment", async () => {
        const comment = new Comment({ 
            userId: "hi87hgfskuef7i",
            body: "test comment",
            firstName: "testFirstName",
            lastName: "testLastName",
            parentId: "pmasojd98au9hu"
        });
    
        await comment.save();
        const comments = await Comment.find();
        expect(comments[0].body).toEqual("test comment");
        expect(comments[0].userId).toEqual("hi87hgfskuef7i");
        expect(comments[0].parentId).toEqual("pmasojd98au9hu");
    });
})