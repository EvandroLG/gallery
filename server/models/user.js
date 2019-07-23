const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },

  email: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },

  password: {
    required: true,
    type: String,
  },
}, {
  timestamp: true,
});

User.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

User.methods.checkPassword = () => {
  const passwordHash = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

module.exports = mongoose.model('User', User);
