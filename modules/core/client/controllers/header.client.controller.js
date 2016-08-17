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
    $('.fa-bars').click(function () {
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
    });
  }
    $scope.initLeftSideBar = function () {
      if(!Authentication.user) {
        $('#main-content').css({
          'margin-left': '0px'
        });
        $('#sidebar').css({
          'margin-left': '-210px'
        });
      }
    }
  }
]);
