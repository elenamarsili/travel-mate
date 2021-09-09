const createError = require('http-errors');
const User = require('../models/user.model');
const Chat = require('../models/chat.model');
const Message = require('../models/message.model');

module.exports.list = (req, res, next) => {

  Chat.find({users: { $in: req.user.id }})
    .then((chats) => res.json(chats))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const chatId = req.params.id
  Chat.findOne({_id: chatId})
    .then((chat) => {
      if (chat) {
        const message = new Message({
          chat: chat._id,
          sender: req.user.id,
          content: req.body.content,
          isRead: false        
        })
        return message.save()
          .then(m => res.json(m))
      } else {
        next(createError(404, "chat not found"))
      }
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  const chatId = req.params.id
  
  Message.updateMany({chat: chatId}, {isRead: true})
    .then(()=> {
      return Chat.findOne({_id: chatId})
        .populate({
          path: "users",
          select: "name avatar" 
        })
        .populate({
          path: "messages",
          populate: {
            path: "sender",
            select: "name"
          }
        })
        .then((chat) => {
          if(chat) {
            res.json(chat)
          } else {
            next(createError(404, "chat not found"))
          }
        })
    })
    .catch(next)
}