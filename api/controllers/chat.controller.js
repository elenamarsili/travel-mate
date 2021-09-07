const createError = require('http-errors');
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

module.exports.list = (req, res, next) => {

    Chat.find({users: { $in: req.user.id }})
      .then((chats) => {
        if(Object.keys(chats).length > 0){
          res.json(chats)
        } else {
          next(createError(403, 'no chat available'))
        }})
      .catch(error => next(error));
  }

module.exports.create = (req, res, next) => {
  const chatId = req.params.id
  Chat.find({_id: chatId})
    .then(() => {
      const message = new Message({
        chat: chatId,
        sender: req.user.id,
        content: req.body.content,
        isRead: false        
      })
      message.save()
        .then(m => res.json(m))
        .catch(next)    
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Message.find({chat: req.params.id})
    .then(messages => {
      messages.map(message => {
        message.isRead = true
      })
      return res.json(messages)})
    .catch(next)
}