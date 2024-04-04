const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.getAllComments);
router.post("/", CommentsController.postNewComment);

module.exports = router;