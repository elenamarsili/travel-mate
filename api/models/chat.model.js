const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
        ret.messages = doc.messages || [];
        return ret;
      }
    }
  })

  chatSchema.virtual("messages", {
    ref: "Message",
    localField: "_id",
    foreignField: "chat",
  });

  const Chat = mongoose.model('Chat', chatSchema);
  
  module.exports = Chat;