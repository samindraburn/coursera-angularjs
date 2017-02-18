(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getToBuyItems();
    toBuyList.removeItem = function (itemIndex) {
      ShoppingListCheckOffService.removeToBuyItem(itemIndex);
    }

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyItems = [
      {
        name: "Cookies",
        quantity: 10
      },
      {
        name: "Eggs",
        quantity: 15
      },
      {
        name: "Apples",
        quantity: 5
      },
      {
        name: "Water Bottles",
        quantity: 5
      },
      {
        name: "Milk Bottles",
        quantity: 20
      }
    ];
    var boughtItems = [];

    service.removeToBuyItem = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }
})();
