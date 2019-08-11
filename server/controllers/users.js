const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secrets } = require("../config");

const createToken = user => {
  return jwt.sign({ id: user.id }, secrets.jwt, {
    expiresIn: secrets.jwtExp,
  });
};

const signinUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    })
      .select('username password')
      .exec();

    if (!user) {
      return res.status(401).send({
        message: 'Invalid username',
      });
    }

    const isPasswordValid = await user.checkPassword(req.body.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        message: 'Invalid password',
      });
    }

    return res.status(201).send({
      token: createToken(user),
    });
  } catch(e) {
    res.status(500).end();
  }
};

const signupUser = async (req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).send({
      message: 'Email, username and password are required',
    });
  }

  try {
    const user = await User.create(req.body);
    const token = createToken(user);

    return res.status(201).send({ token });
  } catch(e) {
    return res.status(400).end();
  }
};

const auth = (req, res) => {
  const { user } = req;

  return res.send({
    user,
  });
};

module.exports = {
  signinUser,
  signupUser,
  auth,
};
