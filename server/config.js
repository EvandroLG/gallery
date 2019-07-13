module.exports = {
  db: "mongodb://localhost:27017/gallery",
  port: 3000,
  dist: "dist",
  uploads: "uploads",
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d'
  },
};
