const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ email, password });
  user
    .save()
    .then((user) => {
      console.log("User created, id:", user._id.toString());
      res.status(201).json({ message: "OK" });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ message: "Something went wrong" });
    });
};

const getUser = async (req, res) => {
  const userId = req.user_id;
  const token = generateToken(req.user_id);
  User.findById(userId)
  .then((user) => {
    res.status(200).json({ user: user, token: token });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  })
}

const UsersController = {
  create: create,
  getUser: getUser
};

module.exports = UsersController;
