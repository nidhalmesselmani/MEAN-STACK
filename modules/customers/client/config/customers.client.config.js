(function () {
  'use strict';

  angular
    .module('customers')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Customers',
      state: 'customers',
      type: 'dropdown',
      roles: ['user','admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'customers', {
      title: 'List Customers',
      state: 'customers.list',
      roles: ['user','admin']
    });

   

  }
})();
