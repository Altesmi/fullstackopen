const mongoose = require("mongoose");
//const config = require("../utils/config")

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }

var userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
});

userSchema.statics.format = function(user) {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs,
    id: user._id
  };
};

const User = mongoose.model("User", userSchema);

// User.close = function() {
//   mongoose.connection.close()
// }

module.exports = User;
