const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secrets } = require("../config");

const UNAUTHORIZED = 401;

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) {
        return reject(err);
      }

      return resolve(payload);
    });
  });
};

const isAuthorized = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(UNAUTHORIZED).end();
  }

  let token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(UNAUTHORIZED).end();
  }

  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select('-password')
      .exec();

    req.user = user.toJSON();
    next();
  } catch(e) {
    return res.status(UNAUTHORIZED).end();
  }
};

module.exports = {
  isAuthorized,
};
