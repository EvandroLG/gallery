const path = require('path');

module.exports = {
  db: 'mongodb://127.0.0.1:27017/gallery',
  port: 3000,
  dist: path.join(__dirname, '../../client/dist'),
  uploads: path.join(__dirname, 'uploads'),
  secrets: {
    jwt: require('../.keys.json').jwt,
    jwtExp: '100d',
  },
};
