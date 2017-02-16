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
        name: "Milk",
        quantity: 20
      }
    ];
    var boughtItems = [];

    // service.addToBuyItem = function (itemName, itemQuantity) {
    //   var item = {
    //     name: itemName,
    //     quantity: itemQuantity
    //   };
    //   toBuyItems.push(item);
    // };

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

// function ShoppingListServiceProvider() {
//   var provider = this;
//
//   provider.defaults = {
//     maxItems: 10
//   };
//
//   provider.$get = function () {
//     var shoppingList = new ShoppingListService(provider.defaults.maxItems);
//
//     return shoppingList;
//   };

})();
