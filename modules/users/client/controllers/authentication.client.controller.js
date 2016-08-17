'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        if ($('#sidebar > ul').is(":visible") === true) {
          $('#main-content').css({
            'margin-left': '0px'
          });
          $('#sidebar').css({
            'margin-left': '-210px'
          });
          $('#sidebar > ul').hide();
          $("#container").addClass("sidebar-closed");
        } else {
          $('#main-content').css({
            'margin-left': '210px'
          });
          $('#sidebar > ul').show();
          $('#sidebar').css({
            'margin-left': '0'
          });
          $("#container").removeClass("sidebar-closed");
        }

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;


        if ($('#sidebar > ul').is(":visible") === true) {
          $('#main-content').css({
            'margin-left': '0px'
          });
          $('#sidebar').css({
            'margin-left': '-210px'
          });
          $('#sidebar > ul').hide();
          $("#container").addClass("sidebar-closed");
        } else {
          $('#main-content').css({
            'margin-left': '210px'
          });
          $('#sidebar > ul').show();
          $('#sidebar').css({
            'margin-left': '0'
          });
          $("#container").removeClass("sidebar-closed");
        }
        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);
