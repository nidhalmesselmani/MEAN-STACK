'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Chat Schema
 */
var ChatSchema = new Schema({
  // Chat model fields
  username:{
    type: String,
    trim: true
  },
  text: {
    type:String,
    default: '',
    trim: true
  },
  created:{
    type: Date,
    default: Date.now
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  }
});

mongoose.model('Chat', ChatSchema);
