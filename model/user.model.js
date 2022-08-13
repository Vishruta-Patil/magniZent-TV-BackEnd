const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  likes: [],
  history: [],
  playlists: [],
  watchlater: [],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
