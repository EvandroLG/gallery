module.exports = {
  db: 'mongodb://localhost:27017/gallery',
  port: 3000,
  dist: '../../client/dist',
  uploads: 'uploads',
  secrets: {
    jwt: require('../.keys.json').jwt,
    jwtExp: '100d',
  },
};
