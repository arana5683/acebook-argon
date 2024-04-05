const User = require("../models/user");
const { generateToken } = require("../lib/token");

const create = (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({ firstName, lastName, email, password });
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
    res.status(200).json({ user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }, token: token });
  })
  .catch((err) => {
    console.error(err);
    res.status(400).json({ message: "User not found" });
  })
}

const followUser = async (req, res) => {
  if (req.user_id !== req.body.targetId) {
    try {
      const currentUser = await User.findById(req.user_id);
      const targetUser = await User.findById(req.body.targetId);
    if (!currentUser.following.includes(targetUser._id)) {
      await currentUser.updateOne( { $push: { following: targetUser._id } });
      const newToken = generateToken(req.user_id);
      res.status(200).json({ message: "Following user", token: newToken });
    } else {
      await currentUser.updateOne( { $pull: { following: targetUser._id } });
      const newToken = generateToken(req.user_id);
      res.status(200).json({ message: "User unfollowed", token: newToken });
    }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Cannot follow yourself");
  }
}

const getFollowedUsers = async (req, res) => {
  const newToken = generateToken(req.user_id);
  try {
    const currentUser = await User.findById(req.user_id);
    res.status(200).json({ users: currentUser.following, token: newToken });
  } catch (err) {
    res.status(500).json(err);
  }
}

const UsersController = {
  create: create,
  getUser: getUser,
  followUser: followUser,
  getFollowedUsers: getFollowedUsers
};

module.exports = UsersController;
