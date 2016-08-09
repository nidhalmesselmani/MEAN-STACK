(function () {
  'use strict';

  angular
    .module('customers')
    .controller('CustomersListController', CustomersListController);

  CustomersListController.$inject = ['CustomersService','$log','$modal','$scope','Notify'];

  function CustomersListController(CustomersService,$log,$modal,$scope,Notify) {
    var vm = this;
    vm.customers = CustomersService.query();

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
      vm.customers = CustomersService.query();

    };

    $scope.remove = function (customer) {
      if (confirm('Are you sure you want to delete?')) {
        customer.$remove();
        vm.customers = CustomersService.query();
      }
    };

  }



})();
