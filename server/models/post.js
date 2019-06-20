const mongoose = require('mongoose');

const Post = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  image: {
    type: String,
    unique: true,
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Post', Post);
