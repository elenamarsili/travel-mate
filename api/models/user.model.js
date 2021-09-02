const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const pronouns = require('../data/pronouns');
const languages = require('../data/languages');
const interests = require('../data/interests');

const Like = require("./like.model");
const Chat = require("./chat.model");
const Message = require("./message.model");

const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN =
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',        
       }],
    email: {
        type: String,
        required: 'Email is required',
        match: [EMAIL_PATTERN, 'Email is invalid']
    },
    password: {
        type: String,
        required: 'Password is required',
        match: [PASSWORD_PATTERN, 'Password is invalid']
    },
    picture: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    bio: {
        type: String,
        maxlength: 200
    },
    pronouns: {
        type: [{
            type: String,
            enum: pronouns.map((p) => p.id)
        }],
        validate: {
            validator: function(pronouns) {
                return pronouns.length = 1;
            },
            message: 'Choose only one set of pronouns'
          }
    },
    languages: {
        type: [{
            type: String,
            enum: languages.map((l) => l)
        }],
        validate: {
            validator: function(languages) {
                return languages.length >= 1;
            },
            message: 'Choose at least one language'
          }
    },
    interests: {
        type: [{
            type: String,
            enum: interests.map((i) => i.id)
        }],
        validate: {
            validator: function(interests) {
                return interests.length >= 2 && interests.length <=5;
            },
            message: 'Choose between 2 and 5 interests'
          }
    },
    social: {
        google: {
          type: String,
        },
    },
    active: {
        type: Boolean,
        default: false,
    },
    location: {
        type: {
          type: String,
          enum: ['Point'],
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret._v;
            delete ret.password;

            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret._v;
            delete ret.password;
            return ret
        }
    }
});

userSchema.index({ location: '2dsphere' });

userSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "liker",
});

userSchema.virtual("likes", {
    ref: "Like",
    localField: "_id",
    foreignField: "liked",
  });

userSchema.virtual("messages", {
    ref: "Message",
    localField: "_id",
    foreignField: "sender",
  });

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash;
        next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password);
  };
  
const User = mongoose.model('User', userSchema);
module.exports = User;


