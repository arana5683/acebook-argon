const express = require("express");

const UsersController = require("../controllers/users");

const tokenChecker = require("../middleware/tokenChecker");

const router = express.Router();

router.get("/", tokenChecker, UsersController.getUser);
router.post("/", UsersController.create);

module.exports = router;
