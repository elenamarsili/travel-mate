const createError = require('http-errors');
const User = require('../models/user.model');
const Like = require('../models/like.model');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');
const passport = require('passport');
const mailer = require('../config/mailer.config');


module.exports.register = (req, res, next) => {
    const data = { name, email, password } = req.body
    data.location = {
      type: "Point",
      coordinates: req.userLocation || [0,0]
    }
    console.log(req.body)
    User.findOne({ email: req.body.email})
      .then(user => {
        if (user) {
          next(createError(400, { errors: { email: { message: 'This user already exists'} } }))
        } else {
          return User.create(data)
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
      if (!user){
        next(createError(403, "user doesn't exist"))
      } else {
      res.redirect(process.env.WEB_URL);
      }

    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        next(createError(400, validations))
      } else if (user.active === false) {
        next(createError(403, 'user is not active'))
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
          res.redirect(`${process.env.REACT_APP_URL}/google/cb`)
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
    avatar,
    dateOfBirth,
    bio,
    pronouns,
    languages,
    interests,
    location
  } = req.body

  if (req.file) {
    editedUser.avatar = req.file.path
  }

  if(editedUser.languages && !Array.isArray(editedUser.languges)) {
    editedUser.languages = editedUser.languages.split(",")
  }

  if(editedUser.interests && !Array.isArray(editedUser.interests)) {
    editedUser.interests = editedUser.interests.split(",")
  }

  Object.assign(req.user, editedUser)

  req.user.save()
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      next(error)
    })
}

module.exports.list = (req, res, next) => {
  Promise.all([
    Like.find({ liker: req.user.id }), 
    User.find({
      isProfileCompleted: true, 
      _id: { $ne: req.user.id },
      location: {
        $near: {
          $geometry: {
            type: "Point" ,
            coordinates: req.user.location.coordinates
          },
          $maxDistance: 100000,
          $minDistance: 0,
        }
      },
      languages: { $in: req.user.languages },
      interests: { $in: req.user.interests }
    })
  ])
    .then(([likes, reccommendations]) => {
      console.log(likes)
      console.log(reccommendations)
      reccommendations = reccommendations.filter(r => !likes.some(l=> l.liked == r.id))
      res.json(reccommendations)
    })
    .catch(error => next(error));
}

module.exports.reccommendation = (req, res, next) => {
  const { page = 0 } = req.query;

  Promise.all([
    Like.find({ liker: req.user.id }), 
    User.find({
      isProfileCompleted: true, 
      _id: { $ne: req.user.id },
      location: {
        $near: {
          $geometry: {
            type: "Point" ,
            coordinates: req.user.location.coordinates
          },
          $maxDistance: 100000,
          $minDistance: 0,
        }
      },
      languages: { $in: req.user.languages },
      interests: { $in: req.user.interests }
    })
    .sort({_id: 1})
  ])
    .then(([likes, reccommendations]) => {
      reccommendations = reccommendations.filter(r => !likes.some(l=> l.liked == r.id))
      if (page >= 0) {
        const reccommendation = reccommendations[page];
        if (reccommendation) {
          return res.json(reccommendation)
        } 
      } 
      res.status(204).send()
    })
    .catch(error => next(error));
}

module.exports.profile = (req, res, next) => res.json(req.user)

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

module.exports.like = (req, res, next) => {
  const likeData = {liked: req.params.id, liker: req.user.id}
  Promise.all([
    Like.findOneAndUpdate(likeData, likeData, {upsert: true}),
    Like.findOne({ liker: req.params.id, liked: req.user.id })
  ])
    .then(([likedByMe, likedByOther]) => {
      if(likedByMe){
        next(createError(403, 'you already liked this user'))
      } else if (likedByOther) {
        return Chat.create({users: [req.params.id, req.user.id]})
          .then(chat => {
            /* Chat.findOne({_id: chat.id})
              .then((chat) => {
                if (chat) {
                  const message = new Message({
                    chat: chat._id,
                    sender: req.user.id,
                    content: "This is a match! Start writing to your new friend",
                    isRead: false        
                  })
                  return message.save()
                    .then(m => res.json(m))
                } else {
                  next(createError(404, "chat not found"))
                }
              }) */
            res.json(chat)
          })
          .catch(error => next(error))
      } else {
        res.status(204).send()
      }
    })
    .catch(next)
}