'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Chat = mongoose.model('Chat'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Chat
 */
exports.create = function (req, res) {
  var chat = new Chat(req.body);
  chat.username = req.user.username;
  chat.text = req.body.text;
   chat.profileImageURL = req.user.profileImageURL;
  chat.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(chat);
    }
  });

};

/**
 * Show the current Chat
 */
exports.read = function (req, res) {

};

/**
 * Update a Chat
 */
exports.update = function (req, res) {

};

/**
 * Delete an Chat
 */
exports.delete = function (req, res) {

};

/**
 * List of Chats
 */
exports.list = function (req, res) {
    Chat.find().sort('-created').exec(function(err, chats) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {


            res.jsonp(chats);
        }
    });
};
