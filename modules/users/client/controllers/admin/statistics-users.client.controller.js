(function() {
  'use strict';

  angular
    .module('users')
    .controller('StatisticsUsersController', StatisticsUsersController);

  StatisticsUsersController.$inject = ['$scope','Admin','Socket'];

  function StatisticsUsersController($scope,Admin,Socket) {
    var vm = this;
    $scope.Fac =0;
    $scope.Goo=0;
    $scope.Lin=0;
    $scope.Git=0;
    $scope.Loc= 0;
    // Statistics users controller logic
    // ...

    Socket.on('signlocal', function (message) {

      $scope.Loc = $scope.Loc + 1;

      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };

    });
    Socket.on('signlinkedin', function (message) {
      $scope.Lin = $scope.Lin + 1;
      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };

    });
    Socket.on('signfacebook', function (message) {
      $scope.Fac = $scope.Fac + 1;
      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };

    });
    Socket.on('signgoogle', function (message) {
      $scope.Goo = $scope.Goo + 1;
      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };

    });
    Socket.on('signgithub', function (message) {
      $scope.Git = $scope.Git + 1;
      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };

    });




    init();

    function init() {
      $scope.users = {};
      Admin.query(function (data) {
        $scope.users = data;
        $scope.users.forEach(function(valueobject){
          switch(valueobject.provider) {
            case 'facebook':
              $scope.Fac++;
              break;
            case 'google':
              $scope.Goo++;
              break;
            case 'linkedin':
              $scope.Lin++;
              break;
            case 'github':
              $scope.Git++;
              break;
            case 'local':
              $scope.Loc++;
              break;
          }
        });


        $scope.bar = {
          labels: ['Facebook','Gooogle+','Linkedin','Github','Local'],
          series: ['provider'],

          data: [
            [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
          ]

        };

      });




    }
  }
})();
