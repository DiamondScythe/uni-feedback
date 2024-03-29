const User = require("../models/User");
const jwt = require("jsonwebtoken");
const db2 = require("../db/ideas");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "za secret", {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.send("Signup completed");
};

module.exports.login_get = (req, res) => {
  res.send("Signin completed");
};

module.exports.signup_post = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    console.log("Login completed");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log(errors);
  }
};

module.exports.user_auth = (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "za secret", async (err, decoded) => {
      if (err) {
        res.status(401).json({
          isAuthenticated: false,
          message: "Invalid or expired token",
        });
        console.log("auth failed");
      } else {
        try {
          const user = await User.getUserInfo(decoded.id);
          res.json({
            isAuthenticated: true,
            user: user,
          });
          console.log(user);
        } catch (err) {
          res.status(401).json({
            isAuthenticated: false,
            message: "Valid token, but user information cannot be retrieved",
          });
          console.log("auth failed", err.message);
        }
      }
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: "Authorization header is missing",
    });
    console.log("auth failed");
  }
};

module.exports.getStaffId = async (req, res) => {
  try {
    const staff = await db2.getUserId(req.query.email);
    res.status(200).json(staff[0]);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.getAllStaffInfo();
    res.status(200).json(staff);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.deleteStaff = async (req, res) => {
  try {
    const staff = await User.deleteOne({ _id: req.query.id });
    res.status(200).json(staff);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports.addStaff = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.create({ email, password, role });
    const token = createToken(user._id);
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
