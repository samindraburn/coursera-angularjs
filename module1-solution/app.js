(function () {
  'use strict';
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.fontColor = "";
    $scope.checktooMuch = function () {

      // Check for the Number of items
      var itemArray = $scope.items.split(",");
      // Check for Empty items
      var cloneItemArray = [];
      for (var i = 0; i < itemArray.length; i++) {
        if(itemArray[i].trim() != ""){
          cloneItemArray.push(itemArray[i]);
        }
      }

      var displayMessage = "";
      var fontVal = "";
      // Check if array is empty
      if(cloneItemArray.length == 0){
        displayMessage = "Please enter data first";
        fontVal = "red";
      }
      else if(cloneItemArray.length <= 3){
        displayMessage = "Enjoy";
        fontVal = "green";
      }
      else if(cloneItemArray.length > 3){
        displayMessage = "Too much!";
        fontVal = "green";
      }
      $scope.fontColor = fontVal;
      $scope.message = displayMessage;
    };
  }
})();
