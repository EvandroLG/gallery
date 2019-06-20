const path = require('path');
const express = require('express');
const multer  = require('multer');
const mongoose = require("mongoose");

const api = require('./server/routes/api');

mongoose.connect('mongodb://localhost:27017/gallery', {
  useNewUrlParser: true
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/api', api);

app.listen(port);
