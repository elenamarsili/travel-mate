const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')
const users = require('../controllers/users.controller')
const chats = require('../controllers/chat.controller')
const upload = require('./multer.config')

router.post('/register', users.register)
router.post('/login', users.login)
router.post('/logout', secure.isAuthenticated, users.logout)
router.get('/authenticate/google', users.loginWithGoogle)
router.get('/authenticate/google/cb', users.doLoginWithGoogle)

router.get('/users/:id/activate', users.activate);

router.get('/profile', secure.isAuthenticated, users.profile)
router.patch('/profile', secure.isAuthenticated, upload.single('avatar'), users.update)
router.delete('/profile', secure.isAuthenticated, users.delete)

router.get('/reccommendation', secure.isAuthenticated, secure.isUserCompleted, users.reccommendation)

router.post('/users/:id/like', secure.isAuthenticated, secure.isUserCompleted, users.like)

router.get('/chats', secure.isAuthenticated, secure.isUserCompleted, chats.list)
router.post('/chats/:id', secure.isAuthenticated, secure.isUserCompleted, chats.create)
router.get('/chats/:id', secure.isAuthenticated, secure.isUserCompleted, chats.detail)

router.use((req, res, next) => next(createError(404, 'Route not found')))

module.exports = router