(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', foundItems)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function foundItems() {
    var ddo = {
      templateUrl: 'itemsloaderindicator.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowController = this;
    narrowController.searchTerm = "";
    narrowController.errorMessage = "";
    narrowController.searchMenuItems = function () {
      if(narrowController.searchTerm.length == 0 ){
        narrowController.errorMessage = "Nothing Found";
        narrowController.found = [];
      } else{
        var promise = MenuSearchService.getMatchedMenuItems(narrowController.searchTerm);
        promise.then(function (response) {
          narrowController.found = response;
          if(narrowController.found.length === 0){
            narrowController.errorMessage = "Nothing Found";
          } else {
            narrowController.errorMessage = "";
          }
        }).catch(function (error) {
          console.log(error);
        })
      }

    }

    narrowController.removeItem = function (itemIndex) {
      narrowController.found.splice(itemIndex, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json"),
          }).then(function (result) {
              var foundItems = [];
              var menuItems = result.data.menu_items;
              for (var i = 0; i < menuItems.length; i++) {
                  var description = menuItems[i].description;
                  if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                      foundItems.push(menuItems[i]);
                  }
              }
              return foundItems;
          });
  }
  }

})();
