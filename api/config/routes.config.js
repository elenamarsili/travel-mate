const express = require('express');
const router = express.Router();
const secure = require('../middlewares/secure.mid')
const users = require('../controllers/users.controller')

router.post('/register', secure.isNotAuthenticated, users.register)
router.post('/login', secure.isNotAuthenticated, users.login)
router.post('/logout', secure.isAuthenticated, users.logout)
router.get('/authenticate/google', users.loginWithGoogle)
router.get('/authenticate/google/cb', users.doLoginWithGoogle)

router.get('/users/:id/activate', users.activate);

router.get('/profile', secure.isAuthenticated, users.detail)
router.patch('/profile', secure.isAuthenticated, users.update)
router.delete('/profile', secure.isAuthenticated, users.delete)



module.exports = router