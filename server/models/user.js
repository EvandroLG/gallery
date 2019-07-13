const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String,
  },

  email: {
    required: true,
    unique: true,
    type: String,
  },

  password: {
    required: true,
    type: String,
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('User', User);
