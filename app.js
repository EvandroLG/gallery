const path = require('path');
const express = require('express');
const mongoose = require("mongoose");

const { db, dist } = require('./server/config');
const api = require('./server/routes/api');

mongoose.connect(db, {
  useNewUrlParser: true
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, dist)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, dist, 'index.html'));
});

app.use('/api', api);

app.listen(port);
