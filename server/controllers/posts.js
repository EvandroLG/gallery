const path = require('path');
const Post = require("../models/post");

const { uploads } = require("../config");

const getPosts = (req, res) => {
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
};

const createPost = (req, res) => {
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
};

module.exports = {
  getPosts,
  createPost,
};
