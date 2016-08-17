(function() {
  'use strict';

  angular
    .module('users')
    .controller('StatisticsUsersController', StatisticsUsersController);

  StatisticsUsersController.$inject = ['$scope','Admin','Socket','OrdersService'];

  function StatisticsUsersController($scope,Admin,Socket,OrdersService) {
    var vm = this;
    $scope.Fac =0;
    $scope.Goo=0;
    $scope.Lin=0;
    $scope.Git=0;
    $scope.Loc= 0;
    $scope.OrderDates= [];
    $scope.OrderAmount = [];
    getOrders(1);

    // Statistics users controller logic
    // ...

    Socket.on('signlocal', function (message) {

      $scope.Loc = $scope.Loc + 1;

      displaybarchart();

    });
    Socket.on('signlinkedin', function (message) {
      $scope.Lin = $scope.Lin + 1;
      displaybarchart();

    });
    Socket.on('signfacebook', function (message) {
      $scope.Fac = $scope.Fac + 1;
      displaybarchart();

    });
    Socket.on('signgoogle', function (message) {
      $scope.Goo = $scope.Goo + 1;
      displaybarchart();

    });
    Socket.on('signgithub', function (message) {
      $scope.Git = $scope.Git + 1;
      displaybarchart();

    });
    Socket.on('deleteuser', function (message) {
      switch(message.provider) {
        case 'facebook':
          $scope.Fac--;
          break;
        case 'google':
          $scope.Goo--;
          break;
        case 'linkedin':
          $scope.Lin--;
          break;
        case 'github':
          $scope.Git--;
          break;
        case 'local':
          $scope.Loc--;
          break;
      }
      displaybarchart();
    });






    init();

    function displaybarchart() {
      $scope.bar = {
        labels: ['Facebook', 'Gooogle+', 'Linkedin', 'Github', 'Local'],
        series: ['provider'],

        data: [
          [$scope.Fac, $scope.Goo, $scope.Lin, $scope.Git, $scope.Loc]
        ]

      };
    }
    function displaylinechart() {

      $scope.line = {
        labels: $scope.OrderDates,
        series: ['Series B'],

        data: [
          $scope.OrderAmount


        ],
        onClick: function (points, evt) {
          console.log(points, evt);
        }
      };
    }




    function init() {
      $scope.users = {};
      $scope.orders = {};
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
        displaybarchart();
        displaylinechart();


      });




    }

    $scope.data = {
      availableOptions: [
        { id: '1', name: 'this week' },
        { id: '2', name: 'last week' }
      ],
      selectedOption: { id: '1', name: 'this week' } //This sets the default value of the select in the ui
    };


    $scope.selectWeek = function () {
      getOrders($scope.data.selectedOption.id);
    };
    function getOrders(week) {
      OrdersService.query({ time:week },function (data) {
        var i = 0;
        $scope.OrderAmount =[];
        $scope.OrderDates= [];
        data.forEach(function(valueobject){
          var d = new Date(valueobject.created);
          $scope.OrderAmount[i] = valueobject.amount;
          $scope.OrderDates[i] = d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate();
          console.log($scope.OrderDates);
          i++;
        });

        displaylinechart();
      });
  
    }
  }
})();
