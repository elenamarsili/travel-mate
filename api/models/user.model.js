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
    email: {
        type: String,
        required: 'Email is required',
        match: [EMAIL_PATTERN, 'Email is invalid'],
        unique: true
    },
    password: {
        type: String,
        required: 'Password is required',
        match: [PASSWORD_PATTERN, 'Password is invalid']
    },
    avatar: {
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
        type: String,
        enum: pronouns.map((p) => p)
    },
    languages: {
        type: [{
            type: String,
            enum: languages.map((l) => l)
        }],
    },
    interests: {
        type: [{
            type: String,
            enum: interests.map((i) => i)
        }],
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
          required: true,
          default: [0, 0]
        }
    },
    chats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',        
       }],
    isProfileCompleted: {
        type: Boolean,
        default: false
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
            delete ret.__v;
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
    this.isProfileCompleted = Object.keys(this.checkValidProfile()).length === 0;

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

userSchema.methods.checkValidProfile = function() {
    const errors = {}

    if (!this.languages || this.languages?.length < 1) {
        errors.languages = 'Select at least one language'
    }
    if (!this.interests || this.interests?.length <2 || this.interests?.length>5 ) {
        errors.interests = 'Select between 2 and 5 interests'
    }
    if (!this.pronouns || this.pronouns.length < 1) {
        errors.pronouns = 'Select you preferred pronouns'
    }
    if (!this.avatar) {
        errors.avatar = 'Insert one picture'
    }
    if (!this.dateOfBirth) {
        errors.dateOfBirth = 'Insert dateOfBirth'
    }
    if (!this.name) {
        errors.name = 'Insert name'
    }
    if (!this.bio) {
        errors.bio = 'Insert bio'
    }


    return errors
};
  
const User = mongoose.model('User', userSchema);
module.exports = User;


