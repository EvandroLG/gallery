const path = require("path");
const express = require("express");
const multer = require("multer");
const jwt = require('jsonwebtoken');

const Post = require("../models/post");
const User = require('../models/user');
const { dist, uploads, secrets } = require("../config");

const router = express.Router();

const upload = multer({
  dest: path.join(dist, uploads),

  fileFilter(req, file, callback) {
    const isValid = /image\/(png|jpe?g)$/.test(file.mimetype);

    if (isValid) {
      return callback(null, true);
    }

    callback(new Error("Only image files are allowed!"));
  }
});

const createToken = user => {
  return jwt.sign({ id: user.id }, secrets.jwt, {
    expiresIn: secrets.jwtExp,
  });
};

router.post("/post", upload.single("photo"), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400);
  }

  Post.create({
    image: path.join(uploads, file.filename),
    description: req.body.description
  })
    .then(() => res.send(200))
    .catch(() => res.send(500));
});

router.get("/posts", (req, res) => {
  const limit = 2;
  const page = Number(req.query.page || 1);
  const skip = (page - 1) * limit;

  Post.find()
    .select("createdAt image description")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 })
    .then(data => {
      if (data.length) {
        return res.json(data);
      }

      res.send(404);
    })
    .catch(() => res.send(500));
});

router.post('/signup', async (req, res) => {
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
});

router.post('/sigin', async (req, res) => {
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
});

module.exports = router;
