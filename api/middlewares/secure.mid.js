const createError = require('http-errors');

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

  if (errors) {
    return next(createError(403, errors))
  }

  next()
}