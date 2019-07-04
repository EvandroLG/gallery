const path = require('path');
const express = require('express');
const mongoose = require("mongoose");

const { db, dist, port } = require('./server/config');
const api = require('./server/routes/api');

mongoose.connect(db, {
  useNewUrlParser: true
});

const app = express();

app.use('/api', api);

app.use(express.static(path.join(__dirname, dist)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, dist, 'index.html'));
});

app.listen(port);
