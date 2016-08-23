/*
  -- keyboard.js
  Directive and controller for the words the user input via keyboard;

*/

aacApp.directive('keyboard', function () {
    return {
        templateUrl: 'template/keyboard.html'
    };
});

aacApp.controller('otsControlKeyboard', function ($scope, $global) {

  $scope.showKeyboard = function(){
    document.getElementById("typeInput").focus();

    setTimeout(function(){
      document.body.style.height = parseInt(window.innerHeight)+'px';
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      console.log("virtual keyboard opened!");
    }, 200);
  }

$scope.$watch('$viewContentLoaded', function(){
  $scope.showKeyboard();
 });

});
