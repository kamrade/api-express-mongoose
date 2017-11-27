const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let enumRoles = ['user', 'admin', 'staff'];

let positiveNum = function(value) {
  if (value < 0) {
    return false;
  } else {
    return true;
  }
};

let lessThanNumber = function(value) {
  if (value > 100) {
    return false;
  } else {
    return true;
  }
};

const postSchema   = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    match: /^([\w ,.!?]{1,100})/,
    set: function(value) {
      // can be used to filter out necessary stuff,
      // like html or scripting
      // fire when we trying to save
      return value.toUpperCase();
    },
    get: function(value) {
      // that will allow us to work with value before
      // send back. It can be used for security purposes
      // fire when we trying to get something to the client
      return value.toLowerCase();
    }
  },

  text: {
    type: String,
    required: true,
    max: 2000
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  },

  viewCounter: {
    type: Number,
    validate: positiveNum
  },
  published: Boolean,

  followers: [Schema.Types.ObjectId],
  meta: Schema.Types.Mixed,

  comments: [{
    text: {
      type: String,
      trim: true,
      max: 2000,
    },
    author: {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String,
      role: {
        type: String,
        enum: enumRoles
      }
    }
  }]
});

// should precede declaration of schema
postSchema.path('viewCounter').validate(lessThanNumber);

module.exports = postSchema;
