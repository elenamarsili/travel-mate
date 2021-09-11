const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');

const MongoStore = connectMongo(expressSession);
const sessionMaxAge = Number(process.env.SESSION_MAX_AGE || 7);

const session = expressSession({
  secret: process.env.SESSION_SECRET || 'super secret (change it)',
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: process.env.SESSION_SECURE === 'true',
    httpOnly: true,
    maxAge: 24 * 3600 * 1000 * sessionMaxAge,
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 3600 * sessionMaxAge,
  })
});

module.exports.config = session;
module.exports.updateLocation = (req, res, next) => {
  if (req.userLocation && req.user && req.user.location.coordinates !== req.userLocation) {
    req.user.location.coordinates = req.userLocation;
    req.user.save()
      .then((user) => { next()})
      .catch(next)
  } else {
    next()
  }
};