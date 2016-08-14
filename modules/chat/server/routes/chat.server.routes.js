'use strict';


var chat = require('../controllers/chat.server.controller');

module.exports = function(app) {
  //chat Routes
  app.route('/api/chat')
        .get(chat.list)
        .post(chat.create);
};
