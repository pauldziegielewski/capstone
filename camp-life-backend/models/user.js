const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Store the hashed password
  checkedItems: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

