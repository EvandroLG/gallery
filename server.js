const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'dist')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port);
