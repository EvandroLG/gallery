const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { db, dist, uploads, port } = require('./config');
const routes = require('./routes');

mongoose.connect(db, {
  useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);
app.use(express.static(dist));
app.use(express.static(uploads));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

app.get('/sw.js', (req, res) => {
  res.sendFile(path.join(dist, 'sw.js'));
});

app.listen(port);
