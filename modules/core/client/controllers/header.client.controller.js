'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
  function ($scope, $state, Authentication, Menus) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;
    // Get the topbar menu
    $scope.menu = Menus.getMenu('topbar');

    // Toggle the menu items
    $scope.isCollapsed = false;
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    $scope.initTopHeader = function () {
      angular.element('.fa-bars').click(function () {
        if (angular.element('#sidebar > ul').is(':visible') === true) {
          angular.element('#main-content').css({
            'margin-left': '0px'
          });
          angular.element('#sidebar').css({
            'margin-left': '-210px'
          });
          angular.element('#sidebar > ul').hide();
          angular.element('#container').addClass('sidebar-closed');
        } else {
          angular.element('#main-content').css({
            'margin-left': '210px'
          });
          angular.element('#sidebar > ul').show();
          angular.element('#sidebar').css({
            'margin-left': '0'
          });
          angular.element('#container').removeClass('sidebar-closed');
        }
      });
    };
    $scope.initLeftSideBar = function () {
      if(!Authentication.user) {
        angular.element('#main-content').css({
          'margin-left': '0px'
        });
        angular.element('#sidebar').css({
          'margin-left': '-210px'
        });
      }
    };
  }
]);
