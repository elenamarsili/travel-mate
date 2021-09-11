const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401, 'user is not authenticated'))
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(createError(403, 'user is authenticated'))
  } else {
    next();
  }
};

module.exports.isUserCompleted = (req, res, next) => {
  const errors = req.user.checkValidProfile()

  if (Object.keys(errors).length > 0) {
    const error = {errors, message:"User Profile is not completed"}
    return next(createError(403, error))
  }
  next()
}

