const path = require('path');

module.exports = {
  db: 'mongodb://localhost:27017/gallery',
  port: 3000,
  dist: path.join(__dirname, '../../client/dist'),
  uploads: path.join(__dirname, 'uploads'),
  secrets: {
    jwt: require('../.keys.json').jwt,
    jwtExp: '100d',
  },
};
