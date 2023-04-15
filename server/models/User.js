const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  role: {
    type: String,
    required: [true, "Please enter a role"],
  },
});

// fire a function before doc saved to db. This is a mongoose middleware. Hashes the passwords.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  // "this" is the User model itself
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

// static method to get user info based on id
userSchema.statics.getUserInfo = async function (id) {
  const user = await this.findOne({ _id: id });
  if (user) {
    return user;
  } else {
    console.log("id: " + id);
    throw Error("incorrect id");
  }
};

// static method to get all staff' info (except for password)
userSchema.statics.getAllStaffInfo = async function () {
  const users = await this.find({}, { password: 0 });
  if (users) {
    return users;
  } else {
    throw Error("no users found");
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
