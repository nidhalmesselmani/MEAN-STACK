(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['CustomersService','$log','$modal','$scope','Notify','Socket'];

  function CustomersListController(CustomersService,$log,$modal,$scope,Notify,Socket) {
    var vm = this;
    vm.customers = CustomersService.query();
$scope.index = {};
    console.log(vm.customers);
    //Open a modal window to create a single customer record
    vm.modalCreate = function (size) {
      console.log('hi');
      var modalInstance = $modal.open({

        templateUrl: 'modules/customers/client/views/form-customer.client.view.html',
        controller: function ($scope, $modalInstance) {


          $scope.ok = function (customer) {

            if(this.CreateCustomerForm.$valid){
              $modalInstance.close();

            }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size
      });

      modalInstance.result.then(function (selectedItem) {

      }, function () {
        $log.info('Modal dismissed at:' + new Date());
      });
    };

//Open a modal window to update a single customer record
    vm.modalUpdate = function (size,selectedCustomer) {
      console.log('hi');
      var modalInstance = $modal.open({

        templateUrl: 'modules/customers/client/views/edit-customer.model.view.html',
        controller: function ($scope, $modalInstance, customer) {
          $scope.customer = customer;

          $scope.ok = function (customer) {

            if(this.updateCustomerForm.$valid){
              $modalInstance.close($scope.customer);

            }
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
        },
        size: size,
        resolve: {
          customer: function () {
            return selectedCustomer;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at:' + new Date());
      });
    };


    $scope.channelOptions=[
      { id:2,item:'Facebook' },
      { id:1,item:'Twitter' }

    ];

    $scope.update = function (customer) {
      customer.$update();
    };
    $scope.create = function(customer){

      CustomersService.save(customer,function (response) {
        Notify.sendMsg('NewCustomer',{ 'id':response._id });

      });
  //    vm.customers = CustomersService.query();

    };

    $scope.remove = function (customer,index) {
      if (confirm('Are you sure you want to delete?')) {
        customer.$remove();
        $scope.index= index;



      }
    };

    // Add an event listener to the 'chatMessage' event
    Socket.on('chatMessagelol', function (message) {

       vm.customers.splice($scope.index,1);
      
      //   vm.customers = CustomersService.query();

    });
    Socket.on('customeradded', function (message) {
      console.log('add');
      vm.customers.unshift(message);

    });
  }




})();
