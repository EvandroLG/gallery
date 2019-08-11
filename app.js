const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const { db, dist, port } = require('./server/config');
const routes = require('./server/routes');

mongoose.connect(db, {
  useNewUrlParser: true
});

const app = express();
app.use(bodyParser.json());

app.use('/api', routes);
app.use(express.static(path.join(__dirname, dist)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, dist, 'index.html'));
});

app.listen(port);
