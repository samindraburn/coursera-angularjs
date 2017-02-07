(function () {
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.checktooMuch = function () {
      var itemArray = $scope.items.split(",");
      var displayMessage = "";
      if(itemArray.length > 0 && itemArray.length <= 3){
        displayMessage = "Enjoy";
      }

      if(itemArray.length > 3){
        displayMessage = "Too much!";
      }

      $scope.message = displayMessage;
    };
  }
})();
