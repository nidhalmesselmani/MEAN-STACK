(function () {
  'use strict';

  angular
    .module('customers')
    .directive('customerList', customerList);

  customerList.$inject = ['CustomersService','Notify'];

  function customerList(CustomersService,Notify) {
    return {
      templateUrl: 'modules/customers/client/views/customer-list-template.html',
      transclude: true,
      restrict: 'E',
      link: function ($scope){
        Notify.getMsg('NewCustomer',function () {
          $scope.Ctrl.customers = CustomersService.query();
        });
      }
    };
  }
})();
