const express = require('express');
const multer  = require('multer');
const Post = require('../models/post');

const router = express.Router();

const upload = multer({
  dest: 'dist/uploads/',

  fileFilter(req, file, callback) {
    const isValid = /image\/(png|jpe?g)$/.test(file.mimetype);

    if (isValid) {
      return callback(null, true);
    }

    callback(new Error('Only image files are allowed!'));
  }
});

router.post('/create_post', upload.single('photo'), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400);
  }

  Post.create({
    image: file.path,
    description: req.body.description,
  }).then(() => res.send(200))
    .catch(() => res.send(500));
});

module.exports = router;
