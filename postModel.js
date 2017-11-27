const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

let enumRoles = ['user', 'admin', 'staff'];

const postSchema   = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    match: /^([\w ,.!?]{1,100})/,
    set: function(value) {
      // can be used to remove all necessary stuff,
      // like code or scripting
      return value.toUpperCase();
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

  viewCounter: Number,
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

module.exports = postSchema;
