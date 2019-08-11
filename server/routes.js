const path = require('path');
const express = require('express');
const multer = require('multer');

const { getPosts, createPost } = require('./controllers/posts');
const { signinUser, signupUser } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');
const { dist, uploads } = require('./config');

const router = express.Router();

const upload = multer({
  dest: path.join(dist, uploads),

  fileFilter(req, file, callback) {
    const isValid = /image\/(png|jpe?g)$/.test(file.mimetype);

    if (isValid) {
      return callback(null, true);
    }

    callback(new Error('Only image files are allowed!'));
  }
});

router.get('/posts', isAuthorized, getPosts);
router.post('/post', [isAuthorized, upload.single('photo')], createPost);
router.post('/signin', signinUser);
router.post('/signup', signupUser);

module.exports = router;
