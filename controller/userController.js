// 9763074345 aaba bidye
// 9373053515 santosh teli
const bcrypt = require("bcrypt");
const db = require("../models/index");
const User = db.Users;
const successResponse = require("../responseBuilder/successResponse");
const failerResponse = require("../responseBuilder/failerResponse");

exports.register = async (req, res, next) => {
  const body = await req.body;
  const user = await User.findOne({ where: { username: body.username } });
  if (user) {
    return res.status(400).json(failerResponse("Username already exists !"));
  }
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(body.password, salt);
  const result = await User.create({
    username: body.username,
    password: hashpass,
  });
  if (result) {
    const newUser = await User.findOne({
      where: { username: body.username },
      attributes: { exclude: ["password"] },
    });
    return res
      .status(201)
      .json(successResponse("User Registered Successfully !", newUser));
  }
};

exports.login = async (req, res, next) => {
  const body = await req.body;
  const user = await User.findOne({ where: { username: body.username } });
  if (!user) {
    return res.status(404).json(failerResponse("User does not exist !"));
  }
  const matched = await bcrypt.compare(body.password, user.password);
  if (!matched) {
    return res
      .status(400)
      .json(failerResponse("Incorrect Username or password !"));
  }
  const token = await User.generateToken(user.userID, user.username);
  if (token) {
    return res.status(200).json(successResponse("Login successfull !", token));
  }
};
