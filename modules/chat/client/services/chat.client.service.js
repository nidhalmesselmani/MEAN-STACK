(function () {
  'use strict';

  angular
    .module('chat')
    .factory('chatService', chatService);

  chatService.$inject = ['$resource'];

  function chatService($resource) {
    // Chat service logic
    // ...

    // Public API
    return $resource('api/chat');
  }
})();
