const path = require("path");
const express = require("express");
const multer = require("multer");

const Post = require("../models/post");
const { dist, uploads } = require("../config");

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

module.exports = router;
