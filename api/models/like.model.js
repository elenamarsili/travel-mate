const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  liker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  liked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;