const express = require("express");

const UsersController = require("../controllers/users");

const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();

router.get("/", tokenChecker, UsersController.getUser);
router.post("/", UsersController.create);

router.put("/follow", tokenChecker, UsersController.followUser);
router.get("/following", tokenChecker, UsersController.isUserFollowed);

module.exports = router;
