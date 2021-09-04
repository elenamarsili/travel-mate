const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const mailer = require('../config/mailer.config');

module.exports.register = (req, res, next) => {
    const data = { name, email, password } = req.body
  
    User.findOne({ email: req.body.email})
      .then(user => {
        if (user) {
          next(createError(400, { errors: { email: { message: 'This user already exists'} } }))
        } else {
          return User.create(req.body)
            .then(user => {
            mailer.sendValidationEmail(user);
            res.status(201).json(user)})
        }
      })
      .catch(next);
}

module.exports.activate = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { active: true }, { new: true })
    .then((user) => {
      console.log('user', user)
      res.redirect(process.env.WEB_URL);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        next(createError(400, { errors: validations }))
      } else {
        req.login(user, error => {
          if (error) {
            next(error)
          }
          else res.json(user)
        })
      }
    })(req, res, next);
};

module.exports.loginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', {
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
  });

  passportController(req, res, next);
};

module.exports.doLoginWithGoogle = (req, res, next) => {
  const passportController = passport.authenticate('google-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else {
      req.login(user, error => {
        if (error) {
          next(error)
        } else {
          res.redirect('http://localhost:3001')
        }
      })
    }
  })
  
  passportController(req, res, next);
}

module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(204).end()
}

module.exports.update = (req, res, next) => {
  const editedUser = {
    name,
    picture,
    dateOfBirth,
    bio,
    pronouns,
    languages,
    interests,
    location
  } = req.body

  Object.assign(req.user, editedUser)

  req.user.save()
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      next(error)
    })
}

//para sacar el del file
/* module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(createError(400, { errors: { email: 'This email already exists' } }))
      } else {
        return User.create({
          ...req.body,
          avatar: req?.file?.path
        })
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next)
} */

module.exports.detail = (req, res, next) => res.json(req.user)

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.user.id)
    .then(user => {
      if (user) {
        res.status(204).end()
      } else {
        next(createError(404, 'user not found'))
      }
    })
    .catch(next)
}