const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Comment = require("../../models/comment");
const User = require("../../models/user");

require("../mongodb_helper");

const secret = process.env.JWT_SECRET;

const createToken = (userId) => {
    return JWT.sign(
    {
        user_id: userId,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret
    );
};

let token;
describe("/comments", () => {
    beforeAll(async () => {
    const user = new User({
        firstName: "testFirstName",
        lastName: "testLastName",
        email: "post-test@test.com",
        password: "12345678",
    });
    await user.save();
    await Comment.deleteMany({});
    token = createToken(user.id);
    });

    afterEach(async () => {
        await Comment.deleteMany({});
    });

    describe("POST, when a valid token is present", () => {
        test("responds with a 201", async () => {
            const response = await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({ body: "Hello World!", parentId: "parentId" });
            expect(response.status).toEqual(201);
        });

        test("creates a new comment", async () => {
            await request(app)
            .post("/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({ body: "Hello World!", parentId: "parentId" });

            const comments = await Comment.find();
            expect(comments.length).toEqual(1);
            expect(comments[0].body).toEqual("Hello World!");
            expect(comments[0].parentId).toEqual("parentId");
        });

        test("returns a new token", async () => {
            const testApp = request(app);
            const response = await testApp
            .post("/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({ body: "Hello World!", parentId: "parentId" });

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
        });
    });

    describe("POST, when token is missing", () => {
        test("responds with a 401", async () => {
            const response = await request(app)
            .post("/comments")
            .send({ body: "Hello World!", parentId: "parentId" });

            expect(response.status).toEqual(401);
        });

        test("a post is not created", async () => {
            const response = await request(app)
            .post("/comments")
            .send({ body: "Hello World!", parentId: "parentId" });

            const comments = await Comment.find();
            expect(comments.length).toEqual(0);
        });

        test("a token is not returned", async () => {
            const response = await request(app)
            .post("/comments")
            .send({ body: "Hello World!", parentId: "parentId" });

            expect(response.body.token).toEqual(undefined);
        });
    });

    describe("GET tests", () => {
        beforeEach(async () => {
            const comment1 = new Comment({ 
                userId: "testId",
                firstName: "testFirstName",
                lastName: "testLastName",
                body: "I love all my children equally",
                parentId: "testParentId"
            });
            const comment2 = new Comment({ 
                userId: "testId",
                firstName: "testFirstName",
                lastName: "testLastName",
                body: "I've never cared for GOB",
                parentId: "testParentId" 
            });
            await comment1.save();
            await comment2.save();
        });

        describe("GET, when token is present", () => {
            test("the response code is 200", async () => {
            const response = await request(app)
                .get("/comments?postId=testParentId")
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toEqual(200);
            });

            test("returns every comment in the collection", async () => {
            const response = await request(app)
                .get("/comments?postId=testParentId")
                .set("Authorization", `Bearer ${token}`);

            const comments = response.body.comments;
            const firstComment = comments[0];
            const secondComment = comments[1];

            expect(firstComment.body).toEqual("I love all my children equally");
            expect(secondComment.body).toEqual("I've never cared for GOB");
            });

            test("returns a new token", async () => {
            const response = await request(app)
                .get("/comments?postId=testParentId")
                .set("Authorization", `Bearer ${token}`);

            const newToken = response.body.token;
            const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
            const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

            // iat stands for issued at
            expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
            });
        });

        describe("GET, when token is missing", () => {
            test("the response code is 401", async () => {
            const response = await request(app).get("/comments?postId=testParentId");

            expect(response.status).toEqual(401);
            });

            test("returns no comments", async () => {
            const response = await request(app).get("/comments?postId=testParentId");

            expect(response.body.comments).toEqual(undefined);
            });

            test("does not return a new token", async () => {
            const response = await request(app).get("/comments?postId=testParentId");

            expect(response.body.token).toEqual(undefined);
            });
        });
    });
});
