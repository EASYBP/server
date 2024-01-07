const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  password: String,
  email: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", userModel);

module.exports = User;
