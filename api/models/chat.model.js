const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true          
       }],
  }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  })
  
  const Chat = mongoose.model('Chat', chatSchema);
  
  module.exports = Chat;